# 학습내용

## 유효성 검사

유효성 검사는 사용자가 입력한 값이 **서버 로직을 수행하기에 적절한지 미리 확인하는 과정**이다.  

예를 들면:  
- 필수 값이 비어 있는지
- 숫자여야 하는 값이 문자열로 들어오지 않았는지
- 이메일 형식이 맞는지

같은 것들을 DB에 넣기 전에 서버에서 먼저 걸러낸다.  

잘못된 요청을 초기에 차단하고, '불필요한 DB 접근'을 줄이기 위한 필수 요소이다.  

---

## express-validator

Express에서는 `express-validator` 모듈을 사용해 유효성 검사를 미들웨어 형태로 처리할 수 있다.  
각 필드별로 검증 규칙을 선언하고, `validationResult(req)`를 통해 결과를 한 번에 확인한다.  

```js
const { body } = require('express-validator')
```

---

### AND 조건

배열 형태로 validator를 나열하면 기본적으로 AND 조건이 된다.  

```js
[
  body('user_id').notEmpty().isInt(),
  body('name').notEmpty()
]
```

의미:  
- user_id도 유효해야 하고
- name도 유효해야 한다

둘 중 하나라도 실패하면 전체 검증이 실패한다.  

---

### OR 조건

OR 조건이 필요할 때는 `oneOf()`를 사용한다.  

```js
const { body, oneOf } = require('express-validator')

oneOf
([
    body('user_id').notEmpty(),
    body('email').isEmail()
])
```

의미:  
- user_id가 있거나  
- email이 유효하면 통과

즉 여러 조건 중 **하나만 만족하면** 통과한다.  

---

### 결과 확인

검증 결과는 반드시 `validationResult(req)`로 직접 확인해야 한다.  

```js
const errors = validationResult(req)
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() })
}
```

중요한 점은 **응답 후 반드시 return으로 흐름을 종료해야 한다는 것**이다.  
그렇지 않으면 이후 로직이 계속 실행되어 `ERR_HTTP_HEADERS_SENT` 오류가 발생할 수 있다.  

---

### 유효성 검사 미들웨어 분리

validator 로직이 길어질 경우, 별도 파일로 분리해서 재사용할 수 있다.  

예:  
- channelValidator.js
- userValidator.js

위와 같이  도메인별로 관리하면, 라우터 코드가 훨씬 깔끔해진다.  

---

## affectedRows

`affectedRows`는 **DB(MySQL/MariaDB)가 쿼리를 실행한 뒤 돌려주는 결과 객체(results) 안의 값**이다.  

주로 INSERT / UPDATE / DELETE처럼 '데이터를 변경하는 쿼리'에서 의미가 있으며,  
**실제로 영향을 받은 row(행)의 개수**를 뜻한다.  

affectedRows가 왜 필요한걸까?  

서버 입장에서는 쿼리를 실행했다고 해서 항상 '성공'이라고 말할 수 없다.  

예를 들어 UPDATE/DELETE는 조건(WHERE)에 해당하는 데이터가 없으면,  
쿼리는 에러 없이 끝나지만 실제로 바뀐 row는 0개가 될 수 있다.  

이때 `affectedRows`를 보면 아래와 같이 변경사항을 구분할 수 있다.  
- 요청이 실제로 DB를 바꿨는지
- 대상 데이터가 존재했는지

---

### 결과값 표기

- `affectedRows === 1`
  - INSERT: 1개의 row가 새로 생성됨
  - UPDATE: 1개의 row가 실제로 변경됨(대상 존재)
  - DELETE: 1개의 row가 삭제됨(대상 존재)

- `affectedRows === 0`
  - WHERE 조건에 맞는 row가 없음
  - (UPDATE의 경우) 값이 동일해서 실제 변경이 없었을 수도 있음

즉 `affectedRows === 0`은 "실패"라기보다  
**바뀐 게 없다**(대상이 없거나 변경할 게 없다)에 가깝다.  

#### 함께 알아두면 좋은 값

- `insertId`: INSERT로 생성된 row의 id(자동 증가 PK)
- `changedRows`: UPDATE에서 "실제로 값이 달라진" row 수

실무에서는 UPDATE/DELETE 성공 여부 판단에 `affectedRows`를 자주 사용한다.  

---

### Express에서 사용하기

DB 결과를 바탕으로 HTTP 응답을 만든다.  
즉, `affectedRows`는 서버가 상태 코드를 결정할 때 참고하는 신호다.  

```js
conn.query
(
    sql, params, (err, results) => 
    {
        if (err) { return res.status(500).json({ message: 'DB 오류' }) }
        if (results.affectedRows === 0) { return res.status(404).json({ message: '대상 데이터 없음' }) }

        return res.status(200).json({ message: '정상 처리' })
    }
)
```
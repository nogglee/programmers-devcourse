# 힉습 내용

### forEach문 중첩 주의하기

아래와 같이 forEach 내부에서 바로 else로 응답을 보내면, 아직 뒤에 데이터가 남아 있어도 조건문 실행을 중단한다.  
ex.db에 user01, user02, user03이 존재할 때 user03 입력 시 첫 번째 값인 user01부터 입력값과 비교하고 false 반환 후 조건문 종료됨.  
                    
그래서 입력한 id로 가입한 내역이 db에 있는지 전체적으로 순회하여 가입 내역 존재 여부만 boolean 값으로 변수에 저장하고,  
forEach에서 빠져나와 조건문을 추가하거나, 함수로 모듈화 작업을 해주어야한다.  

Express에서는 **요청 1번에 응답 1번**만 보낼 수 있다. 그런데 `forEach` 안에 `else { res... }`가 있으면,  
- 아직 뒤에 데이터가 남아 있어도
- 앞에서 한 번이라도 조건이 `false`가 되는 순간
- 실패 응답을 먼저 보내버릴 수 있다.

예: db에 `user01`, `user02`, `user03`이 있는데 `user03`로 로그인 시  
1. user01 비교 → 다름 → else에서 실패 응답을 보내버림
2. 그 다음 user02, user03을 보기도 전에 요청 처리가 끝난 것처럼 되어버림

이때 흔히 다음과 같은 오류(또는 비정상 동작)가 생긴다.  
- 이미 응답을 보낸 뒤에 또 응답을 보내려고 해서 에러가 나거나  
- 의도와 다른 결과가 먼저 반환됨

**잘못된 형태: 반복 안에서 응답**

```javascript
db.forEach((userInfo) => {
  if (userInfo.userId === inputId) {
    return res.status(200).json({ message: '로그인 성공' })
  } else {
    return res.status(400).json({ message: '회원 정보 없음' })
  }
})
```

---

### 모듈화

처음에는 모듈화를 하면 오히려 코드가 더 길어지는 것처럼 느껴졌다.  
함수를 따로 만들고, 매개변수를 넘기고, 다시 호출하는 구조가 추가되기 때문이다.  

하지만 모듈화의 목적은 **코드 길이를 줄이는 것**이 아니라,  
**각 코드의 책임을 분리하는 것**이다.  

이번 실습에서 느낀 핵심은 다음과 같다.  

- 함수는 '판단(계산)'만 담당한다.  
- 라우터(handler)는 'HTTP 응답'만 담당한다.

예를 들어 비밀번호 검증 로직은 다음처럼 true/false만 반환하도록 분리한다.  

```js
function isPasswordMatch(user, inputPwd) {
  return user.pwd === inputPwd
}
```

그리고 실제 응답은 라우터에서 처리하는 식으로 리팩토링 하였다.  

```js
if (!isPasswordMatch(currentUser, userInput.pwd)) {
  return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' })
}

return res.status(200).json({ message: '로그인 성공' })
```

---

### 빈 객체 체크방법

처음에는 `if (req.body == {})` 방식으로 body가 비어 있는지 확인하려 했지만,  
JavaScript에서 객체 비교는 '내용'이 아니라 '메모리 주소' 기준으로 이루어진다.  
메모리 주소를 기준으로 비교한다는게 무슨 의미일까?  

`req.body`는 이미 만들어진 객체이고, 조건에 명시한 빈 객체 `{}`는 방금 만든 새로운 객체이다.  
각 객체의 메모리 위치는 반드시 다를 수 밖에 없기에 반환 값은 항상 false이며,  
`req.body == {}` 방식으로는 빈 객체 여부를 판단할 수 없다.  

객체는 키가 하나라도 있으면 "존재한다"로 인식되기 때문에,  
빈 객체인지 확인하려면 실제로 **키의 개수**를 검사해야 한다.  

```js
Object.keys(req.body).length === 0
```

이 방식은 다음 의미를 가진다.  
- req.body의 모든 key를 배열로 만든 뒤
- 그 길이가 0이면 → 아무 값도 없는 객체

또는 필수 필드 존재 여부를 직접 검사하는 방식도 사용할 수 있다.  

예:  
- userId가 있는지
- pwd가 있는지

즉, 요청 객체가 비었는지보다 필요한 값이 모두 포함되어 있는지를 기준으로 검증하는 것이 더 안전하다고 생각한다.  

---

### route를 사용하는 이유

Express에서 route는 같은 URL 경로에 대한 여러 HTTP method를 하나로 묶어서 관리할 수 있다.  
예를 들어 `/users` 라는 경로가 있다면, 아래와 같은 HTTP method가 있을 것이다.  
* `GET /users`      : 사용자 조회
* `POST /users`     : 사용자 생성
* `PUT /users`      : 사용자 수정
* `DELETE /users`   : 사용자 삭제

경로는 일치하지만 동작이 다르기 때문에 코드를 각각 작성해주어야한다.  
* `app.get('/users', ...)`   
* `app.post('/users', ...)` 
* `app.put('/users', ...)` 
* `app.delete('/users', ...)` 

위와 같은 방식으로도 동작 하지만, 프로젝트가 커질수록 각 HTTP method에 대해 따로 작성해야하므로  
같은 경로가 여기저기 흩어져 흐름을 한 눈에 파악하기 힘들어진다.  

route를 사용하면 아래와 같이 리팩토링이 가능하다.  

```javascript
app.route('/users')
    .get(...)
    .post(...)
    .put(...)
    .delete(...)
```

/users 경로와 관련된 리소스를 한 곳에 모아 정리할 수 있고, 중복되지 않게 관리할 수 있을 것 같다.  
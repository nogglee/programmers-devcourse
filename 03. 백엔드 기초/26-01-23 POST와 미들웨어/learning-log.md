# 학습 내용

### HTTP method

기본적인 CRUD
* 생성 : POST
* 조회: GET
* 수정 : UPDATE
* 삭제 : DELETE

데이터를 생성하는 POST는 db에 데이터를 등록하는 역할을 한다.
등록할 데이터에는 개인정보와 같은 중요한 정보가 포함되어있을 수 있다.

제일 대표적인 예로, 회원가입을 할 때 아이디와 비밀번호를 회원테이블에 저장해야하는데,
그 값들을 GET 방식으로 URL에 노출시키면 위험하다.
사용자가 URL을 조작할 수도 있고, 브라우저 히스토리에 남아있을 수 있기 때문이다.
이러한 보안 문제를 해결하기 위한 방법 중 하나가 POST 방식을 활용하는 것이다.

---

### POST

POST로 요청할 경우 데이터를 body에 숨겨서 보낼 수 있다.
GET 방식을 사용할 땐, URL에 파라미터를 넣어서 브라우저를 통해 요청할 수 있었는데,
body에 데이터를 담으려면 별도의 테스트 도구를 활용해야한다.

이번 실습에서는 POST 요청을 보내기 위해 postman을 사용했다.

**Map 객체에 유튜버 등록하기**
```javascript
const db = new Map()
var id = 1

app.post
(
    '/youtuber', (req, res) => 
    {
        db.set(id++, req.body)
        res.json(req.body)
    }
)
```

위와 같은 api 생성 후 postman을 통해 데이터를 등록하려한다.
JSON으로 전송하였지만, 결과값은 빈 값으로 출력된다.

Express의 기본 설정만으론 JSON 형태인 request body를 바로 사용할 수 없기 때문이다.
`express.json()` 미들웨어를 추가하면 body에 담긴 값을 코드에 사용할 수 있게 된다.

```javascript
const db = new Map()
var id = 1

app.use(express.json())
app.post(...)
```
---

# 실습 결과

1. 개별 유튜버 아이디 기반 조회
   <img width="1789" height="536" alt="image" src="https://github.com/user-attachments/assets/96851b21-da01-44a5-ae2b-074a8fc53070" />

2. 유튜버 등록
   <img width="1791" height="522" alt="image" src="https://github.com/user-attachments/assets/105d5c62-6905-443a-a852-bd04551a70d5" />

3. 유튜버 등록 후 개별 조회
   <img width="1792" height="554" alt="image" src="https://github.com/user-attachments/assets/b801a556-f383-4fd7-8039-b5da1f50dfb1" />



# 인증과 인가

오늘은 로그인 흐름을 기준으로 **인증(Authentication)** 과 **인가(Authorization)** 의 차이와  
Cookie / Session / JWT 방식이 왜 등장했는지를 정리했다.  

## 인증(Authentication)

인증은 클라이언트에 접근한 사람이 누구인지 증명하는 과정이다.    
- 로그인
- 회원 확인

**사이트에 가입된 사용자임을 증명**할 수 있다.

## 인가(Authorization)

인가는 접근 경로에 대한 권한을 허락하는 과정이다.  
- 관리자 / 일반 사용자 페이지 분리
- 특정 API 접근 제한

**인증 이후 어떤 자원에 접근할 수 있는지 결정**할 수 있다.  

---

# 쿠키와 세션

## 쿠키(Cookie)

로그인 시 서버가 '로그인 정보'를 쿠키에 담아 클라이언트에게 전달하고,  
이후 요청마다 클라이언트가 해당 쿠키를 다시 서버로 보내게된다.  

### 장점
- 서버 저장 공간 사용 X
- Stateless 구조 → REST 방식과 잘 어울림

### 단점
- 클라이언트에 저장되므로 보안에 취약

## 세션(Session)

로그인 시 서버가 사용자 정보를 저장하고,  
클라이언트에는 '세션 ID'만 전달하는 방식  

### 장점
- 실제 데이터는 서버에 있어 쿠키보다 안전

### 단점
- 서버가 상태를 저장해야 함 (Stateless X)
- 서버 메모리 사용 증가

위 두 방식의 단점을 보완하기 위해 JWT 방식이 등장했다.  

---

# JWT (JSON Web Token)

JWT는 JSON 형태의 데이터를 암호화해 전달하는 토큰 기반 인증 방식이다.  
사용자는 토큰을 통해 자신을 증명하며, 서버는 토큰만 검증한다.  
토큰은 입장을 위한 인증용으로도 사용할 수 있고,  
권한 구분을 위한 인가용으로도 사용할 수 있다.  

## JWT 장점

- Stateless
- 서버 부하 감소
- 보안 강화 (Signature 기반)
- 인증 서버 분리 가능

## JWT 구조

- Header: 암호화 알고리즘, 토큰 타입
- Payload: 사용자 정보
- Signature: 위 정보들을 조합해 만든 서명

Payload가 변경되면 Signature가 달라지므로,  
토큰 위조 여부를 검증할 수 있다.  


## JWT 발급 / 검증

아래 코드는 **로그인 성공 시 서버가 JWT를 발급**하고, 이후 요청마다 **서버가 검증**하는 구조다.  

```js
const jwt = require('jsonwebtoken')

// 토큰 발급 (로그인 성공 후)
const token = jwt.sign(
  { email: loginUser.email, name: loginUser.name }, // payload
  process.env.PRIVATE_KEY,                         // 서명용 암호키
  { expiresIn: '5m', issuer: 'nogglee' }           // 옵션
)

// 토큰 검증 (요청마다)
const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
```

jsonwebtoken의 method를 하나씩 알아보자.  

### 01. sign()

- payload + 암호키 + 옵션을 합쳐 JWT를 생성한다
- 이 시점에 토큰이 '발급'된다

> 사용자의 정보를 서명해서 토큰으로 만드는 과정  

### 02. verify()

- 전달받은 토큰이 변조되지 않았는지 확인한다
- 정상이라면 payload를 복원한다

> 이 토큰이 진짜 서버가 발급한 것인지 검사하는 과정  

검증이 실패하면 예외가 발생하고,  
성공하면 decoded 객체로 사용자 정보를 다시 얻을 수 있다.  

---

## JWT 인증 / 인가 절차

JWT 기반 로그인 흐름은 다음 순서로 진행된다.  

### 01. 로그인 요청 (인증 시작)

클라이언트가 아이디 / 비밀번호를 서버로 전송한다.  

### 02. 서버에서 사용자 확인

서버는 DB에서 사용자 정보를 조회하고,  
비밀번호가 일치하면 JWT를 생성한다.  

### 03. JWT 발급

```js
const token = jwt.sign(...)
```

생성된 토큰을 쿠키에 담거나, 응답 body에 포함해 클라이언트에게 전달한다.  
이 단계까지가 **인증(Authentication)** 이다.  

### 04. 이후 요청 + JWT 전달

클라이언트는 이후 모든 요청에 JWT를 함께 보낸다.  

ex)  
- Cookie
- Authorization Header

### 05. 서버에서 JWT 검증

```js
jwt.verify(token, PRIVATE_KEY)
```

서버는 요청마다 토큰을 검증하고,  
정상일 경우 payload를 복원해 사용자 정보를 얻는다.  

### 06. 권한 확인 (인가)

복원된 사용자 정보를 기준으로 아래와 같은 기준을 확인한다.  
- 관리자 여부
- 본인 리소스 여부

이 단계가 **인가(Authorization)** 이다.  

### 흐름 요약

1. 로그인 → JWT 발급
2. 클라이언트가 JWT 저장
3. 요청마다 JWT 전달
4. 서버가 JWT 검증
5. payload 복원
6. 권한 판단 후 API 실행

---

## .env

민감한 설정값(DB 계정, 암호키 등)을 코드에서 분리하기 위한 환경 변수 파일이다.  
JWT의 암호키도 반드시 `.env` 로 관리해야 한다.  

```env
PRIVATE_KEY=xxxx
```

```js
process.env.PRIVATE_KEY
```

---

## Cookie + JWT

JWT 토큰을 쿠키에 담아 클라이언트로 전달할 수 있다.  
이후 요청마다 쿠키에 담긴 JWT를 서버가 검증해 사용자 인증을 처리한다.  

```js
res.cookie('token', token, { httpOnly: true })
```

cookie parameter로 option을 지정할 수 있는데,  
그 중 httpOnly는 JS 접근 차단하여 XSS를 방어하는 역할을한다.  
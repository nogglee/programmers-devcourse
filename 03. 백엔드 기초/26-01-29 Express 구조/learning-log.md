# 학습 내용

### Express 구조 이해하기

백엔드를 위한 기초 개념을 공부하면서 Express를 사용해 여러 API를 직접 만들어봤지만,
초기에는 각각의 파일을 따로 실행하며 API 응답만 확인하는 방식으로 실습을 진행했었다.

이와 같은 방식은 파일별 만들어져있는 개별 기능 테스트에는 문제가 없었지만,
서버를 하나로 통합하여 전체 요청 흐름이 끊기지 않게 했어야했다.

그래서 Express의 router module을 사용하여 기존 API 파일들을 하나의 서버로 통합하였다.

**기존 디렉토리 구조**
```
demo-folder/
├── users.js
├── channels.js
├── node_modules/
└── package.json
```

**통합된 구조**
```
demo-folder/
├── app.js
├── routes/
│   ├── users.js
│   └── channels.js
└── package.json
```

---

### server의 역할

app.js 파일은 Express server의 진입점이다.
이곳에서는, 아래와 같은 작업을 하게된다.
* Express server 생성
* middleware 등록
* 각 router 연결

즉, 서버의 진입점에서는 비즈니스 로직을 처리하기보다는,
클라이언트 요청을 받고 URL에 맞는 router로 전달하는 역할을 한다.

한마디로 중앙에서 각 통로로 들어오는 요청을 분기하는 역할이라고 이해할 수 있다.

---

### router의 역할
route는 특정 리소스를 담당할 수 있다.

예를들어 아래와 같이 리소스 단위로 router를 분리할 수 있다.
`/users` 경로를 가진 API는 userRouter로 묶어서 관리
`/channels` 경로를 가진 API는 channelRouter로 묶어서 관리

router 정의할 때 필요한 요소는 아래와 같다.
* URL path
* HTTP method
* 해당 요청을 처리할 handler

router가 구성된 각 요소들을 사용하여 아래와 같이 동작한다.
1. URL path와 HTTP method가 일치하는 요청이 들어오면
2. handler를 실행하여 응답을 반환한다.

---

### router를 사용하는 이유

기존에는 각각의 파일을 실행하여 API를 테스트했지만,
router를 도입하면서 하나의 Express server에서 모든 API를 관리하게되었다.

router 적용 전 / 후 느낀 차이점은 아래와 같다.
* server 설정과 API 로직을 파일 단위로 분리할 수 있다.
* 도메인별로 API를 그룹핑하여 관리할 수 있다.

이러한 장점이 있기에 router는 경로 분기처리에만 사용되는 것이 아니라
리소스 단위로 서버 구조를 만드는 핵심 요소라고 느꼈다.

### Express 요청 흐름 복기하기

1.	클라이언트가 요청을 보낸다
2.	app.js가 요청을 받는다
3.	URL에 맞는 router로 전달한다
4.	router가 method와 path 기준으로 handler를 선택한다
5.	handler가 로직을 수행하고 res로 응답한다

**Client → app.js → router → handler → response**
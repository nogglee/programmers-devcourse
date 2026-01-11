# 학습 내용

### 01. API

> **API:**  
> Application Programming Interface의 약자로, 
> 서버가 제공하는 기능을 외부에서 사용할 수 있도록 정의한 인터페이스이다.  

HTTP는 클라이언트와 서버가 어떻게 요청/응답을 주고받을지 정한 약속이다.  

웹 환경에서는 주로 HTTP를 통해 API를 호출하며,  
이때 HTTP 메서드와 리소스 개념을 잘 지킨 RESTful한 설계를 사용하면  
구조적 일관성, 확장성, 유지보수성 측면에서 효율이 높아진다.  

즉, REST는 통신을 속도를 높인다기 보단, 통신을 잘 설계하게 만드는 원칙에 가깝다.  

* REST API: REST 스타일로 만든 API 전반을 가리키는 통칭
* RESTful API: REST 원칙을 잘 지키고 있음을 강조하는 표현

### 02. HTTP 메서드와 리소스

* HTTP 메서드: CRUD 작업을 수행하는 방법
  * GET: 리소스 조회
  * POST: 리소스 생성
  * PUT: 리소스 수정
  * DELETE: 리소스 삭제
* 리소스: API가 조작하는 대상
  * ex. `/users`, `/posts`, `/comments`
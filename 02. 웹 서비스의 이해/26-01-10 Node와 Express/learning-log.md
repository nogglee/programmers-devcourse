# 학습 내용

### 01. 백엔드 구성

백엔드는 웹 서버, 웹 어플리케이션 서버, 데이터베이스로 나뉜다.  
그 중 웹서버는 동적 페이지에 대한 처리는 직접 하지 않고, 웹 애플리케이션 서버에게 전달하며, 정적 페이지에 대해 대응한다.  

> **정적 페이지:**  
> 화면의 내용 및 데이터 등의 변동이 없는 페이지  

> **동적 페이지:**  
> 데이터 처리 및 연산을 통해 화면의 내용과 데이터가 변하는 페이지  

웹 어플리케이션 서버는 동적 페이지를 처리한다.  
데이터 연산을 위해 데이터베이스와 연결되어있으며, CRUD에 대한 처리를 요청한다.  

> **데이터베이스:**  
> 데이터를 통합하여 효율적으로 관리하기 위한 집합체  

고객(클라이언트)이 음식을 주문하면 종업원(웹서버)이 주문서를 작성하여 주방장(웹어플리케이션 서버)에게 전달하고,   
주방장은 주문서를 확인하여 냉장고(데이터베이스)에서 재료를 꺼내 음식을 제작한 후 고객에게 전달한다.  

---

### 02. Node.js

Node.js는 JavaScript를 스크립트 언어에 그치지 않고, 프로그래밍 언어 역할을 할 수 있도록 지원하는 플랫폼이다.  
Node.js를 활용하여 JavaScript로 서버를 구축할 수 있다.  

웹 서버 구축 시 HTTP module을 사용하는데, require 키워드를 통해 불러오며,  
웹 서버와 클라이언트가 통신하기 위해 포트 번호를 지정해야한다.  

```javascript
let http = require('http');

function onRequest(req, res)
{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello Node.js!</h1>');
    res.end();
}

http.createServer(onRequest).listen(8080);
```

> **module:**  
> 재사용 가능한 코드 조각  

HTTP module 사용 시 프로토콜 템플릿을 사용하여 화면에 데이터를 표시한다.  
프로토콜 템플릿은 header와 body로 구성되며, 각 요소의 역할은 아래와 같다.

* header: 통신 상태를 알려주는 역할
  * status-code: 요청에 대한 응답 상태를 나타냄
    * 200: 성공
    * 404: 페이지를 찾을 수 없음
    * 500: 서버 오류
  * content-type: 응답 데이터의 형식을 나타냄
    * text/html: HTML 문서
    * text/plain: 일반 텍스트
    * application/json: JSON 데이터

* body: 클라이언트에게 전달할 HTML 코드가 포함된다.

---

### 03. Server와 Router의 역할

서버는 클라이언트의 요청을 받아 처리하는 역할을 한다.   
라우터는 요청받은 URL을 기준으로 루트를 정해주고,  
핸들러가 해당 루트에 맞는 작업을 처리한다.  

> **URL: **  
> Uniform Resource Locator의 약자로, 인터넷 상에서 웹 페이지가 위치한 주소를 의미한다.  



# 실습 결과

1. start() 호출 시 이름 출력

   <img width="882" height="444" alt="image" src="https://github.com/user-attachments/assets/2bfef824-b2fa-4422-a771-215bfe135fc7" />

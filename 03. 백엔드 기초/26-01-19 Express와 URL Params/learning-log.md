# 학습 내용

### 01. 객체

객체는 세상에 존재하는 무언가를 의미한다.  
사람, 동물, 차량, 책 등과 같이 주어 자리에 왔을 때 문장이 만들어지면 그것은 다 객체라고 볼 수 있다.  

차량을 예로 들어 보면 차량의 속성 값은 모델, 색상, 가격, 연식 등이 있다.  
차량 한대당 각 속성값은 아래와 같이 적용할 수 있다.  
모델: 기아, 아우디, 벤츠, ...  
색상: 블랙, 블루, 레드, ...  
가격: 3천만 원, 5천만 원, 8천만 원, ...  
연식: 2024, 2025, 2026, ...  

차량의 데이터 덩어리란 차량 한대당 각 속성값이 모여서 만들어진 데이터를 의미한다.  
차량 한대의 정보를 서버로 전달할 때는 JSON 형태로 데이터를 묶어서 전달한다.  

---

### 02. JSON

JSON은 javascript object notation의 약자로,  
자바스크립트 객체가 어떤 형태로 전달되는지 표준화한 것을 의미한다.  

JSON은 객체의 모습을 텍스트로 변환하여 데이터를 하나씩 전송하지 않고. 
객체 단위로 데이터를 덩어리로 묶어서 전송한다.  

```javascript
let Kia = 
{
    "model": "Seltos",
    "color": "Black",
    "price": 30000000,
    "year": 2024
};
```

위와 같이 객체는 여러 속성(key)과 값(value)을 하나로 묶은 데이터 단위이다.  
기아차의 모델(key)은 셀토스(value) 라는 값으로 구성되어 있다.  

이러한 key:value 쌍이 여러개가 모여서 하나의 객체가 이루어지고,   
서버에선 이렇게 구성된 객체를 JSON 형태로 변환하여 데이터를 전달한다.  

---

### 03. URL 파라미터

URL 파라미터는 여러 객체 중. 
어떤 객체를 대상으로 요청하는지를 구분하기 위한 식별자 역할을 한다.  

예를 들어 상품 목록페이지에서 각 상품의 상세페이지로 이동했을 때  
"특정 상품에 대한 정보를 주세요"라는 요청을하게 된다.  
이때 어떤 상품을 요청한건지 구분하기 위하여 URL에 파라미터를 포함하는 것이다.  

```javascript
app.get('/products/:n', (req, res) => 
    { res.json({ num : req.params.n }) }
)
```

위 코드에서 `/products/:n`을 자세히 살펴보자.  
여기서 `:`는 해당 위치의 값을 **고정된 문자열이 아니라 변수로 처리하겠다는 선언**이다.  

`n`은 URL에서 `:n`을 통해 전달된 값을 식별하기 위한 변수 이름이며,  
Express는 이 값을 요청 객체(req)의 `params` 속성에 `{ n: 값 }` 형태의 객체로 정리하여 제공한다.  

즉, `/products/1`, `/products/3`, `/products/abc` 와 같이  
`:` 뒤에 어떤 값이 오더라도 동일한 라우터로 요청을 처리하겠다는 의미이다.  

Express가 제공하는 객체를 사용하지 않고, http module을 사용했을 때는  
아래와 같이 file을 읽어올 때나, 페이지를 전환할 때 모두 각각의 라우터를 정의해야 했었다.  

```javascript
function redRacket(res) { fs.readFile('./img/redRacket.png', function(err, data) { ... }) }
function blueRacket(res) { fs.readFile('./img/blueRacket.png', function(err, data) { ... }) }
function blackRacket(res) { fs.readFile('./img/blackRacket.png', function(err, data) { ... }) }
```

따라서 `/products/3` 과 같은 요청이 들어오면,  
Express는 URL에 포함된 값 `3`을 추출하여 `req.params` 객체로 정리한다.  

```javascript
req.params = { n: "3" }
```

결국 `app.get('/products/:n', ...)`는 콜백 함수를 **즉시 호출하는 코드가 아니라**,  
GET 요청이 들어왔을 때 `/products/:n` 패턴과 일치하면 실행할 **요청 처리 함수(handler)를 등록**하는 코드이다.  

실제로 클라이언트가 `/products/3`과 같이 요청을 보내면 Express가 URL을 분석하여  
`req.params = { n: "3" }` 형태로 값을 채운 뒤, 등록된 handler를 호출하면서  
`(req, res)` 객체를 인자로 전달한다.  

handler 내부에서는 `req.params.n` 값을 꺼내 응답 데이터로 만들고,  
`res.json(...)`을 통해 JSON 형태로 클라이언트에게 응답한다.  

---

### 04. Node.js 기본 생태계

npm은 Node.js의 기본 생태계의 주요 구성 요소 중 하나로, Node.js 개발에 필수적인 도구이다.  
'패키지 관리자'의 역할, 즉 Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할을 한다.

npm 으로 모듈을 설치할 때는 `npm install <모듈 이름>` 명령어를 사용한다. 
그리고 `package.json` 파일에 모듈 정보가 기록된다. 

npm 으로 모듈을 설치하면 `node_modules` 폴더에 모듈이 설치되고, `package.json` 파일에 모듈 정보가 기록된다. 
이때 `package.json` 파일은 프로젝트의 의존성 관리를 위한 파일이다. 
의존성을 관리하는 이유는 프로젝트의 버전 관리와 다른 개발자들이 동일한 환경에서 프로젝트를 실행할 수 있도록 하기 위함이다. 

의존성으로 관리하지 않으면 모듈마다 버전이 다르게 설치되어 버전 충돌이 발생할 수 있다. 
패키지화 하여 일괄 관리할 수 있는 것이 `package.json` 파일이다. 
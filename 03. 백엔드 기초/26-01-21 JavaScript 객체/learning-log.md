# 학습내용

### JSON과 Array의 비구조화

> **비구조화**  
> 객체나 배열에서 필요한 값만 꺼내서 변수로 만드는 문법을 의미한다.

Express에서 req.query 또는 req.params를 비구조화하는 이유는
요청한 객체 전체가 아니라 실제로 사용하는 값만 꺼내서 변수로 만들어 사용하기 위함이다.


객체는 key 기반으로 접근하기 때문에, 비구조화 시 key 이름으로 값을 찾는다.

```javascript
const obj = { a: 1, b: 2 }; // obj 객체 선언
const { a, b } = obj;       // obj의 a와 b를 꺼내서 a와 b 변수로 선언
```

두번쨰 줄의 변수 선언을 아래와 같이 해도 동일하다.  

```javascript
const a = obj.a;
const b = obj.b;
```

배열은 index 기반으로 접근하기 때문에, 비구조화 시 배열의 index 순서를 기준으로 값을 할당한다.

```javascript
const arr = [1, 2];
const [a, b] = arr;
```

두번째 줄의 변수 선언을 아래와 같이 해도 동일하다.

```javascript
const a = arr[0];
const b = arr[1];
```

순서를 건너뛸수도 있다.

```javascript
const [ , b] = arr;
// b = 2
```

### params의 탄생
웹 초창기에는 API라는 개념이 없었다.  
그 당시(1990년대) JSON, REST, SPA 등의 개념이 없었기 때문이다.  
오직 '문서'와 '하이퍼링크'만 존재했다.  

그렇기 떄문에 URL은 웹페이지 문서의 주소를 가리킨다는 의미를 가지고있었다.  
기능을 호출하거나 데이터를 요청하는 등의 API의 역할은 하지 않았다.  

그러나 웹의 규모가 커지면서 문서의 수가 많아졌고, 파일 하나하나 URL을 만들수가 없었다.  
그래서 아래와 같은 패턴이 등장하게 되었다.  

```javascript
/users/15
/articles/1245
/products/12
```

'경로'는 고정이지만, '값'을 동적으로 나타내기 위해 가변 식별자를 사용하기 시작했다.  
가변 식발자가 바로 오늘날의 params의 역할을 수행한다.  

(**Spring** @PathVariable / **Express** req.params / **Django** <int:pk>)  

---

### query의 탄생

params가 나온 뒤 웹의 규모가 커진만큼 아래와 같은 요구사항이 나타났다.  
* 게시글을 최신순으로 정렬하기
* 카테고리가 tech인 게시글만 조회하기
* 검색어가 'javascript'인 게시글만 조회하기

만약 위의 조건들을 params로 처리한다면 아래와 같다.  

```javascript
/articles/recent
/articles/tech
/articles/search/javascript
```

정렬 기준이 여러개라면? 카테고리가 수십개라면? 검색어가 수만개라면?  
아티클을 조회할 수 있는 조건의 조합이 늘어날수록 URL의 수는 폭발적으로 늘어날 것이다.  

이러한 요구사항을 처리하여 URL의 일부를 동적으로 나타내기 위해 query가 탄생했다.   
params로 선택한 '대상'을 '다른 기준'으로 조회하는 역할을 수행한다.  
articles라는 대상은 바뀌지 않지만, 정렬 기준이나 카테고리, 검색어와 같은 부가 정보를 key:value 형태로 query를  추가한다.  

```javascript
/articles?sort=recent
/articles?category=tech
/articles?search=javascript
```

---

### params vs query

params는 왜 '경로' 에 포함될까?  
params는 수많은 리소스 내에서 특정 리소스의 '정체성'을 나타내기 때문이다.  
아래와 같이 params가 바뀌면 다른 유저가 되기 때문에 정체성이라는 개념이 적용된다.  

`/users/15` -> 이 주소는 15번 유저  
`/users/22` -> 이 주소는 22번 유저  
<sup>정체성의 또 다른 예시: 사람의 주민등록번호, 직장인의 사번, 학생의 학번</sup>  

또, params는 계층적 의미 전달도 할 수 있다.  
`/users/15/orders/3` URL만 봐도 15번 유저의 3번 주문임을 알 수 있다.  

params와 query의 차이를 정리하면 아래와 같다.  

| 구분 | params (Path Parameter) | query (Query String) |
| --- | --- | --- |
| 탄생 배경 | 대상을 식별하기 위해 등장 | 같은 대상을 다른 기준으로 보기 위해 등장 |
| 웹 관점 | 주소의 일부 | 주소에 붙는 부가 정보 |
| 역할 | 리소스의 정체성(ID) | 리소스의 조건·옵션 |
| URL 위치 | 경로(path) 내부 | ? 뒤 |
| 필수 여부 | 필수 | 선택 |
| 없을 경우 | 대상을 가리킬 수 없음 | 대상은 그대로 유지됨 |
| 의미 변화 | 값이 바뀌면 다른 대상 | 값이 바뀌어도 같은 대상 |
| 주 용도 | 단일 리소스 식별 | 필터, 정렬, 검색, 페이지네이션 |
| 계층 표현 | 가능 | 불가능 |
| REST 관점 | 리소스 식별자 | 리소스 표현 방식 |
| Express 접근 | req.params | req.query |

---

# 실습결과

1. object-api-demo.js | youtuber nickname으로 호출
  <img width="550" height="256" alt="image" src="https://github.com/user-attachments/assets/acf72caf-1b4d-4c82-9c83-3957105d5f33" />
  
2. params-demo.js | 10보다 작은 수 입력, 10보다 큰 수 입력
   <img width="614" height="234" alt="image" src="https://github.com/user-attachments/assets/9b92de33-a0fb-4bc8-9e50-88625a8488b9" />
  <img width="693" height="338" alt="image" src="https://github.com/user-attachments/assets/258d90b4-7984-4bae-ba46-301f2d2f6879" />

3. map-demo.js | 존재하는 product 호출, 존재하지 않는 product 호출
   <img width="476" height="267" alt="image" src="https://github.com/user-attachments/assets/4212298e-7ddd-4064-a7dc-d16f4a80c845" />
   <img width="391" height="216" alt="image" src="https://github.com/user-attachments/assets/70b5d27e-3307-4ef3-aa42-243165dd17f3" />

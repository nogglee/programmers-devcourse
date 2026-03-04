# 블로킹과 논블로킹

DB 조회, 파일 읽기, 네트워크 요청, API 호출과 같은 작업이 있다.  
이 작업들은 CPU 계산이 아니라 외부 시스템과 통신하는 I/O 작업이다.  
그래서 작업 시간이 소요된다.  

햄버거 가게나 카페 타이쿤 게임을 보면,  
한 가지 메뉴의 모든 재료가 완료될 때까지 기다리는 것이 아니라  
조리가 오래 걸리는 재료를 먼저 올려두고 그 사이에 다른 재료를 준비한다.  

이처럼 **논블로킹**은 시간이 오래 걸릴 수 있는 작업을 먼저 맡겨두고  
완료를 기다리지 않고 다음 작업을 진행하는 방식이다.  

반대로 **블로킹**은 작업이 완료될 때까지  
다음 코드가 실행되지 않고 기다리는 방식이다.  


**블로킹 I/O**  
```
DB 요청 → 기다림 → 결과 받음 → 다음 코드 실행
```

**논블로킹 I/O**  
```
DB 요청 → 기다리지 않음 → 다음 코드 실행
          ↓
      나중에 결과 도착 
```

---

## 동기와 비동기

> 동기(Synchronous)와 비동기(Asynchronous)는 **코드 실행 흐름을 어떻게 제어하는지**를 설명하는 개념이다.  

### 동기 - Synchronous

동기 방식에서는 작업이 **순차적으로 실행된다.**  
즉, 이전 작업이 끝나야 다음 작업이 실행된다.  

```
작업 실행 → 작업 완료 → 다음 작업 실행 → 작업 완료
```

예를 들어 어떤 함수가 실행되는 동안 시간이 오래 걸리는 작업이 있다면,  
그 작업이 끝날 때까지 다음 코드는 실행되지 않는다.  

```js
console.log("1");
console.log("2");
console.log("3");
```

이 코드는 항상 다음과 같은 순서로 실행된다.  

```
1 → 2 → 3
```

앞의 코드가 끝나기 전까지 다음 코드가 실행되지 않기 때문이다.  

---

### 비동기 - Asynchronous

비동기 방식에서는 **작업이 완료될 때까지 기다리지 않고 다음 코드를 먼저 실행한다.**  

```
작업 실행 → 기다리지 않음 → 다음 코드 실행
                        ↓
                 작업 완료 후 결과 처리
```

즉, 시간이 오래 걸리는 작업이 있더라도 프로그램의 흐름이 멈추지 않고 다른 코드가 계속 실행된다.  
이러한 작업의 결과는 나중에 **콜백, Promise, async/await와 같은 방식으로 처리**된다.  

---

### Node.js에서 비동기를 발생시키는 대표적인 작업

Node.js에서는 다음과 같은 작업들이 비동기로 실행된다.  

- **setTimeout()** : 일정 시간이 지난 뒤 함수를 실행
- **setInterval()** : 일정 시간 간격으로 함수를 반복 실행
- **DB query()** : 데이터베이스 조회 및 데이터 처리
- **파일 시스템(fs)** : 파일 읽기, 쓰기 등 파일 I/O 작업

이러한 작업들은 대부분 **I/O(Input / Output)** 작업이며,  
외부 시스템(DB, 파일, 네트워크 등)과 통신하기 때문에  
완료까지 시간이 걸릴 수 있다.  

그래서 Node.js에서는 이러한 작업들을 비동기로 처리하여  
프로그램이 멈추지 않고 계속 실행될 수 있도록 한다.  

---

# Promise 객체 개념 정리

Promise는 **비동기 작업의 완료 상태를 표현하는 객체**이다.  

비동기 작업은 실행 즉시 결과를 반환할 수 없다.    
예를 들어 DB 조회나 파일 읽기 같은 작업은 시간이 걸리기 때문이다.  

그래서 비동기 작업이 실행되면 **결과 대신 Promise 객체가 먼저 반환되고**,   
작업이 완료되었을 때 Promise의 상태가 변경되며 결과가 전달된다.  

즉 Promise는 **"지금은 결과가 없지만 나중에 결과를 전달하겠다"** 라는 약속을 표현하는 객체이다.  

---

## Promise의 3가지 상태

Promise는 생성 시 아래 3가지 상태 중 하나를 가진다.  

1. **pending (대기)**  
   - 아직 작업이 완료되지 않은 상태

2. **fulfilled (이행)**  
   - 비동기 작업이 성공적으로 완료된 상태

3. **rejected (거부)**  
   - 비동기 작업이 실패한 상태

Promise가 처음 생성될 때는 항상 pending 상태이다.  
비동기 작업이 성공적으로 끝나면 fulfilled 상태로,  
작업이 실패하면 rejected 상태로 바뀐다.  

```js
const promise = new Promise((resolve, reject) => {

  // 비동기 작업 수행

  if (성공) { resolve(결과값) } // 이때 Promise 상태가 fulfilled로 변경됨
  else { reject(에러) } // 이때 Promise 상태가 rejected로 변경됨

});
```

Promise 상태는 결정되면 바뀌지 않는다.  

```js
const promise = new Promise((resolve, reject) => {
  resolve("성공");
  reject("에러");
});
```

예를 들어 위와 같은 함수가 실행되었을 때,  
Promise의 상태는 'fulfilled'로 변경되며, `reject()`는 무시된다.  

---

## then / catch

Promise는 비동기 작업의 결과를 표현하는 객체이기 때문에  
함수를 호출하는 순간 바로 결과값을 사용할 수 없다.  

비동기 작업이 완료되었을 때 결과를 처리하기 위해  
`.then()` 과 `.catch()` 메서드를 사용한다.  

```js
promise
  .then((result) => { console.log(result) })
  .catch((err) => { console.error(err) });
```

### then()

`then()`은 Promise가 **성공적으로 완료되었을 때(fulfilled)** 실행되는 함수이다.  
`resolve()`로 전달된 값이 `then()`의 매개변수로 전달된다.  

```js
const promise = new Promise((resolve, reject) => { resolve("성공") });

promise.then((result) => { console.log(result) }); // "성공"
```

위와 같이 `then()`은 **비동기 작업이 성공했을 때 결과를 처리하는 함수**이다.  

---

### catch()

`catch()`는 Promise가 **실패했을 때(rejected)** 실행되는 함수이다.  
`reject()`로 전달된 값이 `catch()`의 매개변수로 전달된다.  

```js
const promise = new Promise((resolve, reject) => { reject("에러 발생") });

promise.catch((err) => { console.error(err) }); // "에러 발생"
```

즉 `catch()`는 **비동기 작업에서 발생한 에러를 처리하는 함수**이다.  

---

## async / await

`async / await`는 **Promise를 더 읽기 쉽고 직관적으로 사용할 수 있도록 만든 문법**이다.  
기존 Promise 방식에서는 비동기 작업의 결과를 다음과 같이 `.then()`으로 처리해야 한다.  

```js
conn.query(sql)
  .then((result) => { console.log(result) })
```

이 방식은 비동기 작업이 많아질수록 코드가 길어지고 가독성이 떨어질 수 있다.  
그래서 등장한 문법이 **async / await**이다.  

---

### async

`async` 키워드는 **함수를 비동기 함수로 선언하는 키워드**이다.  

```js
async function getBooks() 
{
  const result = await conn.query(sql);
  return result;
}
```

`async`가 붙은 함수는 항상 **Promise를 반환한다.**  
즉 함수 내부에서 값을 `return`하면 실제로는 다음과 같은 형태가 된다.  

```
return 값 → Promise.resolve(값)
```

---

### await

`await`는 **Promise가 완료될 때까지 기다린 뒤 resolve된 값을 반환하는 키워드**이다.  

```js
const result = await conn.query(sql);
```

이 코드는 내부적으로 다음과 같은 흐름으로 동작한다.  

1. conn.query(sql) 실행
2. Promise 반환
3. Promise가 완료될 때까지 대기
4. resolve된 값을 result 변수에 할당

즉 Promise의 `.then()`에서 전달되는 값을  
`await`을 사용하면 **바로 변수에 담아 사용할 수 있다.**  
# Try-Catch로 예외처리하기

JavaScript에서 예외(Exception) 상황을 처리하기 위한 문법이다.  
코드를 실행하는 도중 에러가 발생하면 프로그램이 중단될 수 있는데,  
`try-catch`를 사용하면 에러를 잡아서 프로그램 흐름을 제어할 수 있다.  

```js
try { /* 실행할 코드 */ } 
catch (err) { /* 에러 발생 시 실행 */ }
```

`try` 블록 내부에서 에러가 발생하면 이후 코드는 실행되지 않고 즉시 `catch` 블록으로 이동한다.   
`catch`에서는 에러 객체(`err`)를 통해 에러의 정보에 접근할 수 있다.  

---

# if문과 try-catch의 차이

단순한 조건 검사는 `if`문으로 처리할 수 있다.  
하지만 다음과 같은 상황에서는 `try-catch`가 더 적합하다.  

- 여러 단계에서 다양한 에러가 발생할 수 있는 경우
- 외부 라이브러리나 API에서 발생하는 에러를 처리해야 하는 경우
- 비정상적인 상황을 하나의 예외 처리 흐름으로 관리하고 싶은 경우

`if`문만 사용할 경우 예외 상황이 많아질수록 조건문이 중첩되어 코드가 복잡해질 수 있다.  

---

# 에러 객체 (Error Object)

JavaScript에는 다양한 에러 객체가 존재한다.  

대표적인 예

```
Error
SyntaxError
ReferenceError
TypeError
```

외부 라이브러리에서도 자체적인 에러 객체를 제공한다.  
예를 들어 `jsonwebtoken` 모듈에서는 다음과 같은 에러 객체가 있다.  

```
TokenExpiredError
JsonWebTokenError
```

에러 객체에는 보통 다음과 같은 정보가 포함된다.  

- `name` : 에러의 이름
- `message` : 에러 메시지

정보를 출력해서 확인하는 방법은 아래와 같이 구문을 작성하면 된다.  

```js
catch (err)
{
    console.log(err.name);
    console.log(err.message);
}
```

---

# throw 연산자

`throw`는 **의도적으로 에러를 발생시키는 연산자**이다.  

단순히 `if`문만 사용할 경우 예외 상황이 발생해도 이후 코드가 계속 실행될 수 있다.  
하지만 `throw`를 사용하면 즉시 `catch`로 흐름을 넘길 수 있다.  

예시

```js
const string = '{ "username" : "nogglee" }';

try 
{ 
    const json = JSON.parse(string); 

    if(!json.name) { throw new SyntaxError("입력 값에 이름이 없습니다."); }
    console.log(json.name);
}
catch (err) 
{ 
    console.log(err.name); 
    console.log(err.message);
}
```

위와 같이 `throw`를 사용하여 특정 조건을 예외 상황으로 처리하면,  
예외 상황 발생 시 console.log가 실행되지 않고, `catch` 문으로 넘길 수 있다.  
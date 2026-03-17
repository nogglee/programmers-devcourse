# 클래스와 객체

클래스는 객체를 만들기 위한 설계도이며, 
객체는 클래스를 기반으로 생성된 실제 데이터이다.
클래스는 붕어빵 틀, 객체는 붕어빵과 같다고 이해할 수 있다.

```ts
// 클래스
class User {
  name: string;
  age: number;
}

// 객체
const user = new User();
```

## 클래스의 필요성

클래스를 사용하지 않는 일반 함수 구현 시
아래와 같이 데이터와 로직이 분리된다.

```ts
let name = "lee";
let age = 30;

function printUser() {
  console.log(name, age);
}
```

아래와 같이 User 클래스에 데이터를 속성으로 추가하고,
클래스 내부에 함수를 추가하여 관련된 데이터와 행동을 하나로 묶을 수 있다.
이때 속성으로 추가된 데이터를 '멤버 변수', 함수를 '멤버 함수' 또는 '메서드'라고 한다.

```ts
class User {
  name: string;
  age: number;

  print() {
    console.log(this.name, this.age);
  }
}
```

---

# 생성자

생성자는 객체 생성 시 초기값을 설정하는 함수이며, 아래와 같이 선언한다.

```ts
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user = new User();
```

⸻

## 생성자의 필요성

user 객체를 생성한 후 속성값을 별도로 초기화해야 하는데,
생성자 사용 시 객체 생성과 초기화를 동시에 할 수 있다.
이로써 객체 생성 시점에 완전한 상태를 보장할 수 있다.

```ts
// 생성자 미사용
const user = new User();
user.name = "lee";
user.age = 30;

// 생성자 사용
const user = new User("lee", 30);
```

### TypeScript에서 축약 문법

생성자를 활용하여 별도의 속성 선언 없이,
생성자를 통해 속성 선언과 값 할당을 수행할 수 있다.

```ts
// 축약 미적용
class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 축약 적용
class User {
  constructor(public name: string, public age: number) {}
}
```

---

# 접근 지정자

접근 지정자는 클래스 내부 데이터 접근 범위를 제어한다.

|키워드|	의미|
|:--|:--|
|public|	어디서든 접근 가능|
|private|	클래스 내부에서만|
|protected|	상속된 클래스까지

접근 지정자 사용은 아래와 같이 할 수 있으며,
private 변수는 앞에 '_'을 붙이는 관례가 있다.

```ts
class User {
  public name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

## Getter / Setter

private 변수를 외부에서 읽거나 수정하려면 
클래스 내부에 getter, setter 메서드를 선언해야한다.
getter는 값을 조회하고, setter는 값을 변경하는 역할을 수행한다.

```ts
class User {
  private _age: number;

  constructor(age: number) {
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set age(value: number) {
    if (value < 0) return;
    this._age = value;
  }
}

const user = new User(30); // 생성자로 초기값 설정
user.age = 25; // setter로 값 변경
```

### 왜 이런 방식으로 접근할까?

객체의 속성 값을 외부에서 접근 가능하도록 하면, 
객체의 상태가 예기치 않게 변경될 수 있다.
아래와 같이 나이 값으로 음수를 넣는 등의 잘못된 값을 입력하는 케이스를 의미한다.

```ts
user.age = -10; // 잘못된 값
```

이와 같은 케이스를 방지하기 위해 setter에 값을 검증하는 로직을 추가하고,
외부에서는 setter를 통해 값을 변경하게 하는 것이다.

```ts
set age(value: number) {
  if (value < 0) return;
  this._age = value;
}
```

---

# 인터페이스

인터페이스는 객체의 구조를 정의하는 타입이다.
즉 객체가 어떤 속성과 메서드를 가져야 하는지를 정의하는 설계도 역할을 한다.

```ts
interface User {
  name: string;
  age: number;
}
```

## 인터페이스의 필요성

객체 리터럴 타입을 직접 작성하면 아래와 같이 타입을 반복해서 적어야 하며,
구조가 길어질수록 가독성이 떨어지고 유지보수가 어려워진다.

```ts
function getInfo(id: number): {
  stdId: number;
  stdName: string;
  age: number;
  gender: string;
  course: string;
  completed: boolean;
} {
  return {
    stdId: id,
    stdName: "John",
    age: 20,
    gender: "male",
    course: "Computer Science",
    completed: false,
  };
}
```

또한 아래와 같이 객체 구조를 직접 타입으로 선언하면 재사용성이 떨어진다.

```ts
let user: { name: string; age: number };
```

이러한 문제를 해결하기 위해 인터페이스를 사용한다.

```ts
interface User {
  name: string;
  age: number;
}

let user: User = {
  name: "lee",
  age: 30,
};
```

즉 인터페이스는 객체 구조를 재사용 가능하게 만들어주며,
구조가 바뀌더라도 한 곳에서 수정할 수 있어 유지보수에 유리하다.

## 인터페이스의 주요 기능

### 선택적 프로퍼티

속성 뒤에 `?`를 붙이면 선택적 프로퍼티가 된다.
즉 해당 속성은 있어도 되고 없어도 된다.

```ts
interface User {
  name: string;
  age?: number;
}
```

### 읽기 전용 프로퍼티

속성 앞에 `readonly`를 붙이면 값을 수정할 수 없다.

```ts
interface User {
  readonly id: number;
  name: string;
}
```

### 메서드 선언

인터페이스 내부에는 속성뿐 아니라 메서드도 선언할 수 있다.

```ts
interface User {
  name: string;
  sayHello(): void;
}
```

### 확장(상속)

기존 인터페이스를 확장하여 새로운 인터페이스를 만들 수 있다.

```ts
interface Person {
  name: string;
}

interface User extends Person {
  age: number;
}
```

즉 `User`는 `Person`의 구조를 물려받으면서 추가 속성을 가질 수 있다.

## interface와 type의 차이

|구분|interface|type|
|:--|:--|:--|
|목적|객체 구조 정의|모든 타입 정의 가능|
|확장 방식|extends|`&` 사용|
|선언 병합|가능|불가능|

정리하면 인터페이스는 객체의 구조를 정의할 때 주로 사용하며,
협업과 유지보수를 위한 구조 설계 도구라고 볼 수 있다.

---

# 열거형(Enum)

열거형은 관련된 상수 값을 하나의 집합으로 묶는 타입이다.

```ts
enum Status {
  SUCCESS,
  ERROR,
  PENDING,
}
```

## 열거형의 필요성

문자열이나 숫자를 직접 사용하는 방식은 오타가 발생하기 쉽고,
허용된 값의 범위를 파악하기 어렵다.

```ts
let status = "success";
```

예를 들어 `"succes"`처럼 잘못된 값을 넣더라도,
문자열 자체로는 오류를 바로 발견하기 어렵다.

열거형을 사용하면 허용된 값만 사용할 수 있도록 제한할 수 있다.

```ts
enum Status {
  SUCCESS,
  ERROR,
}

let status: Status = Status.SUCCESS;
```

즉 열거형은 값의 범위를 명확하게 제한하여,
의미를 분명하게 만들고 잘못된 값 입력을 방지한다.

## 열거형의 기본 동작

### 숫자형 enum

별도 값을 지정하지 않으면 0부터 자동으로 증가한다.

```ts
enum Status {
  SUCCESS, // 0
  ERROR,   // 1
}
```

### 값 직접 지정

필요하다면 값을 직접 지정할 수도 있다.

```ts
enum Status {
  SUCCESS = 1,
  ERROR = 500,
}
```

### 문자열 enum

문자열 값을 직접 지정하는 방식도 가능하다.

```ts
enum Status {
  SUCCESS = "success",
  ERROR = "error",
}
```

문자열 enum은 값 자체가 의미를 가지기 때문에
실무에서는 가독성 측면에서 자주 사용된다.

## 열거형 사용 예시

```ts
enum Role {
  ADMIN = "admin",
  USER = "user",
}

function checkRole(role: Role) {
  if (role === Role.ADMIN) {
    console.log("관리자");
  }
}
```

이처럼 enum은 특정 값 집합을 제한해야 하는 상황에서 유용하다.

---

# 객체 리터럴 타입

객체 리터럴 타입은 객체의 구조 자체를 타입으로 정의하는 방식이다.
즉 값 하나하나가 아니라 객체의 형태(shape)를 타입으로 제한한다.

```ts
let person: { name: string; age: number } = {
  name: "John",
  age: 30,
};
```

## 객체 리터럴 타입의 필요성

자바스크립트에서는 객체 구조가 보장되지 않는다.

```ts
let person = { name: "John", age: 30 };
person = { name: "Alice" };
```

이 경우 객체 구조가 바뀌더라도 오류 없이 동작할 수 있으며,
이러한 문제는 협업 시 데이터 형태를 신뢰하기 어렵게 만든다.

타입스크립트에서는 객체 리터럴 타입을 사용하여 구조를 강제할 수 있다.

```ts
let person: { name: string; age: number };

person = { name: "John", age: 30 };
person = { name: "Alice", age: 25 };
person = { name: "Alice" }; // 에러
```

즉 객체 구조를 고정하여 데이터 일관성을 보장할 수 있다.

## 객체 리터럴 타입의 특징

### 구조 기반 타입 시스템

타입스크립트는 타입의 이름이 아니라 구조를 기준으로 타입 호환 여부를 판단한다.

```ts
type A = { name: string };
type B = { name: string };

let a: A = { name: "lee" };
let b: B = a;
```

위와 같이 구조가 같다면 서로 호환될 수 있다.

### 프로퍼티 타입 강제

```ts
let person: { name: string; age: number };

person = {
  name: "John",
  age: "30", // 에러
};
```

### 추가 프로퍼티 제한

```ts
let person: { name: string; age: number };

person = {
  name: "John",
  age: 30,
  height: 180, // 에러
};
```

즉 정의되지 않은 속성은 허용되지 않는다.

## 객체 리터럴 타입의 한계

객체 리터럴 타입을 직접 작성하면 구조가 길어질수록 반복이 많아지고 가독성이 떨어진다.

```ts
let user: { name: string; age: number; email: string };
```

이러한 이유로 실무에서는 보통 `type` 또는 `interface`를 사용하여 별도로 분리한다.

```ts
type User = {
  name: string;
  age: number;
};

let user: User = {
  name: "lee",
  age: 30,
};
```

```ts
interface User {
  name: string;
  age: number;
}

let user: User = {
  name: "lee",
  age: 30,
};
```

정리하면 객체 리터럴 타입은 객체 구조를 강제한다는 점에서 유용하지만,
재사용성과 유지보수를 위해서는 별도의 이름을 붙여 관리하는 방식이 더 적절하다.

---

# any 타입, 유니온 타입, 타입 별칭, 타입 가드

## any 타입

`any` 타입은 어떤 값이든 허용하는 타입이다.

```ts
let data: any;
```

### any 타입을 주의해야 하는 이유

`any`는 타입 체크를 하지 않기 때문에,
타입스크립트를 사용하는 의미를 약하게 만든다.

```ts
let data: any = "hello";
data = 123;
data.toUpperCase();
```

위 코드는 컴파일 단계에서는 통과할 수 있지만,
실행 시점에 오류가 발생할 수 있다.

따라서 `any`는 정말 타입을 알 수 없는 경우에만 제한적으로 사용해야 하며,
가능하다면 더 안전한 방식으로 타입을 명시하는 것이 좋다.

## 유니온 타입

유니온 타입은 여러 타입 중 하나를 허용하는 방식이다.

```ts
let value: string | number;
```

위 변수는 문자열 또는 숫자만 할당할 수 있다.

```ts
value = "hello";
value = 123;
value = true; // 에러
```

즉 가능한 타입 범위를 명확하게 제한할 수 있다.

## 타입 가드

유니온 타입을 사용할 때는 현재 값이 어떤 타입인지 알 수 없기 때문에,
바로 특정 메서드를 사용할 수 없다.

```ts
function print(value: string | number) {
  value.toUpperCase(); // 에러
}
```

이 문제를 해결하기 위해 타입 가드를 사용한다.

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

타입 가드는 유니온 타입을 실제로 안전하게 사용할 수 있게 해주는 장치라고 볼 수 있다.

대표적으로 다음과 같은 방식이 있다.

- `typeof`
- `instanceof`
- `in` 연산자

## 타입 별칭 (Type Alias)

타입 별칭은 복잡한 타입에 이름을 붙여 재사용하는 방식이다.

```ts
type User = {
  name: string;
  age: number;
};
```

### 타입 별칭이 필요한 이유

객체 구조를 반복해서 직접 작성하면 코드가 길어지고 유지보수가 어려워진다.

```ts
let user: { name: string; age: number };
```

이를 별칭으로 분리하면 코드를 더 읽기 쉽게 만들 수 있다.

```ts
type User = {
  name: string;
  age: number;
};

let user: User;
```

유니온 타입과 함께 사용할 수도 있다.

```ts
type Status = "success" | "error" | "pending";
```

또한 `&`를 사용하면 여러 타입을 결합할 수 있다.

```ts
type A = { name: string };
type B = { age: number };

type C = A & B;
```

즉 타입 별칭은 복잡한 타입을 이름으로 추상화하여 재사용하기 위한 도구이다.

---

# Array와 Tuple

## Array

Array는 같은 타입의 데이터들을 순서대로 저장하는 자료구조이다.

```ts
let numbers: number[] = [1, 2, 3];
let numbers2: Array<number> = [1, 2, 3];
```

### Array의 특징

- 길이가 가변적이다.
- 모든 요소의 타입이 동일하다.

```ts
let arr: string[] = ["a", "b", "c"];

arr.push("d");
arr.push(1); // 에러
```

즉 Array는 동일한 성격의 데이터 목록을 다룰 때 적합하다.

## Tuple

Tuple은 각 요소의 타입과 순서가 고정된 배열이다.

```ts
let user: [string, number] = ["lee", 30];
```

### Tuple의 특징

- 길이가 고정된다.
- 각 인덱스마다 타입이 다를 수 있다.
- 요소의 순서가 중요하다.

```ts
let userInfo: [string, number];

userInfo = ["lee", 30];
userInfo = [30, "lee"]; // 에러
```

Tuple은 배열만으로는 표현하기 어려운 구조 데이터를 표현할 때 유용하다.

예를 들어 아래와 같은 데이터는 일반 배열로 표현하면 의미가 모호할 수 있다.

```ts
let data = ["lee", 30];
```

하지만 Tuple을 사용하면
첫 번째 값은 문자열, 두 번째 값은 숫자라는 의미를 명확하게 고정할 수 있다.

```ts
let user: [string, number] = ["lee", 30];
```

## Array와 Tuple의 차이

|구분|Array|Tuple|
|:--|:--|:--|
|길이|가변|고정|
|타입|동일|각 요소마다 다를 수 있음|
|순서 의미|없음|있음|
|사용 목적|리스트|구조 데이터|

정리하면 Array는 같은 타입의 데이터를 묶는 데 적합하고,
Tuple은 서로 다른 타입의 값들을 정해진 순서대로 표현할 때 적합하다.
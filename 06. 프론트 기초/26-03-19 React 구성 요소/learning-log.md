# React 컴포넌트

React 컴포넌트는 두 가지 방식으로 작성할 수 있다.  

**클래스 컴포넌트**
과거에는 상태 관리와 생명주기를 사용하기 위해  
아래와 같은 클래스 컴포넌트를 사용해야 했다.   

```ts
class App extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

**함수형 컴포넌트**
하지만 Hooks 등장 이후 아래와 같은 함수형 컴포넌트에서도  
동일한 기능을 사용할 수 있게 되었다.  

```ts
function App() {
  return <h1>Hello</h1>;
}
```
현재는 함수형 컴포넌트를 주로 사용하지만,  
React 동작 원리 이해하거나 기존 코드 유지보수를 위해  
클래스 컴포넌트를 알아야한다.  

## state란?

React에서 상태는 **UI를 바꾸는 데이터**를 의미한다.  
함수형 컴포넌트에서는 상태를 관리하기 위해 `useState` Hook을 사용한다.  

```ts
const [count, setCount] = useState(0);
```

## props란?

props는 부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터이다.  
즉 컴포넌트 간의 데이터 전달을 위한 수단이다.  

컴포넌트를 사용하는 이유 중 '재사용 가능'이란 특성을 살리려면  
내부의 값을 직접 정의하는 것이 아니라,  
하나의 틀을 만들어두고 외부로부터 값을 유동적으로 전달 받아야한다.  

```ts
<MyWeather weather="맑음">☀️</MyWeather>

function MyWeather(props) {
  return <div>{props.weather}</div>;
}
```

위 예시를 보면, MyWeather 컴포넌트는 weather props로 날씨 값을 전달 받고 있다.  
전달할 날씨가 다른 날씨라면 아래와 같이 값을 전달할 수 있다.  

```ts
<MyWeather weather="눈" />
<MyWeather weather="비" />
```

아래와 같이 props를 구조 분해와 함께 사용하면 가독성을 개선할 수 있다.  

```ts
function MyWeather({ weather, children }) {
  return <div>{weather}</div>;
}
```

## 클래스 컴포넌트의 this

this는 현재 클래스 인스턴스를 가리킨다.  

> this.props → 전달받은 데이터  
> this.state → 내부 상태  

클래스 컴포넌트는 객체 기반으로 동작하기 때문에  
컴포넌트 내부 데이터에 접근하기 위해 this가 필요하다.  
(클래스 → 인스턴스 생성 → this로 접근)  

```ts
// 클래스 컴포넌트 예시
class MyWeather extends Component<MyProps>{
  render(){
    return (
      <div>
        {this.props.weather}
      </div>
    )
  }
}
```

---

# 구조 분해 할당

구조 분해 할당은 배열이나 객체의 값을 변수에 쉽게 나누어 담는 문법이다.  

**배열 구조 분해 예시**  

```ts
const colors = ['red', 'green', 'blue'];
const [f, s, t] = colors;

console.log(f); // red
console.log(s); // green
console.log(t); // blue
```

**객체 구조 분해 예시**  

```ts
const person = {
  name: 'lee',
  age: 20,
  city: 'seoul'
};

const { name, age, city } = person;
```

## React의 구조 분해 할당

React에서는 props와 state를 다룰 때 구조 분해 할당이 필수적으로 사용된다.  

```ts
// state
const [state, setState] = useState();

// props
function User({ name, age }) {
  return <div>{name}</div>;
}
```

## setter 함수

객체지향 캡슐화의 특징을 복기해보면, 멤버 변수는 외부에서 직접 접근할 수 없고,   
getter함수를 통해 조회하거나 setter 함수를 통해서 수정할 수 있었다.   

React에서도 캡슐화 개념과 동일하게 state는 직접 수정할 수 없고,  
반드시 setter 함수를 통해서만 변경해야 한다.  

```txt
setState = 상태 변경 + 리렌더링 트리거
```

---

# 데이터 반복 처리 (map)

React에서는 배열 데이터를 화면에 출력할 때 `map`을 사용한다.  

```ts
const list = [1, 2, 3];

return (
  <>
    {list.map((item) => (
      <div key={item}>{item}</div>
    ))}
  </>
);
```

## map 사용 이유

- JSX 내부에서 반복 처리가 가능하다.
- 새로운 배열을 반환하여 불변성을 유지한다.
- 선언형 방식으로 UI를 구성할 수 있다.

---

# React 상태 변경

React에서는 상태를 직접 변경하면 안 된다.  

```ts
// 잘못된 방식
state.push(4);
```

이 방식은 기존 데이터를 변경하기 때문에  
React가 상태 변화를 제대로 감지하지 못할 수 있다.  

```ts
// 올바른 방식
setState([...state, 4]);
```

위와 같이 기존 데이터를 유지한 채 새로운 데이터를 생성하여  
상태를 업데이트해야 한다.  

## 스프레드 연산자와 불변성

```ts
let a = [1, 2, 3];
let b = a;

console.log(a === b); // true
```

두 변수는 같은 주소를 참조하고 있다.  
즉 하나를 수정하면 다른 하나도 영향을 받기 때문에   
아래와 같이 스프레드 연산자를 활용하여 새로운 배열을 생성한다.  

```ts
let c = [...a];

console.log(a === c); // false
```

새로운 배열이 생성되면 기존 배열과는 다른 메모리 공간을 사용한다.  
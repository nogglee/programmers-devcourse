# npm 과 npx 차이

## npm

npm은 패키지를 설치하고 관리하는 도구이다.

- 패키지를 로컬 또는 글로벌에 설치
- 설치된 패키지를 재사용

## npx

npx는 패키지를 설치하지 않고 즉시 실행할 수 있는 도구이다.

- 일회성 실행에 적합
- 최신 버전 사용 가능
- 불필요한 설치 방지

### 차이 정리

|구분|npm|npx|
|:--|:--|:--|
|목적|설치|실행|
|설치 여부|필요|불필요|
|사용 상황|지속 사용|일회성 실행|

---

# Redux

Redux는 애플리케이션의 상태를 중앙에서 관리하기 위한 상태관리 라이브러리이다.

React는 기본적으로 컴포넌트 단위로 상태를 관리하는데,
여러 컴포넌트에서 동일한 상태 공유 필요할 때가 있다.

앱 규모가 커지면 상태 흐름 추적 어려워질 수 있는데,
이러한 문제를 해결하기 위해 Redux를 사용한다.

## Redux의 핵심 구조

Redux는 다음과 같은 흐름으로 동작한다.

```txt
Action → Dispatch → Reducer → Store → Component
```

### 1. Action

상태 변경을 설명하는 객체

```ts
{ type: "ADD_TODO" }
```

### 2. Dispatch

Action을 Reducer로 전달하는 함수

```ts
dispatch({ type: "ADD_TODO" });
```

### 3. Reducer

현재 상태와 Action을 받아 새로운 상태를 반환하는 함수

```ts
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
}
```

### 4. Store

애플리케이션의 전체 상태를 저장하는 공간

```txt
Store = 단일 상태 저장소
```

### 5. Component

Store의 상태를 구독하고 변경 시 리렌더링된다.

---

## Redux Toolkit

Redux Toolkit은 Redux 사용을 단순화하기 위한 공식 도구이다.
대표적으로 `Reducer` 와 `Action` 을 하나로 묶을 수 있는 `Slice`가 있다.

```ts
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
});
```

---

## useSelector

useSelector는 Store의 상태를 조회할 때 사용하는 Hook이다.
Store 상태를 구독하고, 상태 변경 시 컴포넌트 자동 리렌더링한다.

```ts
const value = useSelector((state) => state.counter);
```


---

## useDispatch

useDispatch는 Action을 전달할 때 사용하는 Hook이다.

```ts
const dispatch = useDispatch();
dispatch(increment());
```
# CSS-in-JS

CSS-in-JS는 스타일을 JavaScript 안에서 관리하는 방식이다.  

**기존 CSS의 문제점**

* 전역 충돌
* 스타일 우선순위 관리 어려움
* 의존성 파악 어려움
* 상태에 따른 스타일 변경 번거로움


**CSS-in-JS의 해결 방식**

```js
// example
<div className={`toggle ${isActive ? 'active' : ''}`}>
```

* 컴포넌트 단위 스타일 관리
* 상태 기반 스타일링 가능
* 캡슐화 가능

---

# Global Style

브라우저마다 기본 스타일이 다름으로 인해,  
UI 깨짐 발생하고 일관성이 저하되는 문제점이 있다.  

global style은 프로젝트 전체에 적용되는 스타일을 설정하여 이와 같은 문제를 해결한다.  
라이브러리로는 아래와 같은 것들이 있다.  

- reset.css
- normalize.css
- sanitize.css

---

# Theme

theme는 색상, 폰트, spacing 등 디자인 시스템을 정의하는 객체이다.  
아래와 같은 이점을 얻기 위해 사용한다.  

- UI 일관성 유지
- 유지보수 용이
- 재사용성 증가
- 사용자 설정 가능 (다크모드 등)

---

# Context API

Context API는 전역 상태를 컴포넌트 트리 전체에 전달하는 방법이다.  
props로 데이터를 전달하면 drilling이 발생한다.  

> **drilling이란?**  
> 컴포넌트 트리에서 데이터를 전달하기 위해 불필요한 컴포넌트를 거쳐야 하는 현상  

위 문제를 해결하기 위해 중간 전달 없이 직접 접근할 수 있는 Context API를 사용한다.  

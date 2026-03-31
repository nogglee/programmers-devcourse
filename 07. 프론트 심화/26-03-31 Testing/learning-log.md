# 테스트 도구

테스트는 코드가 의도한 대로 동작하는지 검증하는 과정이다.
기능 변경 시 기존 기능이 깨지는 문제를 방지하고, 버그를 조기에 발견할 수 있다.


## Jest

Jest는 JavaScript 테스트 프레임워크이다.

### 특징
- 설정이 간단 (zero config)
- 빠른 실행 속도
- mocking 지원
- snapshot 테스트 지원

### 기본 사용
```javascript
test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});
```

### API

```javascript
expect(value).toBe(result);
expect(value).toHaveStyle('color: red');
```

---

## Vite 기반 테스트 환경

Vite는 빠른 개발 환경을 제공하는 빌드 도구이다.
테스트 환경에서는 Vitest를 함께 사용한다.

기존 Jest는 설정 복잡하고 느린 실행 속도를 가진다.
Vite + Vitest는 빠른 실행 + 간단한 설정을 제공한다.

```javascript
import { describe, it, expect } from 'vitest';

describe('sum', () => {
  it('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2);
  });
});
```

---

## Jest vs Vitest

|:--|:--|:--|
| 구분 | Jest | Vitest |
| 실행 속도 | 느림 | 빠름 |
| 설정 | 복잡 | 간단 |
| 환경 | Node 기반 | Vite 기반 |
| ESM 지원 | 제한적 | 기본 지원

---

# React 컴포넌트 테스트

React Testing Library는 UI 관점에서 테스트하는 도구이다.

## 기본 사용

```javascript
import { render, screen } from '@testing-library/react';

test('버튼 렌더링', () => {
  render(<button>클릭</button>);
  expect(screen.getByText('클릭')).toBeInTheDocument();
});
```

## 이벤트 테스트

```javascript
import userEvent from '@testing-library/user-event';

test('클릭 이벤트', async () => {
  const user = userEvent.setup();
  render(<button onClick={() => console.log('click')}>클릭</button>);
  
  await user.click(screen.getByText('클릭'));
});
```

---

# 유형별 테스트

## 단위 테스트 (Unit Test)

함수 단위 테스트

```javascript
function sum(a, b) {
  return a + b;
}
```

## 통합 테스트 (Integration Test)

여러 기능이 함께 동작하는지 테스트

## E2E 테스트

실제 사용자 흐름 테스트

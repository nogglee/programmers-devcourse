# JavaScript 문법

소프트웨어 개발자는 코드를 통해 컴퓨터에게 명령을 내리고, 컴퓨터는 이를 순서대로 실행한다.
JavaScript에서 이러한 코드의 실행 구조를 구성하는 기본 단위는 **표현식(Expression)** 과 **문(Statement)** 이다.

## 표현식

표현식은 평가(Evaluation)되었을 때 **하나의 값을 생성하는 코드 조각**이다. 

```JS
1 + 2               // 산술 표현식
getName()           // 함수 호출 표현식
true                // 리터럴 표현식
```

## 문

문(Statement)은 프로그램을 구성하는 **실행 단위**로, 특정 작업을 수행하도록 지시하는 코드이다.  

```JS
let name;           // 변수 선언문
name = 'nogglee';   // 할당문
console.log(name);  // 출력문

function abc() {}   // 함수 선언문
if(true) {}         // 조건문
while(true) {}      // 반복문
```

### 제어 흐름 (Flow Control)

문 중에는 프로그램의 **실행 흐름을 제어하는 구문**들이 있으며 이를 **제어 흐름** 이라고 한다.
JavaScript에서 대표적인 제어 흐름 구문은 다음과 같다.

### 조건 분기 (Choice)

조건문은 일부 조건이 충족되는 경우에만 일련의 명령문을 실행한다.

#### if...else문

if else문은 논리조건의 참 또는 거짓에 따라 명령문을 실행해야 할 경우 사용한다.
조건으로는 boolean으로 결과를 낼 수 있는 표현식을 대입 가능하며,
false, undefined, null, 0, NaN, "" 등은 false로 평가된다.

```JS
if (조건) { /* 조건이 참일 때 실행할 코드 */ }          // if절
else if(조건) { /* 다른 조건이 참일 때 실행할 코드 */ }  // else if절
else { /* 모든 조건이 거짓일 때 실행할 코드 */ }        // else절
```

#### switch문

switch문은 switch에 명시된 표현식을 평가한 후,
평가된 값과 case의 라벨 값을 비교하여 일치하는 case의 명령문을 실행한다.
평가된 값에 해당하는 case문이 없을 경우 default의 명령문이 실행된다.

```JS
switch (표현식)
{
    case 라벨1:
        // 표현식의 값이 라벨1일 때 실행할 코드
        break;
    case 라벨2:
        // 표현식의 값이 라벨2일 때 실행할 코드
        break;
    default:
        // 표현식의 값이 어떤 case에도 해당하지 않을 때 실행할 코드
}
```

### 반복 (Loop)

반복문은 특정 조건이 만족되는 동안 코드를 반복 실행한다.

#### while문

while문은 조건을 평가한 후, 조건이 참인 경우에만 코드를 반복 실행한다.
반복문 시작 시점에 평가하기 때문에, 조건이 처음부터 거짓인 경우 본문을 생략할 수 있다.

```JS
while (조건식) { /* 반복할 코드 */ }
```

#### do...while문

do...while문은 본문을 먼저 실행한 후, 조건을 평가한다.
때문에 조건이 처음부터 거짓인 경우라도 최소 한 번은 본문이 실행된다.

```JS
do { /* 반복할 코드 */ } while (조건식);
```

#### for문

for문은 특정 조건이 만족되는 동안 코드를 반복 실행한다.
while문과는 다르게, 해당 루프와 관련된 **loop 변수**가 존재한다.
또, loop변수의 비교 및 증감을 위해 별도의 문법이 필요하다.

```JS
for (초기문; 조건문; 증감문) { /* 반복할 코드 */ }
```

**[ 초기화-조건식-증감문 ]의 형식**

* 초기문 : loop 내에서 사용할 loop 변수를 초기화한다.
* 조건문 : loop 내 코드 실행 전, 조건을 평가하여 loop를 지속할지 판단한다.
* 증감문 : loop 내 코드 실행 후, loop 변수를 증감시킨다.

#### for...of문

for...of문은 반복 가능한 객체(배열, 문자열 등)의 요소를 하나씩 순회한다.
각 요소에 대해 지정된 명령문을 실행한다.

```JS
for (변수 of 반복가능객체) { /* 반복할 코드 */ }
```

#### for...in문

for...in문은 객체의 모든 열거 가능한 속성에 대해 반복한다.
각 속성에 대해 지정된 명령문을 실행한다.

```JS
for (변수 in 반복가능객체) { /* 반복할 코드 */ }
```

### 반복 제어

반복문의 실행 흐름을 변경한다.

#### break문

가장 가까운 `while`, `do...while`, `for`, `switch` 문을 종료하고, 다음 명령어로 넘어간다.

```JS
const foo = (type) =>
{
    switch (type)
    {
        case 'apple':
            console.log('사과');
        case 'banana':
            console.log('바나나');
            break;
        default:
            console.log('알 수 없는 과일');
    }
    console.log('종료');
};

foo('apple'); // 사과 -> 바나나 -> 종료
```

#### continue문

가장 가까운 `while`, `do...while`, `for` 문을 다시 시작하기 위해 사용된다.

```JS
const foo = () =>
{
    let count = 0;
    while (count < 3)
    {
        count++;
        console.log(count);
        continue; // 이 지점에서 종료 후 while문의 조건식 실행됨
        console.log('here');
    }
}

foo(); // 1 -> 2 -> 3
```

# 언어 개념

# 내장 객체
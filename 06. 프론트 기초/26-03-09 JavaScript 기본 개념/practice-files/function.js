// 일급 객체의 성격

// 1. 함수는 함수의 실제 매개변수가 될 수 있다.
function foo1(arg) { arg(); }
function bar1() { console.log('bar 함수를 실행함'); }

foo1(bar1); // bar 함수를 실행함

// 2. 함수는 함수의 반환 값이 될 수 있다.
function foo2(arg) { return arg; }
function bar2() { console.log('bar 함수를 실행함'); }

foo2(bar2)(); // bar 함수를 실행함

// 3. 함수는 할당명령문의 대상이 될 수 있다.
// 4. 함수는 동일비교의 대상이 될 수 있다.
const foo3 = function(arg) { return arg; }
foo3(1); // 1


// 매개변수의 특징

// 1. 기본값 매개변수 - default function parameter
function foo4(arg) { console.log(arg); }
foo4(); // undefined

function foo5(arg = 1) { console.log(arg); }
foo5(); // 1

// 2. 나머지 매개변수 - Rest parameter
function foo6(arg, ...rest) { console.log(rest); }
foo6(); // []
foo6(1); // []
foo6(1, 2); // [2]
foo6(1, 2, 3); // [2, 3]

// 3. arguments 객체
function foo7() { console.log(arguments); }
foo7(1, 2, 3); // [Arguments] { '0': 1, '1': 2, '2': 3 }


// 함수 생성 방법

// 1. 함수 선언문
function foo8() { console.log('foo8 함수 실행'); }
foo8(); // foo8 함수 실행

// 2. 함수 표현식
const foo9 = function() { console.log('foo9 함수 실행'); }
foo9(); // foo9 함수 실행

// 3. function 생성자 함수
const foo10 = new Function('console.log("foo10 함수 실행");');
foo10(); // foo10 함수 실행

// 4. 화살표 함수 표현식
const foo11 = () => { console.log('foo11 함수 실행'); }
foo11(); // foo11 함수 실행


// 함수 사용 패턴

// 1. IIFE
(function foo12() { console.log('foo12 함수 실행'); })(); // foo12 함수 실행

// 2. 재귀 함수
function foo13(n)
{
    if (n === 0) return;
    console.log(n);
    foo13(n - 1);
}
foo13(3); // 3 -> 2 -> 1

// 3. 중첩 함수
function foo14()
{
    function foo15() { console.log('foo15 함수 실행'); }
    foo15();
}
foo14(); // foo15 함수 실행

// 4. 콜백 함수
function foo16(arg) { arg(); }
foo16(() => { console.log('콜백 함수 실행'); }); // 콜백 함수 실행
if (true) 
{
    var num1 = 1;

    // block scope: {} 밖에서 사용할 수 없음(지역 변수)
    const num2 = 2; // 초기화 이후 값을 못 바꾼다.
    let num3 = 3;   // 초기화 이후 값을 바꿀 수 있다.

    num3 = 7;

    console.log(num1 + " X " + num2 + " = " + num3);    // 더하기 연산자 (속도 느림)
    console.log(`${num1} X ${num2} = ${num3}`);         // 템플릿 문자열
}
console.log(num1);
// console.log(num2);
// console.log(num3);
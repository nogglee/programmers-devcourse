async function f() 
{ 
    let promise1 = new Promise((resolve, reject) => { setTimeout(() => resolve("첫 번째 실행"), 3000) });

    // promise 객체가 할 일을 다 할 때까지 기다림
    let result1 = await promise1;
    console.log(result1)

    let promise2 = new Promise((resolve, reject) => { setTimeout(() => resolve("두 번째 실행"), 3000) });
    let result2 = await promise2;
    console.log(result2)

    let promise3 = new Promise((resolve, reject) => { setTimeout(() => resolve("세 번째 실행"), 3000) });
    let result3 = await promise3;
    console.log(result3)
}

f();
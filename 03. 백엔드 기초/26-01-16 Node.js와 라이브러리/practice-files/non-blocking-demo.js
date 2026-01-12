function first() { console.log("first!") }

function second() { console.log("second!!") }

function third() { console.log("third!!!") }

first();
setTimeout(second, 2000);
third();

/*
 * non-blocking I/O 특징을 활용하여 output을 출력한 결과
 * second!! 출력이 2초간 지연될 동안 first!과 third!!!가 출력됨
 *
 * output:
 * first!
 * third!!!
 * second!!
 */
const obj1 = {}
const obj2 = { message : "안 빔" }

const str = "1"
const num = 1

const str1 = "one"
const str2 = ""

console.log(Object.keys(obj1).length === 0)     // true
console.log(Object.keys(obj2).length === 0)     // false

console.log(Object.keys(str).length === 0)      // false : 문자열은 객체이다.
console.log(Object.keys(num).length === 0)      // true  : 숫자는 객체가 아니다.

console.log(Object.keys(str1).length === 0)     // false
console.log(Object.keys(str2).length === 0)     // true
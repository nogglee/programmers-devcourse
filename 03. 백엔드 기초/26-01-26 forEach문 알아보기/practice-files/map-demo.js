const arr = [1, 2, 3, 4, 5]

const foreachArr = arr.forEach
((a, b, c) => { return a * 2 })
console.log(arr) // [ 1, 2, 3, 4, 5 ]

const mapArr = arr.map
((a, b, c) => { return a * 2 })
console.log(arr) // [ 1, 2, 3, 4, 5 ]

console.log(`foreachArr: ${foreachArr}, mapArr: ${mapArr}`) // foreachArr: undefined, mapArr: 2,4,6,8,10
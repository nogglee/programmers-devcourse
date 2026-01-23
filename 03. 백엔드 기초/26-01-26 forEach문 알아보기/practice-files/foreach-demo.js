const arr = [1, 2, 3, 4, 5]

arr.forEach
((a, b, c) => { console.log(`a: ${a}, b: ${b}, c: ${c}`) })

let map = new Map()
map.set(7, "seven")
map.set(9, "nine")
map.set(8, "eight")

map.forEach((name, number) => { console.log(`number: ${number}, name: ${name}`) })
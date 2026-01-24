const express = require('express')
const app = express()
app.listen('3000', console.log('🚀 3000 포트 실행!!'))

const fruits = 
[
    { id : 1, name : 'apple' },
    { id : 2, name : 'orange' },
    { id : 3, name : 'strawberry' },
]

// 과일 전체 조회
app.get
(
    '/fruits', (req, res) => 
    {
        res.json(fruits)
    }
)

// 과일 개별 조회
app.get
(
    '/fruits/:id', (req, res) => 
    {
        let id = req.params.id
       
        /* 
        var currentFruit = ""

        // fruits 배열을 순회하면서 요소 하나를 꺼내어 fruit라는 이름의 객체를 넘겨준다.
        // fruit 객체의 id 값이 params의 id와 같다면 해당 객체를 currentFruit 변수에 담는다.
        fruits.forEach((fruit) => {
            if(fruit.id == id){
                currentFruit = fruit
            }
        })
        */

        // fruits 배열 안에 있는 객체 중, id 값이 params의 id 값과 같은 객체를 찾는다.
        var currentFruit = fruits.find( f => f.id == id )

        if ( currentFruit ) { res.json(currentFruit) }
        else { res.status(404).send('해당 id로 등록된 과일이 없습니다.') }
        
    }
)
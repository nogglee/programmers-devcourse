import express from 'express'
const app = express()
app.listen(3000, () => { console.log('3000 포트에서 서버 구동 중') })

let db = new Map()

let notebook = { productName : "noteBook", price: 10000 }
let cup = { productName : "cup", price: 5000 }
let chair = { productName : "chair", price: 15000 }

// key:value를 한 쌍으로 저장 -> value를 객체로 저장
db.set(1, notebook)
db.set(2, cup)
db.set(3, chair)

console.log(db.get(1))

app.get
(
    '/:id', (req, res) =>
    {
        let {id} = req.params
        id = parseInt(id)
        const result = db.get(id)

        if ( result == undefined ) { res.json({ message : '없는 상품입니다.' }) }
        else { result.id = id; res.json(result) }
        // result.id = id 는 result["id"] = id 와 같다.
    }
)
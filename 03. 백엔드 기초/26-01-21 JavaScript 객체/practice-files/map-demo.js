import express from 'express'
const app = express()
app.listen(3000, () => { console.log('3000 포트에서 서버 구동 중') })

let db = new Map()

// key:value를 한 쌍으로 저장
db.set(1, "noteBook")
db.set(2, "cup")
db.set(3, "chair")

console.log(db)
console.log(db.get(1))

app.get
(
    '/:n', (req, res) =>
    {
        const key = parseInt(req.params.n);
        let {n} = req.params;
        n = parseInt(n)
        if ( db.get(n) == undefined ) { res.json({ message : "없는 상품입니다." }) }
        else { res.json({ id : n, productName : db.get(n) }) }
        
        console.log(db.get(key))
        console.log(db.get(n))
    }
)
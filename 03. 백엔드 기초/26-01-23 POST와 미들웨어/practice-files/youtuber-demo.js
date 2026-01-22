const express = require('express')
const app = express()
app.listen( 3000, () => { console.log('3000 포트에서 서버 구동 중!') } )

let user01 = { channelTitle : "십오야", subscribers : "593만명", videoNum : "993개" }
let user02 = { channelTitle : "침착맨", subscribers : "227만명", videoNum : "6.6천개" }
let user03 = { channelTitle : "테오", subscribers : "54.8만명", videoNum : "726개" }

const db = new Map()
var id = 1 // block scope가 아닌 var를 사용

db.set(id++, user01)
db.set(id++, user02)
db.set(id++, user03)

// REST API 설계
app.get('/', (req, res) => { res.send('Hello Youtuber!') })

app.get
(
    '/youtubers', (req, res) => 
    {
        res.json(db.entries)
    }
)

app.get
(
    '/youtuber/:id', (req, res) => 
    {
        const {id} = req.params
        const youtuberId = db.get(parseInt(id))

        if( youtuberId == undefined ) { res.json({ message : '등록되지 않은 유튜버입니다.' }) }
        else { res.json(youtuberId) }
    }
)

app.use(express.json())
app.post
(
    '/youtuber', (req, res) => 
    {
        const info = req.body 

        db.set(id++, info)
        res.json({ message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!` })

        res.json(info)
    }
)

app.get('/youtuber', (req, res) => { res.json({}) })
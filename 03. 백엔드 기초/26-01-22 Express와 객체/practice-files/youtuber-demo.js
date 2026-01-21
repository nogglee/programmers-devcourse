const express = require('express')
const app = express()
app.listen( 3000, () => { console.log('3000 포트에서 서버 구동 중!') } )

let user01 = { channelTitle : "십오야", subscribers : "593만명", videoNum : "993개" }
let user02 = { channelTitle : "침착맨", subscribers : "227만명", videoNum : "6.6천개" }
let user03 = { channelTitle : "테오", subscribers : "54.8만명", videoNum : "726개" }

const db = new Map()
db.set('@15ya', user01)
db.set('@chimchakman', user02)
db.set('@teo', user03)

// REST API 설계
app.get
(
    '/youtuber/:id', (req, res) => 
    {
        const {id} = req.params
        const youtuberId = db.get(id)

        if( youtuberId == undefined ) { res.json({ message : '등록되지 않은 유튜버입니다.' }) }
        else { res.json(youtuberId) }
    }
)
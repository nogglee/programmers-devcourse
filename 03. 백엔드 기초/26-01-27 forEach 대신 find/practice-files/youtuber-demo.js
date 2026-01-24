const express = require('express')
const app = express()
app.listen( 3000, () => { console.log('3000 포트에서 서버 구동 중!') } )
app.use(express.json())

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
        var youtubers = {}

        if( db.size > 0 )
        { 
            db.forEach((youtuberInfo, youtuberId) => { youtubers[youtuberId] = youtuberInfo }) 
            res.json(youtubers)
        }
        else { res.status(404).send('조회할 유튜버가 없습니다.') }

    }
)

app.get
(
    '/youtubers/:id', (req, res) => 
    {
        const {id} = req.params
        const youtuberId = db.get(parseInt(id))

        if(youtuberId) { res.json(youtuberId) }
        else { res.status(404).send('등록되지 않은 유튜버입니다.') }
    }
)

app.post
(
    '/youtubers', (req, res) => 
    {
        const channelTitle = req.body.channelTitle
        
        if(channelTitle){ db.set(id++, req.body); res.send(`${db.get(id - 1).channelTitle}님, 유튜버 생활을 응원합니다!`)}
        else { res.status(400).send(`수정할 채널을 선택해 주세요.`) }
    }
)

app.delete
(
    '/youtubers/:id', (req, res) => 
    {
        let {id} = req.params
        id = parseInt(id)
        
        var isExistence = db.get(id)

        // 조건문을 긍정문으로 변경
        if(isExistence) 
        { 
            const channelTitle = isExistence.channelTitle
            
            db.delete(id) 
            res.send(`${channelTitle}님, 그 동안 유튜브를 이용해주셔서 감사합니다.`)        
        }
        res.status(404).send('등록되지 않은 유튜버입니다.')
        

    }
)

app.delete
(
    '/youtubers', (req, res) => 
    {
        if( db.size > 0 ) { db.clear(); res.send('전체 유투버 삭제가 완료되었습니다.') }
        else { res.status(404).send('삭제할 유투버가 없습니다.') }
    }
)

app.put
(
    '/youtubers/:id', (req, res) => 
    {
        let {id} = req.params
        id = parseInt(id)

        var youtuber = db.get(id)
        if( youtuber ) 
        {
            var newTitle = req.body.channelTitle
            youtuber.channelTitle = newTitle

            db.set(id, youtuber)
            res.send( `채널 이름이 ${newTitle}로 변경되었습니다.`)
        }

        else {res.status(404).send('등록되지 않은 유튜버입니다.') }
    }
)
import express from 'express'

const app = express()

app.listen(3000, () => { console.log('3000 포트에서 서버 구동 중') })

app.get('/', (req, res) => { res.send('Hello World') })

let youtuber = {
    user01:
    {
        channelTitle : "십오야",
        subscribers : "593만명",
        videoNum : "993개"
    },
    user02:
    {
        channelTitle : "침착맨",
        subscribers : "227만명",
        videoNum : "6.6천개"
    },
    user03:
    {
        channelTitle : "테오",
        subscribers : "54.8만명",
        videoNum : "726개"
    }
    
}

app.get
('/:nickname', (req, res) => 
    { 
        const {nickname} = req.params;
        
        // if(nickname == "@15ya") { res.json({ youtuber.user01 }) }
        if(nickname == "@15ya") { res.json({ youtuber:youtuber.user01 }) }
        else if(nickname == "@chimchakman") { res.json({ youtuber:youtuber.user02 }) }
        else if(nickname == "@teo") { res.json({ youtuber:youtuber.user02 }) }
        else { res.json({ message: "등록되지 않은 유튜버입니다." }) }
    }
)
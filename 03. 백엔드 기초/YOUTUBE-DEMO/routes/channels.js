const express = require('express')
const router = express.Router()
router.use(express.json())

let db = new Map()
var id = 1

db.set(id++, { channelTitle: '채널A', userId: 'user01' })
db.set(id++, { channelTitle: '채널B', userId: 'user01' })

router.route('/')
    .get
    (
        (req, res) => 
        {
            // let channels = {}
            var {userId} = req.body

            if(db.size && userId)
            {
                
                const channelByUser = isExist(userId)
                
                // db.forEach((channel, id) => { channels[id] = channel })
                
                if( channelByUser.length ) { res.status(200).json(channelByUser) } 
                else { notFoundChannel(res) }
                
            }
            else if( !userId ) { res.status(404).json({ message : '로그인이 필요한 페이지입니다.' }) }
            else { res.status(404).json({ message: '등록된 채널이 없습니다.' }) }

        }
    )

    .post
    (
        (req, res) => 
        {
            if(req.body.channelTitle)
            {
                db.set(id++, req.body)
                res.status(201).json({ message: `${db.get(id - 1).channelTitle} 채널의 시작을 응원합니다!` })
            }
            else { res.status(400).json({ message: `채널 이름을 입력해 주세요.` }) }
        }
    )

router.route('/:id')
    .get
    (
        (req, res) => 
        {
            let id = parseInt(req.params.id)
            const youtuber = db.get(id)
            
            if(youtuber) { res.status(200).json(youtuber) }
            else { res.status(404).json({ message : `id ${id}번은 등록되지 않은 유튜버입니다.` }) }
        }
    )
    
    .put
    (
        (req, res) => 
        {
            let id = parseInt(req.params.id)
            const channel = db.get(id)
            const oldTitle = channel.channelTitle
            
            if(channel)
            {
                const newTitle = req.body.channelTitle // 존재하는 channel 일 때만 필요한 변수
                channel.channelTitle = newTitle // channel 객체에 타이틀 뿐만 아니라 다른 value가 있다면? 하나하나 입력해줘야함. 원 객체에서 교체가 필요한 값만 교체 해주는 방식

                db.set(id, channel)
                res.status(200).json({ message : `채널명이 ${oldTitle}에서 ${newTitle} 로 변경되었습니다..` })
            }
            else { notFoundChannel(res) }
        }
    )
    
    .delete
    (
        (req, res) => 
        {
            let id = parseInt(req.params.id)
            const youtuber = db.get(id)
            
            if(youtuber)
            {
                db.delete(id)    
                res.status(200).json({ message : `${youtuber.channelTitle} 채널이 삭제되었습니다. 그 동안 이용해주셔서 감사합니다.` })
            }
            else { res.status(400).json({ message : `id ${id}번은 등록되지 않은 유튜버입니다.` }) }
        }
    )

function isExist(userId) 
{
    let channels = []
                
    db.forEach
    (
        (channel) => 
        { 
            if( channel.userId == userId ) { channels.push(channel) }
        }
    )
    return channels
}

function notFoundChannel(res)
{
    res.status(404).json({ message : '채널 정보를 찾을 수 없습니다.' })
}

module.exports = router
const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

router.route('/')
    .get
    (
        (req, res) => 
        {
            const {user_id} = req.body
            
            if(user_id)
            {
                conn.query
                (
                    'SELECT * FROM users WHERE id = ?', [user_id],
                    function(err, results)
                    {
                        if(results.length) 
                        {
                            conn.query
                            (
                                'SELECT * FROM channels WHERE user_id = ?', [user_id],
                                function(err, results)
                                {
                                    if(results.length) { res.status(200).json(results) } 
                                    else { res.status(404).json({ message : '등록된 채널이 없습니다.' }) }      
                                }
                            )
                        }
                        else { res.status(404).json({ message : '회원 정보를 찾을 수 없습니다.' }) }
                    }
                )   
            }
            else { res.status(404).json({ message : '로그인이 필요한 페이지입니다.' }) }
            
        }
    )

    .post
    (
        (req, res) => 
        {
            const {name, user_id} = req.body

            if(user_id)
            {
                if(name)
                {
                    conn.query
                    (
                        'INSERT INTO channels (name, user_id) VALUES (?, ?)', [name, user_id],
                        function(err, results)
                        {
                            if(err) { res.status(500).json({ message: `DB 정보 전송에 실패했습니다.` }) }
                            res.status(201).json({ message: `${name} 채널의 시작을 응원합니다!` })
                        }
                    )
                }
                else { res.status(400).json({ message: `채널 이름을 입력해 주세요.` }) }
            }
            else { res.status(403).json({ message: `로그인이 필요한 서비스입니다.` }) }
        }
    )

router.route('/:id')
    .get
    (
        (req, res) => 
        {
            const id = parseInt(req.params.id)

            conn.query
            (
                'SELECT * FROM channels WHERE id = ?', [id],
                function(err, results)
                {
                    if(results.length) { res.status(200).json(results) }
                    else { res.status(404).json({ message : `채널 정보를 찾을 수 없습니다.` }) }
                }
            )
        }
    )
    
    .put
    (
        (req, res) => 
        {
            const id = parseInt(req.params.id)
            
            conn.query
            (
                'SELECT * FROM channels WHERE id = ?', [id],
                function(err, results)
                {
                    if(results.length)
                    {
                        const oldName = results[0].name
                        const newName = req.body.name

                        conn.query
                        (
                            'UPDATE channels SET name = ? WHERE id = ?', [newName, id],
                            function(err, results)
                            {
                                res.status(200).json({ message : `채널명이 ${oldName}에서 ${newName} 로 변경되었습니다.` })
                            }
                        )
                    }
                    else { res.status(404).json({ message : `채널 정보를 찾을 수 없습니다.` }) }
                }
            )
        }
    )
    
    .delete
    (
        (req, res) => 
        {
            let id = parseInt(req.params.id)

            conn.query
            (
                'SELECT * FROM channels WHERE id = ?', [id],
                function(err, results)
                {
                    if(results.length) 
                    {
                        const channelName = results[0].name

                        conn.query
                        (
                            'DELETE FROM channels WHERE id = ?', [id],
                            function(err, results) { res.status(200).json({ message : `${channelName} 채널이 삭제되었습니다. 그 동안 이용해주셔서 감사합니다.` }) }
                        )
                    }
                    else { res.status(404).json({ message: '채널 정보가 없습니다.' }) }
                }
            )
        }
    )


module.exports = router
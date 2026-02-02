const express = require('express')
const router = express.Router()
const {body, param, validationResult} = require('express-validator')
const conn = require('../mariadb')

router.use(express.json())

const validate = (req, res, next) =>
{
    const err = validationResult(req)
    if(err.isEmpty()) { return next() }
    else { return res.status(400).json({ err: err.array() }) }
}

router.route('/')
    .get
    (
        [
            body('user_id').notEmpty().withMessage('로그인이 필요한 서비스입니다.').isInt().withMessage('회원 정보를 찾을 수 없습니다.'),
            validate
        ],
        (req, res) => 
        {
            const {user_id} = req.body

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
    )

    .post
    (
        [
            body('user_id').notEmpty().withMessage('로그인이 필요한 서비스입니다.').isInt(), 
            body('name').notEmpty().withMessage('채널명은 필수 입력 값입니다.'),
            validate
        ],
        (req, res) => 
        {
            const {name, user_id} = req.body

            conn.query
            (
                'INSERT INTO channels (name, user_id) VALUES (?, ?)', [name, user_id],
                function(err, results)
                {
                    if(err) { return res.status(500).json({ message: `DB 정보 전송에 실패했습니다.` }) }
                    return res.status(201).json({ message: `${name} 채널의 시작을 응원합니다!` })
                }
            )
        }
    )

router.route('/:id')
    .get
    (
        [
            param('id').notEmpty().withMessage('채널 id 필요'),
            validate
        ],
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
        [
            param('id').notEmpty().withMessage('채널 id 필요'),
            body('name').notEmpty().isString().withMessage('채널명 오류'),
            validate
        ],
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
                            function(err, results) { res.status(200).json({ message : `채널명이 ${oldName}에서 ${newName} 로 변경되었습니다.` }) }
                        )
                    }
                    else { res.status(404).json({ message : `채널 정보를 찾을 수 없습니다.` }) }
                }
            )
        }
    )
    
    .delete
    (
        [
            param('id').notEmpty().withMessage('채널 id 필요'),
            validate
        ],
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
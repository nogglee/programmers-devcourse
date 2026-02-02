const express = require('express')
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

router.route('/signin')
    .post
    (
        (req, res) => 
        {
            const {email, password} = req.body
            var loginUser = {}

            if(email && password)
            {
                conn.query
                (
                    'SELECT * FROM users WHERE email = ?', [email],
                    function(err, results) 
                    {
                        loginUser = results[0]
                        const isExisting = results.length 
                        
                        if(isExisting)
                        {
                            if(loginUser.password == password) { res.status(200).json({ message : `${loginUser.name}님, 로그인이 완료되었습니다.` }) }
                            else { res.status(400).json({ message : `비밀번호가 일치하지 않습니다.` });}
                        }
                        else { res.status(400).json({ message : `${email}로 가입한 회원 정보가 없습니다.` }) }
                    }
                )
            }
            else { res.status(400).json({ message : "아이디와 비밀번호 모두 입력해 주세요." }) }
        }
    )

router.route('/signup')
    .post
    (
        (req, res) => 
        {
            const {email, name, password, contact} = req.body
            
            if( email && name && password )
            {
                // conn.query는 비동기라서, 아래 로직이 콜백보다 먼저 실행됨
                // 따라서 '조회 -> 결과 확인 -> insert' 흐름을 콜백(또는 Promise) 안으로 넣어야 함
                conn.query
                (
                    'SELECT 1 FROM users WHERE email = ? LIMIT 1',
                    [email],
                    function (err, results) {
                        if (err) { return res.status(500).json({ message: 'DB 조회 중 오류가 발생했습니다.', error: err.message }) }

                        const isExisting = results.length

                        if (!isExisting)
                        {
                            conn.query
                            (
                                `INSERT INTO users (email, name, password, contact)
                                VALUES(?, ?, ?, ?)`,
                                [email, name, password, contact],
                                function (err, results, fields) {
                                    if (err) { return res.status(500).json({ message: '회원가입 처리 중 오류가 발생했습니다.', error: err.message }) }
                                    else { return res.status(201).json({ message: `${name}님, 회원가입을 환영합니다.`, results }) }
                                }
                            )
                        }
                        else { return res.status(400).send('이미 사용중인 아이디입니다.') }

                    }
                )
            }
            else { res.status(400).send('회원가입 정보를 모두 입력해 주세요.') }
        }
    )

router.route('/allusers')
    .get
    (
        (req, res) => 
        {
            conn.query
            (
                'SELECT * FROM users',
                function(err, results) 
                {
                    const allUsers = results 
                    if(allUsers) { res.status(200).json(allUsers) }
                    else { res.status(400).json({ message : '조회할 회원이 없습니다.' }) }
                }
            )
        }
    )

router.route('/users')
    .get
    (
        (req, res) =>
        {
            const {email} = req.body

            conn.query
            (
                `SELECT * FROM users WHERE email = ?`, [email],
                function (err, results)
                {
                    if(results.length){ res.status(200).json(results[0]) }
                    else{ res.status(400).json({ message : `해당 이메일로 등록된 계정이 없습니다.` }) }
                }
            );
        }
    )
    .delete
    (
        (req, res) => 
        {
            const {email, name} = req.body
            conn.query
            (
                'SELECT * FROM users WHERE email = ?', [email],
                function(err, results)
                {
                    if (err) { return res.status(500).json({ message: 'DB 조회 중 오류가 발생했습니다.', error: err.message }) }

                    const isExisting = results.length
                    if(isExisting)
                    {
                        conn.query
                        (
                            'DELETE FROM users WHERE email = ?', [email],
                            function(err, results, fields)
                            {
                                res.status(200).send(`회원 탈퇴가 정상적으로 처리되었습니다.\n그동안 이용해주셔서 감사합니다.`)
                            }
                        )
                    }
                    else { res.status(400).json({ message : `${email}로 등록된 계정이 없습니다.` }) } 
                }
            )
        }
    )

module.exports = router
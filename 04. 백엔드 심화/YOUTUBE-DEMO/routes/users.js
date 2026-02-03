const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const validate = (req, res, next) =>
{
    const err = validationResult(req)
    if(err.isEmpty()) { return next() }
    else { return res.status(400).json({ err: err.array() }) }
}

dotenv.config();
router.use(express.json())
    
router.route('/signin')
    .post
    (
        [
            body('email').notEmpty().withMessage('이메일을 입력해 주세요.').isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
            body('password').notEmpty().withMessage('비밀번호를 입력해 주세요.'),
            validate
        ],
        (req, res) => 
        {
            const {email, password} = req.body
            var loginUser = {}

            conn.query
            (
                'SELECT * FROM users WHERE email = ?', [email],
                function(err, results) 
                {
                    if (err) { return res.status(400).end() }
                    
                    loginUser = results[0]
                    const isExisting = results.length 
                    
                    if(isExisting)
                    {
                        const token = jwt.sign({ email : loginUser.email, name : loginUser.name }, process.env.PRIVATE_KEY, { expiresIn : '5m', issuer : 'nogglee' })
                        res.cookie("token", token, { httpOnly : true })

                        if(loginUser.password == password) { res.status(200).json({ message : `${loginUser.name}님, 로그인이 완료되었습니다.` }); console.log(token); }
                        else { res.status(403).json({ message : `비밀번호가 일치하지 않습니다.` });}
                    }
                    else { res.status(400).json({ message : `${email}로 가입한 회원 정보가 없습니다.` }) }
                }
            )
        }
    )

router.route('/signup')
    .post
    (
        [
            body('email').notEmpty().withMessage('이메일을 입력해 주세요.').isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
            body('name').notEmpty().withMessage('이름을 입력해 주세요.'),
            body('password').notEmpty().withMessage('비밀번호를 입력해 주세요.'),
            validate
        ],
        (req, res) => 
        {
            const {email, name, password, contact} = req.body
            
            conn.query
            (
                'SELECT 1 FROM users WHERE email = ? LIMIT 1', [email],
                function (err, results) {
                    if (err) { return res.status(400).end() }

                    const isExisting = results.length

                    if (!isExisting)
                    {
                        conn.query
                        (
                            `INSERT INTO users (email, name, password, contact) VALUES(?, ?, ?, ?)`, [email, name, password, contact],
                            function (err, results)
                            {
                                if (err) { return res.status(400).end() }
                                else { return res.status(201).json({ message: `${name}님, 회원가입을 환영합니다.`, results }) }
                            }
                        )
                    }
                    else { return res.status(400).send('이미 사용중인 아이디입니다.') }

                }
            )
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
                    if (err) { return res.status(400).end() }

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
        [
            body('email').notEmpty().withMessage('이메일을 입력해 주세요.').isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
            validate
        ],
        (req, res) =>
        {
            const {email} = req.body

            conn.query
            (
                `SELECT * FROM users WHERE email = ?`, [email],
                function (err, results)
                {
                    if (err) { return res.status(400).end() }
                    if(results.length){ res.status(200).json(results[0]) }
                    else{ res.status(400).json({ message : `해당 이메일로 등록된 계정이 없습니다.` }) }
                }
            );
        }
    )
    .delete
    (
        [
            body('email').notEmpty().withMessage('이름을 입력해 주세요.'),
            validate
        ],
        (req, res) => 
        {
            const {email} = req.body
            conn.query
            (
                'SELECT * FROM users WHERE email = ?', [email],
                function(err, results)
                {
                    if (err) { return res.status(400).end() }

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
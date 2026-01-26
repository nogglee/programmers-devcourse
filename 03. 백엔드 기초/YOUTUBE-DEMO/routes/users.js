const express = require('express')
const router = express.Router()

// Express의 기본 설정만으론 JSON 형태인 request body를 바로 사용할 수 없음
// 미들웨어를 추가하여 body에 담긴 값을 코드에 사용할 수 있음
router.use(express.json())

let db = new Map()
db.set('user01', { userId: 'user01', pwd: 'qwer1234!', userName: '홍길동' })

function isPasswordMatch(user, userPwd) 
{ 
    return user.pwd === userPwd 
}

function isDuplicate(userId)
{
    let obj = {}
    
    db.forEach((user) => { if( user.userId === userId ){ obj = user } })

    return obj
}

function isExist(obj) 
{
    if(Object.keys(obj).length) { return true }
    else { return false }
}

// sign in
router.post
(
    '/signin', (req, res) => 
    {
        const userInput = req.body
        let currentUser = {}
        
        if( userInput.userId && userInput.pwd ) { currentUser = isDuplicate(userInput.userId) }
        else { res.status(400).json({ message : "아이디와 비밀번호 모두 입력해 주세요." }) }

        if( isExist(currentUser)) 
        { 
          if(isPasswordMatch(currentUser, userInput.pwd)) { res.status(200).json({ message : `${currentUser.userName}님, 로그인이 완료되었습니다.` }) }  
          else { res.status(400).json({ message : `비밀번호가 일치하지 않습니다.` });}
        }
        else { res.status(400).json({ message : `${userInput.userId}로 가입한 회원 정보가 없습니다.` })  }
        
    }
)

// sign up
router.post
(
    '/signup', (req, res) => 
    {
        const newUser = req.body

        if( newUser.userId && newUser.pwd && newUser.userName )
        {
            let isExisting = false
            
            db.forEach((user) => { if( user.userId === newUser.userId ){ isExisting = true } })

            if ( !isExisting )
            {
                db.set(newUser.userId, newUser)
                res.status(201).json({ message : `${db.get(newUser.userId).userName}님, 회원가입을 환영합니다.` })
                /*
                아래와 같이 클라이언트로부터 전달 받은 객체의 값을 그대로 사용하는 것은 지양해야한다.
                클라이언트에서는 데이터 조작이 쉽기 때문에 db에 저장까지 완료한 데이터를 꺼내쓰자!

                res.json({ message : `${newUser.name}님, 회원가입을 환영합니다.` })
                */
            }
            else { res.status(400).send('이미 사용중인 아이디입니다.') }
        }
        else { res.status(400).send('회원가입 정보를 모두 입력해 주세요.') }
    }
)

// users
router.get
(
    '/allusers', (req, res) => 
    {
        const allUsers = {}

        if ( db.size > 0 )
        {
            db.forEach((user, userId) => { allUsers[userId] = user })
            res.status(200).json(allUsers)
        }
        else { res.status(400).json({ message : '조회할 회원이 없습니다.' }) }
        
    }
)

// user details
router.route('/users')
    .get
    (
        (req, res) =>
        {
            const {userId} = req.body
            const user = db.get(userId)
            if( db.has(userId) ){ res.status(200).send(`id: ${userId}, name: ${user.userName}`) }
            else { res.status(400).json({ message : `${userId}는 등록되지 않은 계정입니다.` }) }
        }
    )
    .delete
    (
        (req, res) => 
        {
            const {userId} = req.body
            const user = db.get(userId)
            if( user !== undefined ){ db.delete(userId); res.status(200).send(`회원 탈퇴가 정상적으로 처리되었습니다.\n${user.userName}님, 그동안 이용해주셔서 감사합니다.`) }
            else { res.status(400).json({ message : `${userId}는 등록되지 않은 계정입니다.` }) }
        }
    )

module.exports = router
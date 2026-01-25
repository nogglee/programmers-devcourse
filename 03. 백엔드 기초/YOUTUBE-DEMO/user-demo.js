const express = require("express");
const app = express()
app.listen(3000, console.log('🚀 3000 포트에서 서버 구동 중'))

// Express의 기본 설정만으론 JSON 형태인 request body를 바로 사용할 수 없음
// 미들웨어를 추가하여 body에 담긴 값을 코드에 사용할 수 있음
app.use(express.json())

let db = new Map()
var id = 1 // 초기화
db.set(id++, { userId: 'user01', pwd: 'qwer1234!', userName: '홍길동' })

// sign in
app.post
(
    '/signin', (req, res) => 
    {
        const user = req.body
        
    }
)

// sign up
app.post
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
                db.set(id++, newUser)
                res.status(201).json({ message : `${db.get(id - 1).userName}님, 회원가입을 환영합니다.` })
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
app.get
(
    '/users', (req, res) => 
    {
        const allUsers = {}

        if ( db.size > 0 )
        {
            db.forEach((userInfo, id) => { allUsers[id] = userInfo })
            res.status(200).json(allUsers)
        }
        else { res.status(400).json({ message : '조회할 회원이 없습니다.' }) }
        
    }
)

// user details
app
    .route('/users/:id')
    .get
    (
        (req, res) =>
        {
            const id = parseInt(req.params.id)
            const user = db.get(id)
            if( db.has(id) ){ res.status(200).send(`id: ${user.userId}, name: ${user.userName}`) }
            else { res.status(400).json({ message : `${id}번 id로 등록된 회원이 없습니다.` }) }
        }
    )
    .delete
    (
        (req, res) => 
        {
            const id = parseInt(req.params.id)
            const user = db.get(id)
            if( user !== undefined ){ db.clear(id); res.status(200).send(`회원 탈퇴가 정상적으로 처리되었습니다.\n${user.userName}님, 그동안 이용해주셔서 감사합니다.`) }
            else { res.status(400).json({ message : `${id}번 id로 등록된 회원이 없습니다.` }) }
        }
    )
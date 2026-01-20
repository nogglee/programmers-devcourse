import express from 'express'

const app = express()

app.listen(3000, () => { console.log('3000 포트에서 서버 구동 중') })

app.get('/', (req, res) => { res.send('Hello World') })

app.get('/products/:n', (req, res) => 
{ 
    if (req.params.n > 10) { console.log('url에 입력된 값이 10보다 큽니다.') }
    else { console.log('url에 입력된 값이 10보다 작습니다.') }

    let number = parseInt(req.params.n - 10);

    res.json({ num : number }) 
})

app.get
('/watch', (req, res) => 
    { 
        // const q = req.query;
        // res.json({ video : q.v, timeline: q.t }) 

        // JavaScript 객체(JSON)의 비구조화
        const { v, t } = req.query;
        res.json({ video : v, timeline: t }) 
    }
)
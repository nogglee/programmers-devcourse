const express = require('express')
const app = express()

app.listen(3000, () => { console.log('3000포트에서 서버 구동 중') })

app.get('/', (req, res) => { res.send('Hello World!') })

app.use(express.json())
app.post('/test', (req, res) => { console.log(req.body.message), res.json(req.body)})
import express from 'express'

const app = express()

app.listen(3000, () => { console.log('3000 포트에서 서버 구동 중') })

app.get('/', (req, res) => { res.send('Hello World') })
app.get('/products/:n', (req, res) => { res.json({ num : req.params.n }) })

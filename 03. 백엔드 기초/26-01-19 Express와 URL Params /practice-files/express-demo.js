import express from 'express'

const app = express()

app.listen(3000, () => { console.log('3000 포트에서 서버 구동 중') })

app.get('/', (req, res) => { res.send('Main Page') })
app.get('/hello', (req, res) => { res.send('Hello World') })
app.get('/bye', (req, res) => { res.send('Goodbye World') })
app.get('/nicemeetyou', (req, res) => { res.send('Nice to meet you') })

app.get('/test', (req, res) => { res.send('Test Page') })
app.get('/test/1', (req, res) => { res.send('Test Page 1') })
app.get('/test/2', (req, res) => { res.send('Test Page 2') })
app.get('/test/3', (req, res) => { res.send('Test Page 3') })

const express = require('express')
const app = express()
app.listen(3000, console.log('🚀 3000 포트에서 서버 구동 중'))

const userRouter = require('./routes/users')
const channelRouter = require('./routes/channels')

app.use("/", userRouter)
app.use("/channels", channelRouter)
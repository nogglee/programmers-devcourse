const express = require('express');
const app = express();
const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');

dotenv.config();
app.listen(process.env.PORT);


app.get
(
    '/jwt',
    (req, res) => 
    {
        var token = jwt.sign({ username : 'nogglee'}, process.env.PRIVATE_KEY, { expiresIn : '5m', issuer : 'admin' });
        res.cookie("jwt", token, { httpOnly : true });

        res.send('토큰 발행 완료!');
    }
)

app.get
(
    '/jwt/decoded',
    (req, res) => 
    {
        const receivedJWT = req.headers["authorization"]
        console.log("receivedJWT : ", receivedJWT)
        
        const decoded = jwt.verify(receivedJWT, process.env.PRIVATE_KEY)

        res.send(decoded);
    }
)
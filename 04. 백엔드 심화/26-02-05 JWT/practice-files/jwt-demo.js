var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');

dotenv.config()

//서명해서 토큰 발행
var token = jwt.sign({ foo:'bar' }, process.env.PRIVATE_KEY);
// token 생성 -> JWT 서명을 했다. == 페이로드, 나만의 암호키 + SHA256 알고리듬

console.log(token)

//검증 성공 시 payload 값 확인 가능
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded)
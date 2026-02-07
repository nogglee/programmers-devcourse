const crypto = require('crypto');
const password = '1111';

const salt = crypto.randomBytes(64).toString('base64');
const hashPassword =  crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

console.log(salt)
console.log(hashPassword)
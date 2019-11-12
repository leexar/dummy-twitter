const jwt = require('jsonwebtoken');
const PUBLIC_KEY = JSON.parse(require('fs').readFileSync("./public-secret.json"));

function createToken(payload){
    if(typeof payload !== "object"){
        payload = {}
    }

    if(!payload.maxAge || typeof payload.maxAge !== "number"){
        payload.maxAge = 1 * 60 * 60;
    }

    let token = jwt.sign({
        data: payload.data
    }, PUBLIC_KEY.key, {
        expiresIn: payload.maxAge,
        algorithm: 'HS256'
    })

    return token;
}

function verifyToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, PUBLIC_KEY.key, (err, decoded) => {
            if(err || !decoded)
            {
                return reject(err);
            }
            resolve(decoded);
        })
    })
}

module.exports = {
    createToken,
    verifyToken
}

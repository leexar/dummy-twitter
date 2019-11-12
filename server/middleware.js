const auth = require('./auth');

let middleware = {};

middleware.verifyToken = async (req, res, next) => {
    try
    {
        let token = req.headers.authorization.split(" ")[1];
        let decodedToken = await auth.verifyToken(token);
        req.body.tokenData = decodedToken.data;
        next();
    }
    catch(e)
    {
        res.status(400);
    }
}

middleware.verifyIds = (req, res, next) => {
    let paramsId = req.params.id;
    let { id } = req.body;
    let tokenId = req.body.tokenData.id;

    if (id != paramsId || tokenId != paramsId || id != tokenId) {
        return res.status(400);
    }

    next();
}

module.exports = middleware;
// authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = '9Z5oH!30U560vMbOU@9%#t*T1SW@OR8sPTtwIGcfD0yvcvW9Pa';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {

        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;

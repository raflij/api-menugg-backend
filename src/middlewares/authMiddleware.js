require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

class Middleware {
    verifyToken(req, res, next) {
        // get Bearer Token
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(200).json({ response: false, message: 'Access denied' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decoded.userId;
            // lanjut
            next();
        } catch (error) {
            res.status(200).json({ response: false, message: 'Invalid token', error });
        }
    }
}


module.exports = new Middleware();
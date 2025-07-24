import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.js';


const isProtected = (req, res, next) => {
    try {
        // // console.log(req.headers.authorization);
        // if (!req.headers.authorization && !req.headers.authorization.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Unauthorized access' });
        // }
        // const token = req.headers.authorization.split(' ')[1];
        // if (!token) {
        //     return res.status(401).json({ message: 'Unauthorized access' });
        // }
        // const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // if (!decoded) {
        //     return res.status(401).json({ message: 'Invalid token' });
        // }
        // req.user = decoded; // Attach user info to request
        // next();

        // This is using the cookie-based authentication
        // Uncomment if you want to use cookie-based authentication instead of header-based
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const token = req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access', error: error.message });
    }
}

export default isProtected;
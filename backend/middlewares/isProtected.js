import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.js';


const isProtected = (req, res, next) => {
    try {
        console.log('Auth middleware - Cookies:', req.cookies);
        console.log('Auth middleware - JWT_SECRET_KEY:', JWT_SECRET_KEY ? 'Set' : 'Not set');
        
        if (!req.cookies || !req.cookies.token) {
            console.log('Auth middleware - No token found in cookies');
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const token = req.cookies.token;
        console.log('Auth middleware - Token found:', token ? 'Yes' : 'No');
        
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        if (!decoded) {
            console.log('Auth middleware - Invalid token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        console.log('Auth middleware - Token decoded successfully:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Auth middleware - Error:', error.message);
        return res.status(401).json({ message: 'Unauthorized access', error: error.message });
    }
}

export default isProtected;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import { JWT_SECRET_KEY } from '../config/env.js';
import File from '../models/File.js';

export const registerUser = async (req, res) => {
    try {
        const { fullName, userName, email, password, role } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        if (role && !['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const findUser = await User.findOne({
            $or: [
                { userName },
                { email }
            ]
        });
        if (findUser) {
            return res.status(400).json({ message: 'User already exists, please login.' })
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ message: 'Error hashing password' });
                }

                const user = await User.create({
                    fullName,
                    userName,
                    email,
                    password: hashedPassword,
                    role: role || 'user', // Default to 'user' if no role is provided
                    lastLoginAt: new Date()
                });

                const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, { expiresIn: '1d' });

                res.cookie('token', token).status(201).json({
                    message: 'User registered successfully',
                    success: true,
                    data: {
                        ...user._doc,
                        password: undefined // Exclude password from response
                    }
                })
            })
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        findUser.lastLoginAt = new Date();
        await findUser.save();

        const token = jwt.sign({ id: findUser._id, role: findUser.role }, JWT_SECRET_KEY, { expiresIn: '1d' });

        res.cookie('token', token).status(200).json({
            message: 'User logged in successfully',
            success: true,
            data: {
                ...findUser._doc,
                password: undefined // Exclude password from response
            }
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const logoutUser = (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).json({ message: 'User is already logged out' });
        }

        return res.clearCookie('token').status(200).json({
            message: 'User logged out successfully',
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const { id, role } = req.user; // Assuming user is set in the request by isProtected middleware
        if (role !== 'admin' && role !== 'user') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User profile retrieved successfully',
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const getProfileDetails = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id).select('-password');
        const userFiles = await File.find({ ownerId: req.user.id });

        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User profile details retrieved successfully',
            success: true,
            data: {
                user: userDetails,
                files: userFiles || "No files"
            }
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
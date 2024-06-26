// userController.js
/*
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

exports.register = async (req, res) => {
    const { username, password, role, fullName, email } = req.body;

    if (!['student', 'warden'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    try {
        const userId = uuid.v4(); // Generate a unique userId
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userId, username, password: hashedPassword, role, fullName, email });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            let field = Object.keys(error.keyPattern)[0];
            if (field === 'username') {
                return res.status(400).json({ message: 'Username already exists' });
            } else if (field === 'email') {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
        //res.setHeader('Authorization', `Bearer ${token}`);
        res.json({ token, role: user.role }); // Send role along with token
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/
// userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

exports.register = async (req, res) => {
    const { username, password, role, fullName, email } = req.body;

    if (!['student', 'warden'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    try {
        const userId = uuid.v4(); // Generate a unique userId
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userId, username, password: hashedPassword, role, fullName, email });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            let field = Object.keys(error.keyPattern)[0];
            if (field === 'username') {
                return res.status(409).json({ message: 'Username already exists' }); // Return 409 status and message
            } else if (field === 'email') {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
        //res.setHeader('Authorization', `Bearer ${token}`);
        res.json({ token, role: user.role }); // Send role along with token
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


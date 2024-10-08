const Users = require('../Models/Users');
const { hashPassword, comparePassword } = require('../Utils/passwordUtils');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const signupValidators = [
    body('user_name').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isString().notEmpty().withMessage('Phone number is required'),
];

const registerUser = async (req, res) => {
    try {
        const { user_name, phone, password, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new Users({
            user_name,
            phone,
            email,
            password: hashedPassword
            
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await Users.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    signupValidators,
    registerUser,
    loginUser,
};

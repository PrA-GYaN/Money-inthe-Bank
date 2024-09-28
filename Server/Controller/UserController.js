const Users = require('../Models/Users');
const { hashPassword, comparePassword } = require('../Utils/passwordUtils');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const randomize = require("randomatic"); // To generate a random PIN
const bcrypt = require("bcryptjs"); // To hash the PIN
const config = require("../Config/config"); // Now using config.js

// Validators for signup
const signupValidators = [
    body('user_name').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isString().notEmpty().withMessage('Phone number is required'),
];

// User registration logic with PIN generation and validation
const registerUser = async (req, res) => {
    try {
        const { user_name, phone, password, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Generate and hash the PIN (4 digits)
        const pin = randomize("0", 4); // Generate a 4-digit random PIN
        const salt = await bcrypt.genSalt(10);
        const hashedPin = await bcrypt.hash(pin, salt);

        // Create a new user and save
        const newUser = new Users({
            user_name,
            phone,
            email,
            password: hashedPassword,
            pin: hashedPin // Save hashed PIN in the database
        });

        await newUser.save();

        // Optionally send the PIN to the user via email or SMS (not implemented here)
        res.status(201).json({ 
            message: 'User registered successfully', 
            pin // You can return this for testing, but don't do this in production
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User login logic with PIN validation
const loginUser = async (req, res) => {
    try {
        const { phone, password, pin } = req.body;

        // Validate phone and password
        const user = await Users.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        // Check if the password matches
        const isPasswordMatch = await comparePassword(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        // Check if the PIN matches
        const isPinMatch = await bcrypt.compare(pin, user.pin); // Compare hashed PIN
        if (!isPinMatch) {
            return res.status(400).json({ message: 'Invalid PIN' });
        }

        // On successful password and PIN match, generate a JWT token
        const token = jwt.sign(
            { id: user._id, name: user.user_name },
            config.JWT_SECRET,
            { expiresIn: config.TOKEN_EXPIRESIN }
        );

        // Send success response with the token
        res.header("auth-token", token).status(200).json({ 
            message: 'Logged in successfully',
            token, 
            user: { id: user._id, name: user.user_name } 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    signupValidators,
    registerUser,
    loginUser
};

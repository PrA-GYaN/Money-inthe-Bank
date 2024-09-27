import { hashPassword, comparePassword } from '../Utils/passwordUtils';
import generateTokenAndSetCookie from '../Utils/generateToken';
import jwt from 'jsonwebtoken';
const { body, validationResult } = require('express-validator');
const { connection } = require('mongoose');

const SECRET_KEY = process.env.SECRET_KEY || '123';

const signupValidators = [
    body('user_name').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isString().notEmpty().withMessage('Phone number is required'),
];

const registerUser = async (req, res) => {
    console.log("Register Rquested");
};

const loginUser = async (req, res) => {
    console.log("Login Rquested");
};

module.exports = {
    signupValidators,
    registerUser,
    loginUser,
    
};

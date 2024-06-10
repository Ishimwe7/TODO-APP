"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { requireAuth } = require('../../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const router = express_1.default.Router();
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { names, email, password } = req.body;
        if (!names || !email || !password)
            return res.status(400).json({ 'message': 'Both names, email and password are required!!' });
        if (!isValidEmail(email)) {
            return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' });
        }
        if (!isStrongPassword(password)) {
            return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' });
        }
        const duplicate = yield User.findOne({ email: email }).exec();
        if (duplicate)
            return res.status(409).json({ "duplicateError": "Email already used!" });
        const salt = yield bcrypt.genSalt();
        const hashedPassword = yield bcrypt.hash(password, salt);
        const user = new User({
            names,
            email,
            password: hashedPassword
        });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
router.put('/:id', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { names, email, password } = req.body;
        if (!isValidEmail(email)) {
            return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' });
        }
        if (!isStrongPassword(password)) {
            return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' });
        }
        const user = yield User.findByIdAndUpdate(id, { names, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
router.delete('/:id', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        const user = yield User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: `User not found ! Can't delete User` });
        }
        const deletedUser = yield User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
router.get('/', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().select('names email');
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
const age = 24 * 60 * 60;
const generateToken = (id) => {
    const token = jwt.sign({ id }, 'nyanja cyane secret', { expiresIn: age });
    return token;
};
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found !' });
        }
        else {
            const auth = yield bcrypt.compare(password, user.password);
            if (auth) {
                const token = generateToken(user._id);
                // res.cookie('jwt', token, { httpOnly: true, maxAge: age });
                //const headers = new res.header;
                res.json({ "User login succes with id ": user._id });
                res.setHeader('Authorization', `${token}`);
            }
            else {
                return res.status(400).json({ Error: 'Login Failed. Password is incorrect !' });
            }
        }
        //res.json({ "Login": "Login Success" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
module.exports = router;

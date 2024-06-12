
import express, { Request, Response } from 'express';
const User = require('../model/User');
const bcrypt = require('bcrypt');
const { requireAuth } = require('../../middlewares/authMiddleware')
const jwt = require('jsonwebtoken');

const router = express.Router();

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isStrongPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};


router.post('/register', async (req: Request, res: Response) => {
    try {
        const { names, email, password } = req.body;
        if (!names || !email || !password) return res.status(400).json({ 'message': 'Both names, email and password are required!!' });
        if (!isValidEmail(email)) {
            return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' })
        }
        if (!isStrongPassword(password)) {
            return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' })
        }
        const duplicate = await User.findOne({ email: email }).exec();
        if (duplicate) return res.status(409).json({ "duplicateError": "Email already used!" });
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            names,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/editAccount/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { names, email, password } = req.body;
        if (!isValidEmail(email)) {
            return res.status(500).json({ Invalid: 'Sorry!! You provided an invalid email.' })
        }
        if (!isStrongPassword(password)) {
            return res.status(500).json({ Invalid: 'Sorry!! Your password is weak.' })
        }
        const user = await User.findByIdAndUpdate(id, { names, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: `User not found ! Can't delete User` });
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/', requireAuth, async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('names email');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const age = 24 * 60 * 60;

const generateToken = (id: number) => {
    const token = jwt.sign({ id }, 'nyanja cyane secret', { expiresIn: age });
    return token;
};

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found !' });
        }
        else {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = generateToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: age });
                //const headers = new res.header;
                res.status(200).json({token});
                //res.setHeader('Authorization', `${token}`);
            }
            else {
                return res.status(400).json({ Error: 'Login Failed. Password is incorrect !' });
            }
        }
        //res.json({ "Login": "Login Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;

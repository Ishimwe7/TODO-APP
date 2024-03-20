
import express, { Request, Response } from 'express';
const User = require('../model/User');
//const bcrypt = require('bcrypt');

const router = express.Router();

// Add Todo item
router.post('/', async (req: Request, res: Response) => {
    try {
        const { names, email, password } = req.body;
        if (!names || !email || !password) return res.status(400).json({ 'message': 'Both names, email and password are required!!' });
        const duplicate = await User.findOne({ email: email }).exec();
        if (duplicate) return res.status(409).json({ "duplicateError": "Email already used!" });
        //const hashedPassword = bcrypt.hash(password, 10);
        const user = new User({
            names,
            email,
            password
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update Todo item
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { names, email, password } = req.body;
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

// Delete Todo item
router.delete('/:id/', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all Todo items
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//export default router;
module.exports = router;

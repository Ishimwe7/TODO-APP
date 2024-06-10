import express, { Request, Response } from 'express';
const Todo = require('../model/Todo');
const { requireAuth } = require('../../middlewares/authMiddleware')
const router = express.Router();
//const cookieParser = require('cookie-parser');
// const app = express();
// app.use(cookieParser());
// Add Todo item
router.post('/', requireAuth, async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description,
            completed: false
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update Todo item
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete Todo item
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all Todo items
router.get('/', requireAuth, async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//export default router;
module.exports = router;

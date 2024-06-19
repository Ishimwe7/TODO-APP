import express, { Request, Response } from 'express';
const Todo = require('../model/Todo');
const { requireAuth } = require('../../middlewares/authMiddleware')
const router = express.Router();
router.post('/saveTodo', requireAuth, async (req: Request, res: Response) => {
    try {
        const { title, description,userId } = req.body;
        const todo = new Todo({
            title,
            description,
            status: 'Pending',
            userId,
            updatedAt: Date.now()
        });
        await todo.save();
        return res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

// Update Todo item
router.put('/updateTodo/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedAt = Date.now();
        const { title, description } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { title, description,updatedAt }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(todo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/changeStatus/:id/:status', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id,status} = req.params;
        const updatedAt = Date.now();
        // const { status } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, { status, updatedAt}, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(todo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});
// Delete Todo item
router.delete('/deleteTodo/:id', requireAuth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json({ message: 'Todo item deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

// Get all Todo items
router.get('/getAllTodos', requireAuth, async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId; 
         if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const todos = await Todo.find({ userId }).sort({ updatedAt: -1 });
        if (todos.length > 0) { 
            return res.status(200).json(todos);
        } else {
            return res.status(404).json({ message: 'No todos found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//export default router;
module.exports = router;

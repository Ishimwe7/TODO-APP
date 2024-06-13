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
const Todo = require('../model/Todo');
const { requireAuth } = require('../../middlewares/authMiddleware');
const router = express_1.default.Router();
router.post('/saveTodo', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, userId } = req.body;
        const todo = new Todo({
            title,
            description,
            status: 'Pending',
            userId,
            updatedAt: Date.now()
        });
        yield todo.save();
        return res.status(201).json(todo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}));
// Update Todo item
router.put('/updateTodo/:id', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedAt = Date.now();
        const { title, description } = req.body;
        const todo = yield Todo.findByIdAndUpdate(id, { title, description, updatedAt }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(todo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}));
router.put('/changeStatus/:id', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.params;
        const updatedAt = Date.now();
        // const { status } = req.body;
        const todo = yield Todo.findByIdAndUpdate(id, { status, updatedAt }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json(todo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}));
// Delete Todo item
router.delete('/deleteTodo/:id', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.json({ message: 'Todo item deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}));
// Get all Todo items
router.get('/getAllTodos', requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find();
        if (todos.length > 0) {
            return res.status(200).json(todos);
        }
        else {
            return res.status(404).json({ message: 'No todos found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
//export default router;
module.exports = router;

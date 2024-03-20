"use strict";
// import express, { Request, Response } from 'express';
// import Todo from '../model/Todo';
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
// const router = express.Router();
// // const express = require("express");
// const mongoose = require("mongoose");
// //const app = express();
// //const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";
// // async function connect() {
// //     try {
// //         await mongoose.connect(url);
// //         console.log("Connected to MongoDB");
// //     } catch (error) {
// //         console.error(error);
// //     }
// // }
// // connect();
// // app.listen(8000, () => {
// //     console.log("Server is running on port 8000");
// // });
// // Add Todo item
// router.post('/', async (req: Request, res: Response) => {
//     try {
//         const { title, description } = req.body;
//         const todo = new Todo({
//             title,
//             description,
//             completed: false
//         });
//         await todo.save();
//         res.status(201).json(todo);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
// // Update Todo item
// router.put('/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { title, description, completed } = req.body;
//         const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
//         if (!todo) {
//             return res.status(404).json({ message: 'Todo not found' });
//         }
//         res.json(todo);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
// // Delete Todo item
// router.delete('/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const todo = await Todo.findByIdAndDelete(id);
//         if (!todo) {
//             return res.status(404).json({ message: 'Todo not found' });
//         }
//         res.json({ message: 'Todo item deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
// // Get all Todo items
// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const todos = await Todo.find();
//         res.json(todos);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const Todo = require('../model/Todo');
const router = express_1.default.Router();
// Add Todo item
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description,
            completed: false
        });
        yield todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
// Update Todo item
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const todo = yield Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
// Delete Todo item
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo item deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
// Get all Todo items
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find();
        res.json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}));
//export default router;
module.exports = router;

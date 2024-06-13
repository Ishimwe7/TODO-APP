"use strict";
//import { Schema, Document, model } from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define interface for Todo document
// interface ITodo extends Document {
//   title: string;
//   description: string;
//   completed: boolean;
// }
// Define schema for Todo model
const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    userId: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now() }
});
// Define and export Todo model
//const Todo = model<ITodo>('Todo', todoSchema);
//export default Todo;
module.exports = mongoose.model("Todo", todoSchema);

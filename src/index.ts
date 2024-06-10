const express = require('express');
//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const controller = require('./back-end/controllers/todoController');
const userController = require('./back-end/controllers/userController');
const cookieParser = require('cookie-parser');
const app = express();
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

app.use(express.json());

app.use('/todos', controller);
app.use('/users', userController)
app.use(cookieParser());
connect();
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
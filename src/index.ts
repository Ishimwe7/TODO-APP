const express = require('express');
const cors = require('cors');
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
app.use(cookieParser());

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://nyanja-todo-app.netlify.app'],  // Allow your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));

app.use('/todos', controller);
app.use('/users', userController)

connect();
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
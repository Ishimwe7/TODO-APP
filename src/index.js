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
const express = require('express');
const mongoose = require('mongoose');
const controller = require('./back-end/controllers/todoController');
const userController = require('./back-end/controllers/userController');
const app = express();
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(url);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error(error);
        }
    });
}
app.use(express.json());
app.use('/todos', controller);
app.use('/users', userController);
connect();
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

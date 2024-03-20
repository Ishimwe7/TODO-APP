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
const mongoose_1 = __importDefault(require("mongoose"));
const Todo = require('../model/Todo');
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";
// Set up MongoDB connection before running tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(url);
    console.log('Connected to MongoDb');
}));
// Clean up after all tests have finished
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
}));
describe('Todo Model', () => {
    let testTodoId; // To store the ID of the test todo for use in other tests
    // Test case for creating a new todo
    it('should create a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const todoData = {
            title: 'Test Todo Title',
            description: 'Test Description',
            completed: false,
        };
        const newTodo = yield Todo.create(todoData);
        testTodoId = newTodo._id; // Store the ID of the created todo for use in other tests
        expect(newTodo.title).toBe('Test Todo Title');
        expect(newTodo.description).toBe('Test Description');
        expect(newTodo.completed).toBe(false);
    }));
    // Test case for retrieving all todos
    it('should retrieve all todos', () => __awaiter(void 0, void 0, void 0, function* () {
        const todos = yield Todo.find();
        expect(todos).toHaveLength(1); // Assuming one todo was created in the previous test
    }));
    // Test case for updating a todo
    it('should update an existing todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTodo = yield Todo.findByIdAndUpdate(testTodoId, { description: 'Updated Description' }, { new: true });
        expect(updatedTodo).not.toBeNull();
        expect(updatedTodo === null || updatedTodo === void 0 ? void 0 : updatedTodo.description).toBe('Updated Description');
    }));
    // Test case for deleting a todo
    it('should delete an existing todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedTodo = yield Todo.findByIdAndDelete(testTodoId);
        expect(deletedTodo).not.toBeNull();
    }));
});

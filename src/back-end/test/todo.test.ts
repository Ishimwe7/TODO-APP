import mongoose from 'mongoose';
// import supertest from "supertest";
const Todo = require('../model/Todo');

const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";


// Set up MongoDB connection before running tests
beforeAll(async () => {
    await mongoose.connect(url);
    console.log('Connected to MongoDb');
    await mongoose.connection.dropCollection("todos");
}, 25000);

// Clean up after all tests have finished
afterAll(async () => {
    await mongoose.connection.dropCollection("todos");
    await mongoose.connection.close();
}, 25000);

describe('Todo Model', () => {
    let testTodoId: string; // To store the ID of the test todo for use in other tests

    // Test case for creating a new todo
    it('should create a new todo', async () => {
        const todoData = {
            title: 'Test Todo Title',
            description: 'Test Description',
            completed: false,
        };

        const newTodo = await Todo.create(todoData);
        testTodoId = newTodo._id; // Store the ID of the created todo for use in other tests


        expect(newTodo.title).toBe('Test Todo Title');
        expect(newTodo.description).toBe('Test Description');
        expect(newTodo.completed).toBe(false);
    });

    // Test case for retrieving all todos
    it('should retrieve all todos', async () => {
        const todos = await Todo.find();
        expect(todos).toHaveLength(1); // Assuming one todo was created in the previous test
    });

    // Test case for updating a todo
    it('should update an existing todo', async () => {
        const updatedTodo = await Todo.findByIdAndUpdate(
            testTodoId,
            { description: 'Updated Description' },
            { new: true }
        );

        expect(updatedTodo).not.toBeNull();
        expect(updatedTodo?.description).toBe('Updated Description');
    });

    // Test case for deleting a todo
    it('should delete an existing todo', async () => {
        const deletedTodo = await Todo.findByIdAndDelete(testTodoId);
        expect(deletedTodo).not.toBeNull();
    });
});
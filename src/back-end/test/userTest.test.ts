import mongoose from 'mongoose';

const User = require('../model/User');

const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";


// Set up MongoDB connection before running tests
beforeAll(async () => {
    await mongoose.connect(url);
    console.log('Connected to MongoDb');
});

// Clean up after all tests have finished
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('User Model', () => {
    let testUserId: string; // To store the ID of the test todo for use in other tests

    // Test case for creating a new todo
    it('should create a new user', async () => {
        const userData = {
            names: 'Test User name',
            email: 'test@gmail.com',
            password: 'testpassword',
        };

        const newUser = await User.create(userData);
        testUserId = newUser._id; // Store the ID of the created todo for use in other tests

        expect(newUser.names).toBe('Test User name');
        expect(newUser.email).toBe('test@gmail.com');
        expect(newUser.password).toBe('testpassword');
    });

    // Test case for retrieving all todos
    it('should retrieve all users', async () => {
        const users = await User.find();
        expect(users).toHaveLength(1); // Assuming one todo was created in the previous test
    });

    // Test case for updating a todo
    it('should update an existing user', async () => {
        const updatedUser = await User.findByIdAndUpdate(
            testUserId,
            { names: 'Updated names' },
            { email: 'updatedemail@gmail.com' },
            { password: 'updatedPassword' },
            { new: true }
        );

        expect(updatedUser).not.toBeNull();
        expect(updatedUser?.names).toBe('Updated names');
        expect(updatedUser?.email).toBe('updatedemail@gmail.com');
        expect(updatedUser?.password).toBe('updatedPassword');
    });

    // Test case for deleting a todo
    it('should delete an existing user', async () => {
        const deletedTodo = await User.findByIdAndDelete(testUserId);
        expect(deletedTodo).not.toBeNull();
    });
});
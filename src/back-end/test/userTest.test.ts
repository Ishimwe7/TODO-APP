import mongoose from 'mongoose';

const User = require('../model/User');

const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";


// Set up MongoDB connection before running tests
beforeAll(async () => {
    await mongoose.connect(url);
    console.log('Connected to MongoDb');
    await mongoose.connection.dropCollection("users");
}, 25000);

// Clean up after all tests have finished
afterAll(async () => {

    await mongoose.connection.dropCollection("users");
    await mongoose.connection.close();
}, 25000);

describe('User Model', () => {
    let testUserId: string; // To store the ID of the test todo for use in other tests


    const isValidEmail = (email: string): boolean => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isStrongPassword = (password: string): boolean => {
        // Regular expression to validate password strength
        // This example requires at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    it('should validate email and password', () => {
        // Valid email and strong password
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isStrongPassword('StrongPassword123!')).toBe(true);

        // Invalid email and weak password
        expect(isValidEmail('testexample.com')).toBe(false);
        expect(isStrongPassword('weak')).toBe(false);
    });

    it('should create a new user', async () => {
        const userData = {
            names: 'Test User name',
            email: 'test@gmail.com',
            password: 'testpassword',
        };

        const newCreatedUser = await User.create(userData);
        testUserId = newCreatedUser._id; // Store the ID of the created todo for use in other tests

        expect(newCreatedUser.names).toBe('Test User name');
        expect(newCreatedUser.email).toBe('test@gmail.com');
        expect(newCreatedUser.password).toBe('testpassword');
    });

    // Test case for retrieving all todos
    it('should retrieve all users', async () => {
        const users = await User.find();
        expect(users).toHaveLength(1); // Assuming one todo was created in the previous test
    });


    it('should update an existing user', async () => {
        const updatedUser = await User.findByIdAndUpdate(
            testUserId,
            {
                names: 'Updated names',
                email: 'updatedemail@gmail.com',
                password: 'updatedPassword'
            },
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
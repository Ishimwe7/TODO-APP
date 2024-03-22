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
const User = require('../model/User');
const url = "mongodb+srv://nyanja-cyane:nyanja@cluster0.qmnp1kf.mongodb.net/<todo_db>?retryWrites=true&w=majority";
// Set up MongoDB connection before running tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(url);
    console.log('Connected to MongoDb');
    yield mongoose_1.default.connection.dropCollection("users");
}), 25000);
// Clean up after all tests have finished
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropCollection("users");
    yield mongoose_1.default.connection.close();
}), 25000);
describe('User Model', () => {
    let testUserId; // To store the ID of the test todo for use in other tests
    const isValidEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const isStrongPassword = (password) => {
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
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            names: 'Test User name',
            email: 'test@gmail.com',
            password: 'testpassword',
        };
        const newCreatedUser = yield User.create(userData);
        testUserId = newCreatedUser._id; // Store the ID of the created todo for use in other tests
        expect(newCreatedUser.names).toBe('Test User name');
        expect(newCreatedUser.email).toBe('test@gmail.com');
        expect(newCreatedUser.password).toBe('testpassword');
    }));
    // Test case for retrieving all todos
    it('should retrieve all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield User.find();
        expect(users).toHaveLength(1); // Assuming one todo was created in the previous test
    }));
    it('should update an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield User.findByIdAndUpdate(testUserId, {
            names: 'Updated names',
            email: 'updatedemail@gmail.com',
            password: 'updatedPassword'
        }, { new: true });
        expect(updatedUser).not.toBeNull();
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.names).toBe('Updated names');
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email).toBe('updatedemail@gmail.com');
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('updatedPassword');
    }));
    // Test case for deleting a todo
    it('should delete an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedTodo = yield User.findByIdAndDelete(testUserId);
        expect(deletedTodo).not.toBeNull();
    }));
});

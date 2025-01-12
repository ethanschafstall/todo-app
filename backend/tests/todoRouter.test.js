const request = require('supertest');
const express = require('express');
const app = express();
const todoRouter = require('../routes/todo.api.js');
const todoModel = require('../database/models/todo.model');
const userRouter = require('../routes/user.api.js');
const userModel = require('../database/models/user.model');
const { key } = require('../env/keys');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/todo', todoRouter);
app.use('/users', userRouter);

// User const
const userData = {
    name: "Jane Doe",
    email: "valid@email.com",
    password: "validPassword123",
};

// Helpers
const createUser = async () => {
    await request(app)
        .post('/users/add')
        .send(userData);
    return await userModel.findOne({ email: userData.email });
};

const createToken = async (user) => {
    return jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
    });
};

const createTodo = async (user) => {
    return await todoModel.create({ text: "Todo", user_id: user._id, completed: false });
};

describe("Create Todo Tests", () => {
    test('Create Todo with valid user', async () => {
        // Create test user
        const user = await createUser();

        // Generate token
        const token = await createToken(user);

        // Create new Todo with the token in the Cookie
        const response = await request(app)
            .post('/todo/add').send({ text: "Test TODO" })
            .set('Cookie', `token=${token}`);

        // Check if the Todo was created
        expect(response.status).toBe(200);
    });

    test('Create Todo without token', async () => {
        // Create test user
        await createUser();

        // Create a Todo without the authentication token
        const response = await request(app)
            .post('/todo/add').send({ text: "Test TODO" });

        // Check if the Todo was created
        expect(response.status).toBe(400);
    });
});

describe("Update Todo Tests", () => {
    test('Update Todo with valid ID', async () => {
        // Create test user
        const user = await createUser();

        // Generate token
        const token = await createToken(user);

        // Create a Todo which will be updated
        const todo = await createTodo(user);

        // Create Todo update
        const updatedTodoData = { text: "Updated Todo", completed: true };

        // Updates the old todo with the new one
        const response = await request(app)
            .patch(`/todo/${todo._id}`).send(updatedTodoData)
            .set('Cookie', `token=${token}`);

        // Check if it was updated
        expect(response.status).toBe(200);
    });
});

describe("Delete Todo Tests", () => {
    test('Delete Todo with valid user', async () => {
        // Create test user
        const user = await createUser();

        // Generate token
        const token = await createToken(user);

        // Create a Todo for the user to delete
        const todo = await createTodo(user);

        // Send a request to delete the Todo with the token in the Cookie header
        const response = await request(app)
            .post(`/todo/${todo._id}`)
            .set('Cookie', `token=${token}`);

        // Check if the Todo was deleted
        expect(response.status).toBe(200);
    });
});

describe("Get Todo Tests", () => {
    test('Get Todos for a valid user', async () => {
        // Create test user
        const user = await createUser();

        // Generate token
        const token = await createToken(user);

        // Create two Todos for the user
        await createTodo(user);
        await todoModel.create({ text: "Second Todo", user_id: user._id, completed: true });

        // Send a request to get the Todos with the Cookie
        const response = await request(app)
            .get('/todo').set('Cookie', `token=${token}`);

        // Check if Get was successful and it returned the expected Todo
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test('Get Todos without token should fail', async () => {
        // Create test user
        await createUser();

        // Create two Todos for the user
        const user = await userModel.findOne({ email: userData.email });
        await createTodo(user);
        await todoModel.create({ text: "Second Todo", user_id: user._id, completed: true });

        // Send a request without authentication token
        const response = await request(app)
            .get('/todo');

        // Check if Get was unsuccessful
        expect(response.status).toBe(400);
    });
});

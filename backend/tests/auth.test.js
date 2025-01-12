const request = require('supertest');
const express = require('express');
const app = express();
const todoRouter = require('../routes/todo.api.js');
const authRouter = require('../routes/auth.api.js');
const userRouter = require('../routes/user.api.js');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/todo', todoRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

// Global Constants
const userData = {
  name: "Jane Doe",
  email: "valid@email.com",
  password: "validPassword123",
};
const loginCredentials ={
    email: userData.email,
    password: userData.password
}
// Helper functions
const createUser = async (userData) => {
  await request(app)
    .post('/users/add')
    .send(userData);
};

const loginUser = async (credentials) => {
  const response = await request(app)
    .post('/auth/')
    .send(credentials);
  return response;
};

describe("Post Auth", () => {
  describe("Login Tests", () => {
    test('Login with valid credentials', async () => {
      // Create a new test user
      await createUser(userData);

      // Login with credentials
      const loginResponse = await loginUser(loginCredentials);

      // Check if login was successful and cookie is set
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.headers['set-cookie']).toBeDefined();
    });

    describe("Login with invalid credentials", () => {
      test.each([
        ["invalid email", { email: "invalid@email.com", password: userData.password }, 400],
        ["invalid password", { email: userData.email, password: "invalidPassword123" }, 400],
        ["non-existent user", { email: "invalid3@email.com", password: userData.password }, 400],
      ])(
        // Testing different invalid login cases
        "[Case: %s] using %s should return %d",
        async (caseDescription, invalidCredentials, expectedStatus) => {
          // Create a new user
          await createUser(userData);

          // Login with invalid credentials based on the case
          const response = await loginUser(invalidCredentials);

          expect(response.status).toBe(expectedStatus);
        }
      );
    });
  });
});

describe("Delete Auth", () => {
  test('Logout with valid user', async () => {
    // Create test user
    await createUser(userData);

      // Login with credentials
      const loginResponse = await loginUser(loginCredentials);

    // Check if login was successful and if a cookie is returned
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers['set-cookie']).toBeDefined();

    // Extract cookie from login response
    const token = loginResponse.headers['set-cookie'][0];

    // Set cookie and logout from session
    const logoutResponse = await request(app)
      .delete('/auth/')
      .set('set-cookie', token);

    // Check if the logout response is successful and if cookie still exists
    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.headers['set-cookie']).toBeDefined();
  });
});

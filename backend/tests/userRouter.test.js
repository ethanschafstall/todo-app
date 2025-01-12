const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRouter = require('../routes/user.api.js');
const userModel = require('../database/models/user.model');
const { key } = require('../env/keys');
const jsonwebtoken = require('jsonwebtoken');

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Route
app.use('/users', userRouter);

// Helpers
const createUser = async (userData) => {
  return await request(app).post('/users/add').send(userData);
};

const generateToken = (user) => {
  return jsonwebtoken.sign({}, key, {
    subject: user._id.toString(),
    expiresIn: 60 * 60 * 24 * 30 * 6,
    algorithm: 'RS256',
  });
};

// New constant userData
const userData = {
  name: "John Doe",
  email: "valid@email.com",
  password: "password123"
};

describe("Create User", () => {
  // Test for valid and invalid email formats
  describe("Email validation", () => {
    test.each([
      ["valid email", ["valid@email.com"], 200],
      ["invalid email", ["invalid@emailformat1", "invalidemailformat2.com", "invalidemail"], 400],
      ["duplicate email", ["duplicant@email.com", "duplicant@email.com"], 400],
    ])("[Case: %s] using %s should return %d", async (bodyCase, email, expectedStatus) => {
      if (bodyCase === "invalid email") {
        // Loop through each invalid email and test the response
        await Promise.all(email.map(async (emailItem) => {
          const newUser = { name: userData.name, email: emailItem, password: userData.password};
          const response = await createUser(newUser);
          expect(response.status).toBe(expectedStatus);
        }));
      } else if (bodyCase === "duplicate email") {
        const newUser1 = { name: userData.name, email: email[0], password: userData.password};
        const response1 = await createUser(newUser1);
        expect(response1.status).toBe(200);

        const newUser2 = { name: userData.name, email: email[1], password: userData.password};
        const response2 = await createUser(newUser2);
        expect(response2.status).toBe(expectedStatus);
      } else {
        const newUser = { name: userData.name, email: email[0], password: userData.password};
        const response = await createUser(newUser);
        expect(response.status).toBe(expectedStatus);
      }
    });
  });

  // Password validation
  describe("password validation", () => {
    test.each([
      ["correct length", "securePassword123", 200],
      ["under minimum length", "123", 400],
      ["over maximum length", "thisisaverylongpasswordthatshouldexceedthepasswordmaxlength", 400]
    ])("[Case: %s] using %s should return %d", async (bodyCase, password, expectedStatus) => {
      const newUser = { name: userData.name, email: userData.email, password: password };
      const response = await createUser(newUser);
      expect(response.status).toBe(expectedStatus);
    });
  });
});

describe("Delete User", () => {
  test('test delete user', async () => {

    // Create user
    const postUserResponse = await createUser(userData);
    expect(postUserResponse.status).toBe(200);

   // Get user for creating token
   const user = await userModel.findOne({ email: userData.email }).exec();
   expect(user).not.toBeNull();

   // Generate JWT token
   const token = generateToken(user);

    // Request to delete user
    const deleteUserResponse = await request(app)
      .delete('/users/delete')
      .set('cookie', `token=${token}`);
    expect(deleteUserResponse.status).toBe(200);

    // Check if user is deleted
    const deletedUser = await userModel.findOne({ email: userData.email }).exec();
    expect(deletedUser).toBeNull();
  });
});

describe("Modify User", () => {
  test('test edit user password if hashed', async () => {
    const newPassword = "newPassword123";

    // Create user
    const postUserResponse = await createUser(userData);
    expect(postUserResponse.status).toBe(200);

   // Get user for creating token
    const user = await userModel.findOne({ email: userData.email }).exec();
    expect(user).not.toBeNull();

    // Generate JWT token
    const token = generateToken(user);

    // Request to update password
    const getUserResponse = await request(app)
      .patch('/users/edit').send({ password: newPassword })
      .set('cookie', `token=${token}`);

    // Verify password is hashed
    const userAfterEdit = await userModel.findOne({ email: userData.email }).exec();
    expect(getUserResponse.status).toBe(200);
    expect(userAfterEdit.password).not.toBe(newPassword);
  });

  test('test edit user name', async () => {
    const newName = "Jane Doe";

    // Create user
    const postUserResponse = await createUser(userData);
    expect(postUserResponse.status).toBe(200);

   // Get user for creating token
    const user = await userModel.findOne({ email: userData.email }).exec();
    expect(user).not.toBeNull();

    // Generate JWT token
    const token = generateToken(user);

    // Attempt to update name
    const getUserResponse = await request(app)
      .patch('/users/edit').send({ name: newName })
      .set('cookie', `token=${token}`);

    // Check if name is updated
    const userAfterEdit = await userModel.findOne({ email: userData.email }).exec();
    expect(getUserResponse.status).toBe(200);
    expect(userAfterEdit.name).toBe(newName);
  });
});

describe("Get User", () => {
  test('test get user', async () => {

    // Add user
    const postUserResponse = await createUser(userData);
    expect(postUserResponse.status).toBe(200);

    // Get user for creating token
    const user = await userModel.findOne({ email: userData.email }).exec();
    expect(user).not.toBeNull();

    // Generate JWT token
    const token = generateToken(user);

    // Send request to get user with token
    const getUserResponse = await request(app)
      .get('/users')
      .set('cookie', `token=${token}`);

    // Check if the get user response was successful
    expect(getUserResponse.status).toBe(200);
  });
});

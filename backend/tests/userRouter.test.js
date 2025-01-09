const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRouter = require('../routes/user.api.js'); 
const userModel = require('../database/models/user.model');
const { key } = require('../env/keys');
const jsonwebtoken = require('jsonwebtoken');
app.use(express.json()); 
app.use(cookieParser());
app.use('/users', userRouter);


describe("Create User", () => {

  // Test for valid and invalid email formats
  describe("Email validation", () => {
    test.each([
      ["valid email", ["valid@email.com"], 200],
      ["invalid email", ["invalid@emailformat1", "invalidemailformat2.com", "invalidemail"], 400],
      ["duplicate email", ["duplicant@email.com", "duplicant@email.com"], 400]
    ])("[Case: %s] using %s should return %d", async (bodyCase, email, expectedStatus) => {
      
        if (bodyCase === "invalid email") {
            // Loop through each email in the array and run the request
            await Promise.all(email.map(async (emailItem) => {
              const newUser = { name: "John Doe", email: emailItem, password: "validPassword123" };
              const response = await request(app).post('/users/add').send(newUser);
              expect(response.status).toBe(expectedStatus);
            }));
          }
      else if(bodyCase === "duplicate email") {

        const newUser1 = { name: "John Doe", email: email[0], password: "validPassword123" };
        const response1 = await request(app).post('/users/add').send(newUser1);
        expect(response1.status).toBe(200);
        
        const newUser2 = { name: "John Doe", email: email[1], password: "validPassword123" };
        const response2 = await request(app).post('/users/add').send(newUser2);
        expect(response2.status).toBe(expectedStatus);
      }
      else {
        // For valid email case, run the request once
        const newUser = { name: "John Doe", email: email[0], password: "validPassword123" };
        const response = await request(app).post('/users/add').send(newUser);
        expect(response.status).toBe(expectedStatus);
      }

    });
  }),
  describe("password validation", () => {
    test.each([
      ["correct length","securePassword123", 200],
      ["under minimum length", "123", 400],
      ["over maximum length", "thisisaverylongpasswordthatshouldexceedthepasswordmaxlength", 400]
    ])("[Case: %s] using %s should return %d", async (bodyCase, password, expectedStatus) => {
      const newUser = { name: "John Doe", email: "email@test.com", password};
      const response = await request(app).post('/users/add').send(newUser);
      expect(response.status).toBe(expectedStatus);

    });
  })
});
describe("Delete User", () => {
  test('test delete user', async () => {
    const email = "valid@email.com";
    const newUser = { name: "John Doe", email: email, password: "password123" };
  
    const postUserResponse = await request(app).post('/users/add').send(newUser);
    expect(postUserResponse.status).toBe(200);
  
    const user = await userModel.findOne({ email: email }).exec();
    expect(user).not.toBeNull();

    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 60 * 60 * 24 * 30 * 6,
      algorithm: 'RS256',
    });
  
    const deleteUserResponse = await request(app)
      .delete('/users/delete')
      .set('cookie', `token=${token}`);
    expect(deleteUserResponse.status).toBe(200);

    const deletedUser = await userModel.findOne({ email: email }).exec();
    expect(deletedUser).toBeNull();
  });
});

describe("Modify User", () => {
    test('test edit user password if hashed', async () => {
        const email = "valid@email.com";
        const newPassword = "newPassword123";
        const newUser = { name: "John Doe", email: email, password: "password123" };
    
        const postUserResponse = await request(app).post('/users/add').send(newUser);
        expect(postUserResponse.status).toBe(200);
    
        const user = await userModel.findOne({ email: email }).exec();
        expect(user).not.toBeNull();

        const token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
        });

        const getUserResponse = await request(app)
            .patch('/users/edit').send({password: newPassword})
            .set('cookie', `token=${token}`);
        const userAfterEdit = await userModel.findOne({ email: email }).exec();

        // Checks if the password edit was successful
        expect(getUserResponse.status).toBe(200);
        // Checks if the new password saved in the DB was hashed
        expect(userAfterEdit.password).not.toBe(newPassword)
    }),
    test('test edit user name', async () => {
        const email = "valid@email.com";
        const newName = "Jane Doe";
        const newUser = { name: "John Doe", email: email, password: "password123" };
    
        const postUserResponse = await request(app).post('/users/add').send(newUser);
        expect(postUserResponse.status).toBe(200);
    
        const user = await userModel.findOne({ email: email }).exec();
        expect(user).not.toBeNull();

        const token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
        });

        const getUserResponse = await request(app)
            .patch('/users/edit').send({name: newName})
            .set('cookie', `token=${token}`);

        const userAfterEdit = await userModel.findOne({ email: email }).exec();

        // Checks if the name edit was successful
        expect(getUserResponse.status).toBe(200);
        // Checks if new name is expected
        expect(userAfterEdit.name).toBe(newName)
    })
});

describe("Get User", () => {
      test('test get user', async () => {
        const email = "valid@email.com";
        const newUser = { name: "John Doe", email: email, password: "password123" };
    
        const postUserResponse = await request(app).post('/users/add').send(newUser);
        expect(postUserResponse.status).toBe(200);
    
        const user = await userModel.findOne({ email: email }).exec();
        expect(user).not.toBeNull();

        const token = jsonwebtoken.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: 'RS256',
        });

        const getUserResponse = await request(app)
            .get('/users')
            .set('cookie', `token=${token}`);

    expect(getUserResponse.status).toBe(200);
    })
});


const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const User = require('../src/models/User');

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await User.deleteMany({}); // Clear the database before tests
    });

    afterAll(async () => {
        await User.deleteMany({}); // Clean up after tests
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@example.com'
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@example.com'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return 404 for non-existent user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'nonexistentuser',
                password: 'testpassword'
            });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });
});
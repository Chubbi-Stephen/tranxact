const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const { Transaction } = require('../src/models/Transaction');

describe('Transaction API', () => {
    beforeEach(async () => {
        await Transaction.deleteMany({}); // Clear the transaction collection before each test
    });

    it('should create a new transaction', async () => {
        const transactionData = {
            amount: 100,
            type: 'credit',
            userId: 'someUserId', // Replace with a valid user ID
        };

        const response = await request(app)
            .post('/api/transactions') // Adjust the route as necessary
            .send(transactionData)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.amount).toBe(transactionData.amount);
        expect(response.body.type).toBe(transactionData.type);
    });

    it('should retrieve all transactions', async () => {
        await Transaction.create({
            amount: 100,
            type: 'credit',
            userId: 'someUserId', // Replace with a valid user ID
        });

        const response = await request(app)
            .get('/api/transactions') // Adjust the route as necessary
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existing transaction', async () => {
        const response = await request(app)
            .get('/api/transactions/nonExistingId') // Adjust the route as necessary
            .expect(404);

        expect(response.body.message).toBe('Transaction not found');
    });
});
import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary

describe('AI Controller', () => {
    it('should return AI recommendations', async () => {
        const response = await request(app)
            .get('/api/ai/recommendations') // Adjust the route as necessary
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a test token

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('recommendations');
    });

    it('should handle errors gracefully', async () => {
        const response = await request(app)
            .get('/api/ai/recommendations') // Adjust the route as necessary
            .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a test token

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('error', 'No recommendations available'); // Adjust based on actual error handling
    });
});
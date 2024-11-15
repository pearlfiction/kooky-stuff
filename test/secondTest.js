const request = require('supertest');
const assert = require("node:assert/strict");

describe('Should return 200 and 429 finally', () => {
    const baseUrl = 'https://api.apilayer.com/fixer'; 
    const validKey = '6NFsOj4yO3vLgvUGjt3YVcfj6hKgUvz8';
    const repeatCount = 100;

    for (let i = 0; i < repeatCount; i++) {
        it('Should return 200', async () => {
            const res = await request(baseUrl)
                .get('/latest')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('apikey', validKey);
            assert.strictEqual(res.status, 200);
        });
    }

    it('Verify the GET /latest endpoint, exceeding the request rate limit, returns a 429 status code',  async () => {
        const res = await request(baseUrl)
            .get('/latest')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('apikey', validKey);
        assert.strictEqual(res.status, 429);
		});
	});

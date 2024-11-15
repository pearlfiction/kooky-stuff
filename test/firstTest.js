const request = require('supertest');

describe('API tests', () => {
	const baseUrl = 'https://api.apilayer.com/fixer';
    const validKey = 'o2iStFNK9CAlsVOmtijhe8yBw99ikdVL';
    const invalidKey = '1';
    const invalidUrl = 'https://api.apilayer.com/meowfixer';

	it('Verify the GET /latest endpoint returns a 200 status code', (done) => {
		request(baseUrl)
			.get('/latest')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('apikey', validKey)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                return done();
			});
	});

    it('Verify the GET /latest endpoint with invalid symbol returns a 400 status code', (done) => {
		request(baseUrl)
			.get('/latest%')
            .query({ symbols: '%' })
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('apikey', validKey)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                return done();
			});
	});

    it('Verify the GET /latest endpoint with incorrect API key returns a 401 status code', (done) => {
		request(baseUrl)
			.get('/latest')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('apikey', invalidKey)
            .expect(401)
            .end((err) => {
                if (err) return done(err);
                return done();
			});
	});

    it('Verify the POST /latest endpoint returns a 403 status code', (done) => {
		request(baseUrl)
			.post('/latest')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('apikey', validKey)
            .expect(403)
            .end((err) => {
                if (err) return done(err);
                return done();
			});
	});

    it('Verify the GET /latest endpoint with wrong url returns a 404 status code', (done) => {
		request(invalidUrl)
			.get('/latest')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
            .set('apikey', validKey)
            .expect(404)
            .end((err) => {
                if (err) return done(err);
                return done();
			});
	});
});

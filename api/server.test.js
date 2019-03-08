const request = require('supertest');
const server = require('./server');
const db = require('../api/dbConfig');

afterAll(async () => {
	await db('games').truncate();
});
describe('server.js', () => {
	test('should set testing enviornment', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});

	describe('GET', () => {
		// ASYNC
		test('should return status 200', async () => {
			const res = await request(server).get('/');
			expect(res.status).toBe(200);
		});

		test('should return JSON', async () => {
			const res = await request(server).get('/');
			expect(res.type).toBe('application/json');
		});
		test('should return { "Sanity Check" }', async () => {
			const res = await request(server).get('/');
			expect(res.body).toEqual(['Sanity Check']);
		});
	});

	describe('GET /api/games', () => {
		test('should return 200', async () => {
			const res = await request(server).get('/api/games');
			expect(res.status).toBe(200);
		});
		test('should return JSON', async () => {
			const res = await request(server).get('/api/games');
			expect(res.type).toEqual('application/json');
		});
	});
	describe('POST', () => {
		afterEach(async () => {
			await db('games').truncate();
		});

		test('should return 201', async () => {
			const game = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const res = await request(server)
				.post('/api/games')
				.send(game);
			expect(res.status).toBe(201);
		});
		test('should return JSON', async () => {
			const game = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const res = await request(server)
				.post('/api/games')
				.send(game);
			expect(res.type).toBe('application/json');
		});
		test.skip('should return "fido"', async () => {
			const damn = { name: 'fido' };
			const result = await request(server)
				.post('/api/games')
				.send(damn);

			expect(result.name).toBe('fido');
		});
	});
	describe('DELETE', () => {
		test('response should be 204', async () => {
			const game = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const res = await request(server)
				.post('/api/games')
				.send(game);

			const response = await request(server)
				.del('/api/games')
				.send(res.id);
			expect(response.status).toBe(204);
		});
		test('should return JSON', async () => {
			const name = { name: 'fido' };
			const res = await request(server)
				.post('/api/games')
				.send(name);

			const response = await request(server)
				.del('/api/games')
				.send(res.id);
			expect(res.type).toBe('application/json');
		});
	});
});

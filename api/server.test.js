const request = require('supertest');
const server = require('./server');
const db = require('../api/dbConfig');

afterEach(async () => {
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
		test('should return status 200', async () => {
			const res = await request(server).get('/api/games');
			expect(res.status).toBe(200);
		});
		test('should return JSON', async () => {
			const res = await request(server).get('/api/games');
			expect(res.type).toEqual('application/json');
		});
		test('should return an empty array', async () => {
			const res = await request(server).get('/api/games');
			expect(res.body).toEqual([]);
		});
	});
	describe('POST', () => {
		afterEach(async () => {
			await db('games').truncate();
		});

		test('should return status 201', async () => {
			const game = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const res = await request(server)
				.post('/api/games')
				.send(game);
			expect(res.status).toBe(201);
		});
		test('should return status 422 when required data not present', async () => {
			const ugh = { name: 'street figher' };
			const res = await request(server)
				.post('/api/games')
				.send(ugh);

			expect(res.status).toBe(422); // no clue why this one is broken
		});
		test.skip('should return status 405 for duplicate game name', async () => {
			const game = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const game1 = await request(server)
				.post('/api/games')
				.send(game);
			expect(res.status).toBe(201);

			const game2 = await request(server)
				.post('/api/games')
				.send(game);

			expect(res.status).toBe(405);
		});

		test('should return JSON', async () => {
			const game = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const res = await request(server)
				.post('/api/games')
				.send(game);
			console.log(res.type);
			expect(res.type).toBe('application/json');
		});
		test('should return "Destiny"', async () => {
			const newGame = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
			const game = await request(server)
				.post('/api/games')
				.send(newGame);
			expect(game.body.name).toMatch(/destiny/i);
		});
	});
});

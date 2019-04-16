const db = require('../api/dbConfig');
const Games = require('./gamesModel');

describe('gamesModel Tests', () => {
	afterEach(async () => {
		await db('games').truncate();
	});
	test('insert a game and return the Games name', async () => {
		const newGame = { name: 'Destiny', genre: 'no idea', releaseYear: 2010 };
		const res = await Games.insert(newGame);
		expect(res.name).toBe('Destiny');
	});
	test('inserting two gmes', async () => {
		Games.insert({ name: 'Destiny', genre: 'no idea' });
		Games.insert({ name: 'Destiny', genre: 'no idea' });
		const games = await db('games');
		expect(games).toHaveLength(2);
	});
	test('remove a game', async () => {
		const id = await Games.insert({ name: 'Destiny', genre: 'no idea', releaseYear: 2010 });
		const res = await Games.remove(id);
		expect(res).toBe(0);
	});
});

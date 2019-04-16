const db = require('../api/dbConfig');

module.exports = {
	insert,
	update,
	remove,
	getAll,
	findById,
	findByName,
};

async function insert(game) {
	const [id] = await db('games').insert(game);
	return db('games')
		.where({ id })
		.first();
}

async function update(id, changes) {
	return null;
}

function remove(id) {
	return db('games')
		.where({ id })
		.del();
}

function getAll() {
	return db('games');
}

function findById(id) {
	return db('games')
		.where({ id })
		.first();
}

function findByName(name) {
	return db('games')
		.where({ name })
		.first();
}

require('dotenv').config();
const express = require('express');
const db = require('./dbConfig.js');
const Games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send(['Sanity Check']);
});

server.get('/api/games', async (req, res) => {
	const games = await db('games');
	res.status(200).json({ games });
});

server.post('/api/games', async (req, res) => {
	try {
		const { name, genre } = req.body;
		console.log(name, genre);

		if (name & genre) {
			console.log('if');
			res.status(422).end();
		} else {
			console.log('else');
			const games = await Games.insert(req.body);
			res.status(201).json(games);
		}
	} catch {}
});

server.delete('/api/games', async (req, res) => {
	const { id } = req.body;
	const games = await Games.remove(id);
	res.status(204);
});

module.exports = server;

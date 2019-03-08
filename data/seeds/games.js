const faker = require('faker');

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('games')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('games').insert([
				{ name: 'halo', genre: 'shooter', releaseYear: 2001 },
				{ name: 'halo 2', genre: 'shooter', releaseYear: 2003 },
				{ name: 'halo 3', genre: 'shooter', releaseYear: 2005 },
				{ name: 'halo reach', genre: 'shooter', releaseYear: 2008 },
				{ name: 'halo 5', genre: 'shooter', releaseYear: 2012 },
			]);
		});
};

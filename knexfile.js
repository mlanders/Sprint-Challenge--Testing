const prodDbConnection = process.env.DATABASE_URL;

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/devDB.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},
	testing: {
		client: 'sqlite3',
		connection: {
			filename: './data/testDB.db3',
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations',
		},
		seeds: {
			directory: './data/seeds',
		},
	},
	// production: {
	// 	client: 'pg',
	// 	connection: prodDbConnection, // could be an object or string
	// 	migrations: {
	// 		directory: './data/migrations',
	// 	},
	// 	seeds: {
	// 		directory: './data/seeds',
	// 	},
	// },
};

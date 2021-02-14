const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

//mysql://b6fb24cb4c8c37:702be0f5@us-cdbr-east-03.cleardb.com/heroku_a79dfbc72e06757?reconnect=true

const dbConfigHeroku = {
	host: "us-cdbr-east-03.cleardb.com",
	user: "b49b8573e6c1ae",
	password: "f0c42ed4",
	database: "heroku_13465a0f5a42ccc",
	multipleStatements: false,
	reconnect: true
};

const dbConfigLocal={
	host: "127.0.0.1",
	user: "root",
	password: "2155",
	multipleStatements: false,
	reconnect: true
}


if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		
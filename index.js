//Define the include function for absolute file name
global.base_dir = __dirname;
global.abs_path = function(path) {
	return base_dir + path;
}
global.include = function(file) {
	return require(abs_path('/' + file));
}



const express = require('express');
//----i also eidte the database to database 1 on line 40 and 42 as there were saying database has declared here
const database = include('databaseConnection');
const router = include('routes/router');
const mysql = require('mysql');

const port = process.env.PORT || 3000;
//mysql://b49b8573e6c1ae:f0c42ed4@us-cdbr-east-03.cleardb.com/heroku_13465a0f5a42ccc?reconnect=true

//------------------------ my code goes here------------------
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

if (process.env.IS_HEROKU){
	var database1 = mysql.createPool(dbConfigHeroku);
}else{
	var database1 = mysql.createPool(dbConfigLocal);	
}

database1.getConnection((err, dbConnection) => {
	if (!err) {
		console.log("Successfully connected to MySQL");
	}
	else {
		console.log("Error Connecting to MySQL");
		console.log(err);
	}
});




const app = express();
app.set('view engine', 'ejs');

app.use('/',router);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

app.listen(port, () => {
	console.log("Node application listening on port "+port);
}); 




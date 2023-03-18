// get the client
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// create the connection to database
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
});

// simple query
connection.query('SELECT * FROM videogame', function (err, results, fields) {
	console.log(results); // results contains rows returned by server
	console.log(fields); // fields contains extra meta data about results, if available
});

// with placeholder
connection.query('SELECT * FROM videogame', function (err, results) {
	console.log(results);
});

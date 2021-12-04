require("dotenv").config();
const mysql = require("mysql");

//create connection to mysql
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	// insecureAuth: true,
	database: process.env.DB_NAME,
});

const query = queryText => {
	return new Promise((resolve, reject) => {
		db.query(queryText, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
};

exports.query = query;

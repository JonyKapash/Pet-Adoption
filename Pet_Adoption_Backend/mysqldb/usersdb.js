const { query } = require("./db");
const SQL = require("@nearform/sql");
const bcrypt = require("bcrypt");

// inserting new user to database
const registerUser = async user => {
	try {
		const { email, firstName, lastName, password, phone } = user;
		const hashPassword = await bcrypt.hash(password, 8);

		const queryResult = await query(
			SQL`INSERT INTO users (email, firstName, lastName, password, phone) VALUES (${email},${firstName},${lastName},${hashPassword},${phone});`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.registerUser = registerUser;

const getUserByEmail = async email => {
	try {
		const queryResult = await query(
			SQL`SELECT * FROM users WHERE email = ${email}`
		);
		return queryResult[0];
	} catch (error) {
		console.log(error);
	}
};
exports.getUserByEmail = getUserByEmail;

const loginUser = async user => {
	try {
		const { email, password } = user;
		const passwordHashed = await bcrypt.hash(password, 8);
	} catch (error) {
		console.log(error);
	}
};
exports.loginUser = loginUser;

const getAllUsers = async () => {
	try {
		const queryResult = await query(SQL`SELECT * FROM users;`);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getAllUsers = getAllUsers;

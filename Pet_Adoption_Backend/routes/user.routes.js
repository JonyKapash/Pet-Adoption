const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
	registerUser,
	loginUser,
	getUserByEmail,
	getAllUsers,
} = require("../mysqldb/usersdb");

const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authentication");
const { sign } = require("../lib/auth");

const {
	validationMid,
	usersSchemaLogin,
	usersSchemaSignUp,
} = require("../middleware/validation.js");

const app = express();
app.use(cors());
app.use(express.json());

// Register a new user
router.post(`/signup`, validationMid(usersSchemaSignUp), async (req, res) => {
	try {
		await registerUser(req.body);
		res.send("User added");
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

//user login
router.post("/login", validationMid(usersSchemaLogin), async (req, res) => {
	try {
		//check if user in database
		let user;
		user = await getUserByEmail(req.body.email);
		console.log(user);
		if (!user) {
			res.status(401).send("We didn't find this user");
			return;
		}

		//compare hashed password
		const isPasswordMatch = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordMatch) {
			res.status(401).send("Incorrect password");
			return;
		}

		// continue login process
		await loginUser(req.body);

		//assign token
		const token = sign({ id: user.Id });

		res.send({ token: token, user: user });
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

// Get all users
router.get(`/getAllUsers`, async (req, res) => {
	try {
		const result = await getAllUsers();
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

module.exports = router;

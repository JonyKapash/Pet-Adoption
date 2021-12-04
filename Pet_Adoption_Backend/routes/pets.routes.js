const express = require("express");
const router = express.Router();
const cors = require("cors");
const { filterQuery } = require("../middleware/validation");
// const { query } = require("../mysqldb/db");
const {
	addPet,
	getPetInfo,
	getPetById,
	addFavoritePet,
	removeFavoritePet,
	getUserFavoritePets,
	// isChecked,
	updatePetStatus,
	searchResult,
	getUserAdoptedPets,
	updatePetInfo,
} = require("../mysqldb/petsdb");

const app = express();
app.use(cors());
app.use(express.json());

// Add new pet
router.post(`/addPet`, async (req, res) => {
	try {
		await addPet(req.body);
		res.send("Pet added");
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

// Get pet info
router.get(`/getPetInfo`, async (req, res) => {
	try {
		const result = await getPetInfo();
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

// Get pet info by id
router.get(`/getPetById/:id`, async (req, res) => {
	try {
		const { id } = req.params;
		const result = await getPetById(id);
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

// Add favorite pet
router.post(`/addFavoritePet`, async (req, res) => {
	try {
		await addFavoritePet(req.body);
		res.send(" Favorite pet added");
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

// Remove favorite pet
router.post(`/removeFavoritePet`, async (req, res) => {
	console.log("pet Routs remove-->", req.body);
	try {
		await removeFavoritePet(req.body);
		res.send(" Favorite pet removed");
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

//Get favorite pets
router.get(`/favoritePets`, async (req, res) => {
	const query = (user = req.query);
	try {
		const result = await getUserFavoritePets(query);
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

//Get adopted pets
router.get(`/adoptedPets`, async (req, res) => {
	const query = ("adoptedPets", (user = req.query));
	try {
		const result = await getUserAdoptedPets(query);
		res.send(result);
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

//Update pet status from the pet page
router.post("/updatePetStatus", async (req, res) => {
	try {
		const result = await updatePetStatus(req.body);
		console.log("route", req.body);

		res.send(result);
	} catch (error) {
		res.status(400).send(error.message);
		console.log(error);
	}
});

router.post("/searchResult", filterQuery, async (req, res) => {
	try {
		console.log("req.body", req.body);
		const result = await searchResult(req.body);
		res.send(result);
	} catch (error) {
		res.status(400).send(error.message);
		console.log(error);
	}
});

router.put("/updatePetInfo", async (req, res) => {
	try {
		console.log("req.body", req.body.petInfo);
		const result = await updatePetInfo(req.body.petInfo);
		console.log("result", result);
		res.send(result);
	} catch (error) {
		res.status(400).send(error.message);
		console.log(error);
	}
});

module.exports = router;

// router.get(`/isChecked`, async (req, res) => {
// 	const query = req.query;
// 	console.log("isChecked query", query);
// 	try {
// 		const result = await isChecked(query);
// 		res.send(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(400).send(error.message);
// 	}
// });

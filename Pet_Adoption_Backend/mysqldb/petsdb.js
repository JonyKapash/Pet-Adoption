const { query } = require("./db");
const SQL = require("@nearform/sql");

// Add pet
const addPet = async pet => {
	try {
		const {
			Type,
			Name,
			Breed,
			Bio,
			Dietary,
			Height,
			Weight,
			Color,
			Adoption,
			Hypoallergenic,
			imageUrl,
		} = pet;
		const queryResult = await query(
			SQL`INSERT INTO pets (petType, petName, breed, petBio, dietary, height, weight, color, petStatus, hypoallergenic, image) VALUES (${Type},${Name},${Breed},${Bio},${"No"},${Height},${Weight},${Color},${Adoption},${Hypoallergenic}, ${imageUrl});`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.addPet = addPet;

// Get pet
const getPetInfo = async () => {
	try {
		const queryResult = await query(SQL`SELECT * FROM pets;`);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getPetInfo = getPetInfo;

// Get pet by id
const getPetById = async petId => {
	console.log(petId);
	try {
		const queryResult = await query(
			SQL`SELECT * FROM pets WHERE petId = ${petId};`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getPetById = getPetById;

// Add favorite pet
const addFavoritePet = async pet => {
	console.log("pet db fav-->", pet);
	try {
		const { petId, userId } = pet;
		const queryResult = await query(
			SQL`INSERT INTO favoritepets (petId,userId) VALUES (${petId},${userId});`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.addFavoritePet = addFavoritePet;

// Remove favorite pet
const removeFavoritePet = async pet => {
	console.log("pet db remove-->", pet);
	try {
		const { petId, userId } = pet;
		const queryResult = await query(
			SQL`DELETE FROM favoritepets 
			WHERE petId = ${petId} AND userId = ${userId};`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.removeFavoritePet = removeFavoritePet;

// Get favorite pets
const getUserFavoritePets = async data => {
	const { userId } = data;
	try {
		const queryResult = await query(SQL`SELECT * FROM pets
		INNER JOIN favoritepets
		ON pets.petId = favoritepets.petId AND favoritepets.userId = ${userId};`);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getUserFavoritePets = getUserFavoritePets;

// Update pet ownership
const updatePetStatus = async ownership => {
	try {
		const { petId, userId, petStatus } = ownership;
		console.log("db", ownership);

		const queryResult = await query(
			SQL`UPDATE petapet.pets SET userId=${userId}, petStatus=${petStatus} WHERE petId = ${petId}`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.updatePetStatus = updatePetStatus;

//Search for pets
const searchResult = async data => {
	const {
		animalName,
		animalStatus,
		animalType,
		minWeight,
		maxWeight,
		minHeight,
		maxHeight,
	} = data;
	try {
		const queryResult = await query(
			SQL`SELECT * FROM petapet.pets
		WHERE petName LIKE ${animalName}
		AND petStatus LIKE ${animalStatus}
		AND petType LIKE ${animalType}
		AND weight >= ${minWeight} AND weight <= ${maxWeight}
		AND height >= ${minHeight} AND height <= ${maxHeight}
		;`
		);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.searchResult = searchResult;

// get adopted pets
const getUserAdoptedPets = async data => {
	const { userId } = data;
	try {
		const queryResult = await query(SQL`SELECT * FROM pets
		WHERE pets.userId = ${userId} AND pets.petStatus = 'Adopted';`);
		return queryResult;
	} catch (error) {
		console.log(error);
	}
};
exports.getUserAdoptedPets = getUserAdoptedPets;

const updatePetInfo = async petInfo => {
	try {
		const {
			petId,
			name,
			type,
			height,
			weight,
			color,
			bio,
			hypoallergenic,
			breed,
			status,
			img,
		} = petInfo;
		// console.log(
		// 	"petId",
		// 	petId,
		// 	"name",
		// 	name,
		// 	"type",
		// 	type,
		// 	"height",
		// 	height,
		// 	"weight",
		// 	weight,
		// 	"color",
		// 	color,
		// 	"bio",
		// 	bio,
		// 	"hypoallergenic",
		// 	hypoallergenic,
		// 	"breed",
		// 	breed,
		// 	"status",
		// 	status
		// );
		const queryResult = await query(
			SQL`UPDATE petapet.pets SET petName=${name}, petType=${type}, height=${height}, weight=${weight}, color=${color}, petBio=${bio}, hypoallergenic=${hypoallergenic}, breed=${breed}, image=${img}, petStatus=${status} WHERE petId = ${petId}`
		);
		console.log("queryResult", queryResult);
		return queryResult;
	} catch (error) {
		console.log("error", error);
		console.log("error.message", error.message);
	}
};
exports.updatePetInfo = updatePetInfo;

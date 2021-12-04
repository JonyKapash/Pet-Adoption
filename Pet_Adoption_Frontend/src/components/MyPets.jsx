import React, { useEffect } from "react";
import AnimalCard from "../components/AnimalCard/AnimalCard";
import { useCon } from "../context/AppContext";
import { getUserAdoptedPets } from "../data/petsApi";

function MyPets() {
	const { userAdoptedPets, setUserAdoptedPets } = useCon();
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		userId &&
			getUserAdoptedPets(userId).then(response => {
				setUserAdoptedPets(response);
				console.log("mypets", response);
			});
	}, []);

	return (
		<div className="Card-container">
			<div className="d-flex flex-wrap justify-content-evenly">
				{userAdoptedPets.length > 0 &&
					userAdoptedPets &&
					userAdoptedPets.map((pet, index) => {
						return (
							<AnimalCard
								key={index}
								petId={pet.petId}
								petImg={pet.image}
								petName={pet.petName}
								petBio={pet.petBio}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default MyPets;

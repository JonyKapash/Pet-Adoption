import React, { useEffect, useState } from "react";
import { getUserFavoritePets } from "../data/petsApi";
import AnimalCard from "./AnimalCard/AnimalCard";
import { useCon } from "../context/AppContext";

function FavoritePets() {
	const { loggedIn } = useCon();
	const userId = localStorage.getItem("userId");
	const [petInfo, setPetInfo] = useState({});

	useEffect(() => {
		loggedIn &&
			getUserFavoritePets(userId).then(response => {
				setPetInfo(response);
				console.log("fav pets res ", response);
			});
	}, []);

	return (
		<div className="Card-container">
			<div className="d-flex flex-wrap justify-content-evenly">
				{petInfo.length > 0 &&
					petInfo &&
					petInfo.map((pet, index) => {
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

export default FavoritePets;

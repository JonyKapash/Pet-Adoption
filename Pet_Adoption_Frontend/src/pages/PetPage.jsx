import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PetPageCard from "../components/PetPageCard/PetPageCard";
import { getPetById } from "../data/petsApi";

function PetPage() {
	const location = useLocation();
	let petId = location.state.petId;

	const [petInfo, setPetInfo] = useState({});

	useEffect(() => {
		getPetById(petId).then(response => {
			setPetInfo(response[0]);
		});
	}, []);

	const {
		image,
		petName,
		petType,
		height,
		weight,
		color,
		petBio,
		hypoallergenic,
		dietary,
		breed,
		petStatus,
	} = petInfo;

	return (
		<div>
			<main>
				<section className="pb-5 text-center container">
					<div className="row py-lg-5">
						<div className="col-lg-6 col-md-8 mx-auto">
							<h1 className="fw-light">Pet Page</h1>
							<p className="lead text-muted fs-3">
								Just when you thought you knew everything...
							</p>
						</div>
					</div>
					{petInfo && (
						<PetPageCard
							id={petId}
							img={image}
							name={petName}
							type={petType}
							height={height}
							weight={weight}
							color={color}
							bio={petBio}
							hypoallergenic={hypoallergenic}
							dietary={dietary}
							breed={breed}
							status={petStatus}
						/>
					)}
				</section>
			</main>
		</div>
	);
}
export default PetPage;

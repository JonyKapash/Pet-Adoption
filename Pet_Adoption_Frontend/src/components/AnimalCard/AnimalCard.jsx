import { Button } from "react-bootstrap";
import React from "react";
import "./AnimalCard.css";
import { useHistory } from "react-router-dom";

function AnimalCard(props) {
	const { petId, petImg, petName, petBio } = props;

	const history = useHistory();

	const changePage = petId => {
		history.push({
			pathname: `/petPage`,
			state: { petId: petId },
		});
	};
	return (
		<div className="card">
			<div className="imgBx">
				<img src={petImg} alt="dog" />
			</div>
			<div className="content">
				<h2>{petName}</h2>
				<p className="TextOverflow">{petBio}</p>
				<Button onClick={() => changePage(petId)}>More Info</Button>
			</div>
		</div>
	);
}

export default AnimalCard;

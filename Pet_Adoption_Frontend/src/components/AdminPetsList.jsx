import React from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCon } from "../context/AppContext";

function AdminPetsList() {
	const { allPetInfo } = useCon();
	const history = useHistory();

	const handleClick = petId => {
		history.push({
			pathname: `/petPage`,
			state: { petId: petId },
		});
	};

	return (
		<div className="page-rapper m-5 p-5">
			<ListGroup defaultActiveKey="#link1">
				{allPetInfo.length > 0 &&
					allPetInfo.map((pet, index) => {
						return (
							<>
								<ListGroup.Item
									action
									onClick={() => handleClick(pet.petId)}
									variant="success"
									key={index}
								>
									{`PetId: ${pet.petId}, Name: ${pet.petName}, Breed: ${pet.breed}, PetType: ${pet.petType}`}
								</ListGroup.Item>
								<br />
							</>
						);
					})}
			</ListGroup>
		</div>
	);
}

export default AdminPetsList;

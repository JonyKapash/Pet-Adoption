import React, { useEffect, useState } from "react";
import "./UsersList.css";
import { ListGroup } from "react-bootstrap";
import Collapsible from "react-collapsible";
import { useCon } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { getUserAdoptedPets } from "../../data/petsApi";

function AdminUsersList() {
	const { AllUsersInfo, userAdoptedPets } = useCon();
	const history = useHistory();
	// const userId = localStorage.getItem("userId");
	const [userPets, setUserPets] = useState({});

	//todo work on maping each users pet images
	const getPeByUserId = userId => {
		getUserAdoptedPets(userId).then(response => {
			console.log("getPeByUserId", response);
			setUserPets(response);
			
		});
	};

	const changePage = petId => {
		history.push({
			pathname: `/petPage`,
			state: { petId: petId },
		});
	};

	useEffect(() => {
		// console.log(" adopted in userList", userAdoptedPets);
		// console.log(AllUsersInfo[0].userId);
		console.log("UserPets", userPets);
	}, []);

	return (
		<div className="userContainer mt-4 mb-4">
			<ListGroup defaultActiveKey="#link1">
				{AllUsersInfo.length > 0 &&
					AllUsersInfo.map((user, index) => {
						return (
							<>
								<div
									onClick={() => getPeByUserId(user.userId)}
									className="userDiv btn btn-success"
								>
									<Collapsible
										trigger={`${user.firstName} ${user.lastName}`}
										key={index}
									>
										<hr></hr>

										<table>
											<tr>
												<th>{`Id - ${user.userId}`}</th>
												<th>{`Email - ${user.email}`}</th>
												<th>{`Bio - ${user.bio}`}</th>
												<th>{`Phone - ${user.phone}`}</th>
											</tr>
											<div className="petImgContainer">
												{userAdoptedPets.length > 0 &&
													userAdoptedPets &&
													userAdoptedPets.map((pet, index) => {
														return (
															<img
																onClick={() =>
																	changePage(userAdoptedPets[index].petId)
																}
																src={pet.image}
																alt="pet"
															/>
														);
													})}
											</div>
										</table>
									</Collapsible>
								</div>
							</>
						);
					})}
			</ListGroup>
		</div>
	);
}

export default AdminUsersList;

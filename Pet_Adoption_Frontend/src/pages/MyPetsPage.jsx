import React, { useState } from "react";
import MyPets from "../components/MyPets";
import FavoritePets from "../components/FavoritePets";

function MyPetsPage() {
	const [myPets, setMyPets] = useState(true);

	return (
		<>
			<section className="text-center container">
				<div className="row py-lg-5">
					<div className="col-lg-6 col-md-8 mx-auto">
						<h1 className="fw-light">My Pets Page</h1>
						<div className="d-flex justify-content-evenly">
							<h5
								style={{ cursor: "pointer" }}
								className={
									myPets
										? "text-success rounded-pill border border-success m-3 p-2"
										: "text-secondary rounded-pill border border-white m-3 p-2"
								}
								onClick={() => {
									setMyPets(true);
								}}
							>
								My Pets
							</h5>
							<h5
								style={{ cursor: "pointer" }}
								className={
									!myPets
										? "text-success rounded-pill border border-success m-3 p-2"
										: "text-secondary rounded-pill border border-white m-3 p-2"
								}
								onClick={() => {
									setMyPets(false);
								}}
							>
								Favorite Pets
							</h5>
						</div>
					</div>
				</div>
			</section>
			{myPets && <MyPets />}
			{!myPets && <FavoritePets />}
		</>
	);
}

export default MyPetsPage;

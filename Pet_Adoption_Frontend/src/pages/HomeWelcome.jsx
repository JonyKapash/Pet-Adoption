import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Typed from "react-typed";
import ProfileSettings from "../components/ProfileSettings";
import { useCon } from "../context/AppContext";

function HomeWelcome() {
	const { currentUser, loggedIn } = useCon();
	const { firstName, lastName } = loggedIn;
	const history = useHistory();
	const changePage = () => {
		history.push("/myPetsPage");
	};
	return (
		<div>
			<main>
				<section className="py-3 text-center container">
					<div className="row py-lg-5">
						<div className="col-lg-6 col-md-8 mx-auto">
							{loggedIn && (
								<h1 className="fw-light">
									Welcome {firstName} {lastName}
								</h1>
							)}
							<div className="m-4">
								<Typed
									className="lead text-muted"
									strings={[
										"Nice to see you again! <br> Ready to adopt a one of our pets? ",
									]}
									typeSpeed={60}
								/>
							</div>
							<div className="mt-4">
								<Button
									onClick={changePage}
									className="btn btn-success my-2 m-4"
								>
									My Pets Page
								</Button>
								<ProfileSettings />
							</div>
						</div>
					</div>
				</section>

				<section>
					<div className="d-flex justify-content-around m-3">
						<img
							style={{ width: "400px", height: "300px", borderRadius: "8px" }}
							src="https://bit.ly/3zIAgNL"
							alt="pet"
						/>
						<img
							style={{ width: "400px", height: "300px", borderRadius: "8px" }}
							src="https://bit.ly/3lb3zVv"
							alt="pet"
						/>
						<img
							style={{ width: "400px", height: "300px", borderRadius: "8px" }}
							src="https://bit.ly/3rRn0E9"
							alt="pet"
						/>
					</div>
				</section>
			</main>
		</div>
	);
}

export default HomeWelcome;

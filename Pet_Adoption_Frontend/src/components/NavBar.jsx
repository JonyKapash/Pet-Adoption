import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import { useCon } from "../context/AppContext";

function NavBar() {
	const { loggedIn } = useCon();
	const { isAdmin } = loggedIn;
	// console.log(isAdmin);
	const history = useHistory();

	const changePage = () => {
		history.push("/");
	};

	return (
		<div>
			<Navbar>
				<Container>
					<Navbar.Brand>
						<div
							onClick={changePage}
							className="logo"
							style={{ color: "#017143", fontWeight: "800", cursor: "pointer" }}
						>
							PetApet
						</div>
					</Navbar.Brand>
					<Nav className="me-auto">
						{loggedIn && (
							<Nav.Link as={Link} to="/homeWelcome">
								Home
							</Nav.Link>
						)}
						{!loggedIn && (
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
						)}

						<Nav.Link as={Link} to="/search">
							Search
						</Nav.Link>
						{loggedIn && (
							<Nav.Link as={Link} to="/myPetsPage">
								My Pets
							</Nav.Link>
						)}
						{isAdmin == 1 && (
							<Nav.Link as={Link} to="/admin">
								Admin
							</Nav.Link>
						)}
					</Nav>
					{loggedIn && (
						<div
							className="btn btn-outline-success btn-sm"
							onClick={() => {
								localStorage.clear();
								history.push("/");
								window.location.reload();
							}}
						>
							LogOut
						</div>
					)}

					{!loggedIn && (
						<Nav.Link style={{ color: "gray" }}>
							<ModalComponent />
						</Nav.Link>
					)}
				</Container>
			</Navbar>
		</div>
	);
}

export default NavBar;

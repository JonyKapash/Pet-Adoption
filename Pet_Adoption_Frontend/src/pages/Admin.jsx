import React, { useEffect, useState } from "react";
import AdminAddPet from "../components/AdminAddPet";
import AdminUsersList from "../components/UsersList/AdminUsersList";
import AdminPetsList from "../components/AdminPetsList";
import "./pages.css";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useCon } from "../context/AppContext";

function Admin() {
	const [PetList, setPetList] = useState(true);
	const [UserList, setUserList] = useState(false);
	const [AddPet, setAddPet] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const { petAdded, setPetAdded } = useCon();

	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleCloseSnackBar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackBar(false);
	};

	useEffect(() => {
		if (petAdded) {
			setOpenSnackBar(true);
			setTimeout(() => {
				setPetAdded(false);
			}, 1000);
		}
	}, [petAdded]);

	return (
		<>
			<section className="text-center container">
				<div className="row py-lg-5">
					<div className="col-lg-6 col-md-8 mx-auto">
						<h1 className="fw-light">Welcome Admin</h1>
						<div className="d-flex justify-content-evenly">
							<h5
								style={{
									cursor: "pointer",
								}}
								className={PetList ? "pillFilled" : "pillEmpty"}
								onClick={() => {
									setPetList(true);
									setUserList(false);
									setAddPet(false);
								}}
							>
								Pet List
							</h5>
							<h5
								style={{
									cursor: "pointer",
								}}
								className={UserList ? "pillFilled" : "pillEmpty"}
								onClick={() => {
									setUserList(true);
									setPetList(false);
									setAddPet(false);
								}}
							>
								User List
							</h5>
							<h5
								style={{
									cursor: "pointer",
								}}
								className={AddPet ? "pillFilled" : "pillEmpty"}
								onClick={() => {
									setAddPet(true);
									setUserList(false);
									setPetList(false);
								}}
							>
								Add Pet
							</h5>
						</div>
					</div>
				</div>
			</section>

			{PetList && <AdminPetsList />}

			{UserList && <AdminUsersList />}

			{AddPet && <AdminAddPet />}

			<Snackbar
				open={openSnackBar}
				autoHideDuration={3000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity="success">
					Pet was added Successfully!
				</Alert>
			</Snackbar>
		</>
	);
}

export default Admin;

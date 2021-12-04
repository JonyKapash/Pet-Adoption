import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button } from "react-bootstrap";
import "./PetPageCard.css";
import { useCon } from "../../context/AppContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { updatePetStatus, updatePetInfo } from "../../data/petsApi";
import { useLocation } from "react-router-dom";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStylesModal = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
		width: "fit-content",
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PetPageCard(props) {
	const { loggedIn, userAdoptedPets } = useCon();
	const { isAdmin } = loggedIn;
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [petStatus, setPetStatus] = useState("");
	// const [buttonShow, setButtonShow] = useState(true);
	const classes = useStyles();
	const userId = localStorage.getItem("userId");
	const location = useLocation();
	let petId = location.state.petId;
	const classesModal = useStylesModal();
	const [open, setOpen] = useState(false);
	const handleCloseModal = () => {
		setOpen(false);
	};

	//todo keep working on conditional render
	const {
		img,
		name,
		type,
		height,
		weight,
		color,
		bio,
		hypoallergenic,
		dietary,
		breed,
		status,
	} = props;

	useEffect(() => {
		console.log("userAdoptedPets", userAdoptedPets);
	}, []);

	const handleCloseSnackBar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackBar(false);
	};

	useEffect(() => {
		if (petStatus !== "") {
			const ownership = { userId, petStatus, petId };
			updatePetStatus(ownership);
		}
	}, [petStatus]);

	const handleAdopt = () => {
		setPetStatus("Adopted");
		setOpenSnackBar(true);
		setTimeout(() => {
			window.location.reload();
		}, 800);
	};

	const handleFoster = () => {
		setPetStatus("Fostered");
		setOpenSnackBar(true);
		setTimeout(() => {
			window.location.reload();
		}, 800);
	};

	const handleReturn = () => {
		setPetStatus("Sheltered");
		setOpenSnackBar(true);
		setTimeout(() => {
			window.location.reload();
		}, 800);
	};

	const [input, setInput] = useState({});

	useEffect(() => {
		setInput({ ...props, petId: petId });
	}, [props]);

	const handleChange = e => {
		const { name, value } = e.target;

		setInput(prev => {
			return { ...prev, [name]: value };
		});
	};

	return (
		<>
			<div className={classes.root}>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							{" "}
							<img
								src={img}
								className="shadow-lg bg-body rounded pet-img"
								alt="dog"
							/>
							{loggedIn && (
								<section className="d-flex justify-content-evenly align-items-end">
									{status !== "Adopted" && (
										<>
											<Button
												className="btn btn-success mt-3"
												onClick={handleAdopt}
											>
												Adopt
											</Button>

											{status !== "Fostered" && (
												<Button
													className="btn btn-success"
													onClick={handleFoster}
												>
													Foster
												</Button>
											)}
										</>
									)}
									{status !== "Sheltered" && (
										<Button
											className="btn btn-secondary returnBtn"
											onClick={handleReturn}
										>
											Return
										</Button>
									)}
									{isAdmin == 1 && (
										<div
											className="btn btn-outline-success"
											onClick={() => setOpen(!open)}
										>
											Edit {name}'s Info
										</div>
									)}
								</section>
							)}
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper className={classes.paper}>
							<table className="table ">
								<tbody>
									<tr>
										<th scope="row">Name</th>
										<td>{name}</td>
									</tr>
									<tr>
										<th scope="row">Type</th>
										<td>{type}</td>
									</tr>
									<tr>
										<th scope="row">Height</th>
										<td colSpan="2">{height} M</td>
									</tr>
									<tr>
										<th scope="row">Weight</th>
										<td colSpan="2">{weight} Kg</td>
									</tr>
									<tr>
										<th scope="row">Color</th>
										<td colSpan="2">{color}</td>
									</tr>
									<tr>
										<th scope="row">Bio</th>
										<td colSpan="2">{bio}</td>
									</tr>
									<tr>
										<th scope="row">Hypoallergenic</th>
										<td colSpan="2">{hypoallergenic}</td>
									</tr>
									<tr>
										<th scope="row">Dietary Restrictions</th>
										<td colSpan="2">{dietary}</td>
									</tr>
									<tr>
										<th scope="row">Breed</th>
										<td colSpan="2">{breed}</td>
									</tr>
									<tr>
										<th scope="row">Status</th>
										<td colSpan="2">{status}</td>
									</tr>
								</tbody>
							</table>
						</Paper>
					</Grid>
				</Grid>
			</div>
			<Modal
				className={classesModal.modal}
				open={open}
				onClose={handleCloseModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="note">
						<Grid item xs={6}>
							<Paper className={classes.paper}>
								<table className="table ">
									<tbody>
										<tr>
											<th scope="row">Name</th>
											<td>
												<input
													className="modalInput"
													name="name"
													type="text"
													defaultValue={name}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Type</th>
											<td>
												<input
													className="modalInput"
													name="type"
													type="text"
													defaultValue={type}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Height</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="height"
													type="text"
													defaultValue={height}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Weight</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="weight"
													type="text"
													defaultValue={weight}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Color</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="color"
													type="text"
													defaultValue={color}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Bio</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="bio"
													type="text"
													defaultValue={bio}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Hypoallergenic</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="hypoallergenic"
													type="text"
													defaultValue={hypoallergenic}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Dietary Restrictions</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="diet"
													type="text"
													defaultValue={dietary}
													onChange={handleChange}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Breed</th>
											<td colSpan="2">
												<input
													className="modalInput"
													name="breed"
													type="text"
													defaultValue={breed}
													onChange={handleChange}
												/>
											</td>
										</tr>
									</tbody>
								</table>

								<Button
									onClick={() => {
										console.log(input);
										updatePetInfo(input);
										handleCloseModal();
										setTimeout(() => {
											window.location.reload();
										}, 500);
									}}
								>
									Update
								</Button>
							</Paper>
						</Grid>
					</div>
				</Fade>
			</Modal>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={3000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity="success">
					{name} is {petStatus} Successfully!
				</Alert>
			</Snackbar>
		</>
	);
}
export default PetPageCard;

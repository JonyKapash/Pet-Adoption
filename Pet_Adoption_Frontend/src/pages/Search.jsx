import "./pages.css";
import {
	FormControlLabel,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Switch,
	TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SearchCard from "../components/SearchCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { searchResult } from "../data/petsApi";

const schema = yup.object().shape({
	animalType: yup.string().label("animalType"),
	animalStatus: yup.string().label("animalStatus"),
	animalName: yup.string(),
	minHeight: yup.number(),
	maxHeight: yup.number(),
	minWeight: yup.number(),
	maxWeight: yup.number(),
});

const GreenSwitch = withStyles({
	switchBase: {
		color: green[100],
		"&$checked": {
			color: "#157347",
		},
		"&$checked + $track": {
			backgroundColor: green[700],
		},
	},
	checked: {},
	track: {},
})(Switch);

const useStyles = makeStyles(theme => ({
	button: {
		display: "block",
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		width: 350,
	},
}));

const TextFieldGreen = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "green",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "green",
		},
	},
})(TextField);

const SelectGreen = withStyles({
	root: {
		"& label.Mui-focused": {
			color: green[700],
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: green[700],
		},
	},
})(Select);

function Search() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("");
	const [openType, setOpenType] = useState(false);
	const [selectedType, setSelectedType] = useState("");

	const handleSelectChange = event => {
		let newVal = event.target.value;
		setSelected(newVal);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleTypeChange = event => {
		let newVal = event.target.value;
		setSelectedType(newVal);
	};

	const handleTypeClose = () => {
		setOpenType(false);
	};

	const handleTypeOpen = () => {
		setOpenType(true);
	};

	const [advanceSearch, setAdvanceSearch] = useState({
		checkedA: true,
		checkedB: false,
	});

	const handleChange = e => {
		setAdvanceSearch({ ...advanceSearch, [e.target.name]: e.target.checked });
	};

	const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

	const [petInfo, setPetInfo] = useState({});

	const onSubmit = async data => {
		setPetInfo("");
		let searchResulttt;
		searchResulttt = await searchResult(data);
		setPetInfo(searchResulttt.data);
	};

	return (
		<div>
			<main>
				<section className="pb-5 text-center container">
					<div className="row py-lg-5">
						<div className="col-lg-6 col-md-8 mx-auto">
							<h1 className="fw-light">Search Page</h1>
							<p className="lead text-muted">
								Search for your new best friend!
							</p>
						</div>
					</div>
					<FormControlLabel
						control={
							<GreenSwitch
								checked={advanceSearch.checkedB}
								onChange={handleChange}
								name="checkedB"
							/>
						}
						label="Advanced Search"
					/>
					<form className="search-form">
						<FormControl className={classes.formControl}>
							<InputLabel id="selected-option">Pet Type</InputLabel>
							<SelectGreen
								id="animalType"
								{...register("animalType")}
								labelId="selected-option"
								open={openType}
								onClose={handleTypeClose}
								onOpen={handleTypeOpen}
								value={selectedType}
								onChange={handleTypeChange}
							>
								<MenuItem value="Dog">Dog</MenuItem>
								<MenuItem value="Cat">Cat</MenuItem>
								<MenuItem value="Any">Any</MenuItem>
							</SelectGreen>
						</FormControl>

						{advanceSearch.checkedB && (
							<>
								<FormControl className={classes.formControl}>
									<InputLabel id="selected-option">Pet Status</InputLabel>
									<Select
										id="animalStatus"
										{...register("animalStatus")}
										labelId="selected-option"
										open={open}
										onClose={handleClose}
										onOpen={handleOpen}
										value={selected}
										onChange={handleSelectChange}
									>
										<MenuItem value="Sheltered">Sheltered</MenuItem>
										<MenuItem value="Fostered">Fostered</MenuItem>
										<MenuItem value="Adopted">Adopted</MenuItem>
									</Select>
								</FormControl>

								<div>
									<TextFieldGreen
										id="animalName"
										{...register("animalName")}
										className="m-3"
										style={{ minWidth: 350 }}
										label="Name"
										type="search"
									/>
								</div>
								<div>
									<TextFieldGreen
										id="minHeight"
										{...register("minHeight")}
										style={{ width: 180 }}
										className="m-3"
										label="Min Height"
										type="number"
									/>
									<TextFieldGreen
										id="maxHeight"
										{...register("maxHeight")}
										style={{ width: 180 }}
										className="m-3"
										label="Max Height in CM"
										type="number"
									/>
								</div>
								<div>
									<TextFieldGreen
										id="minWeight"
										{...register("minWeight")}
										style={{ width: 180 }}
										className="m-3"
										label="Min Weight in Kg"
										type="number"
									/>
									<TextFieldGreen
										id="maxWeight"
										{...register("maxWeight")}
										style={{ width: 180 }}
										className="m-3"
										label="Max Weight in Kg"
										type="number"
									/>
								</div>
							</>
						)}
						<Button
							type="submit"
							variant="success"
							onClick={handleSubmit(onSubmit)}
						>
							Search
						</Button>
					</form>
				</section>

				<section className="Search-container">
					<div className="search-card-container">
						{petInfo.length > 0 &&
							petInfo.map((pet, index) => {
								return (
									<SearchCard
										key={index}
										petId={pet.petId}
										petImg={pet.image}
										petName={pet.petName}
										petBio={pet.petBio}
									/>
								);
							})}
					</div>
				</section>
			</main>
		</div>
	);
}

export default Search;

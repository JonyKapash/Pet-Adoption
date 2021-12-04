import React, { useState } from "react";
import {
	makeStyles,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	button: {
		display: "block",
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 350,
	},
}));

function UseSelect(props) {
	const { title, option1, option2, option3 } = props;
	const classes = useStyles();
	const [selected, setSelected] = useState("");
	const [open, setOpen] = useState(false);

	const handleChange = event => {
		let newVal = event.target.value;
		setSelected(newVal);
		console.log(newVal)
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="selected-option">{title}</InputLabel>
				<Select
					labelId="selected-option"
					id="selected"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={selected}
					onChange={handleChange}
				>
					<MenuItem value={option1}>{option1}</MenuItem>
					<MenuItem value={option2}>{option2}</MenuItem>
					<MenuItem value={option3}>{option3}</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}

export default UseSelect;

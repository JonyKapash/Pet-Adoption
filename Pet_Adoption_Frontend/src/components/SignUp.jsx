import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCon } from "../context/AppContext";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
import { registerUser } from "../data/usersApi";

const schema = yup.object().shape({
	firstName: yup.string().required().label("First Name"),
	lastName: yup.string().required().label("Last Name"),
	email: yup.string().email().required().label("Email Address"),
	password: yup
		.string()
		.required("No password provided.")
		.min(8, "Password is too short - should be 8 chars minimum.")
		.matches(
			/[a-zA-Z]/,
			"Password can only contain english letters and numbers."
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
	phone: yup.number().positive().integer().label("Phone Number"),
});

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

function SignUp() {
	const { setShow, setRegisterNotice } = useCon();
	// const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = async data => {
		setShow(false);
		// history.push("/homeWelcome");
		await registerUser(data);
		// alert("Please Login");
		setRegisterNotice(true);
	};

	return (
		<form className="d-flex flex-column m-1" noValidate autoComplete="off">
			<TextFieldGreen
				id="email"
				{...register("email")}
				className="m-2"
				label="Email Address"
				type="text"
				color={errors.email && "secondary"}
			/>

			<span style={{ color: "red" }}>{errors.email?.message}</span>

			<TextFieldGreen
				id="firstName"
				{...register("firstName")}
				className="m-2"
				label="First Name"
				type="text"
				color={errors.firstName && "secondary"}
			/>

			<span style={{ color: "red" }}>{errors.firstName?.message}</span>

			<TextFieldGreen
				id="lastName"
				{...register("lastName")}
				className="m-2"
				label="Last Name"
				type="text"
				color={errors.lastName && "secondary"}
			/>

			<span style={{ color: "red" }}>{errors.lastName?.message}</span>

			<TextFieldGreen
				id="password"
				{...register("password")}
				className="m-2"
				label="Password"
				type="password"
				color={errors.password && "secondary"}
			/>

			<span style={{ color: "red" }}>{errors.password?.message}</span>

			<TextFieldGreen
				id="confirmPassword"
				{...register("confirmPassword")}
				className="m-2"
				label="Retype Password"
				type="password"
				color={errors.confirmPassword && "secondary"}
			/>
			<span style={{ color: "red" }}>{errors.confirmPassword?.message}</span>

			<TextFieldGreen
				id="phone"
				{...register("phone")}
				className="m-2"
				label="Phone Number"
				type="number"
				color={errors.phone && "secondary"}
			/>
			<span style={{ color: "red" }}>
				{errors.phone && "Phone Number must be valid"}
			</span>
			<div className="d-flex flex-row-reverse m-2">
				<Button
					onClick={handleSubmit(onSubmit)}
					className="w-50"
					variant="success"
					type="submit"
				>
					Sign Up
				</Button>
			</div>
		</form>
	);
}
export default SignUp;

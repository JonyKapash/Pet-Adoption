import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCon } from "../context/AppContext";
import { useHistory } from "react-router-dom";
import { loginUser } from "../data/usersApi";

const schema = yup.object().shape({
	email: yup.string().email().required().label("Email Address"),
	password: yup
		.string()
		.required("No password provided.")
		.min(8, "Password is too short - should be 8 chars minimum.")
		.matches(
			/[a-zA-Z]/,
			"Password can only contain english letters and numbers."
		),
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

function Login() {
	const { setShow, setCurrentUser, setLoggedIn, AllUsersInfo } = useCon();
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = async data => {
		setShow(false);
		let findUser;
		AllUsersInfo.forEach(user => {
			if (user.email === data.email) {
				loginUser(data).then(user => {
					setCurrentUser(user);
					setLoggedIn(user);

					if (user.isAdmin) {
						history.push("/admin");
					} else {
						history.push("/homeWelcome");
					}
				});
				findUser = true;
				return findUser;
			}
		});
		if (!findUser) {
			return alert(
				"Sorry we couldn't log you in!,  Please make sure you are registered or your Email and Password correct :)"
			);
		}
	};

	return (
		<form className="d-flex flex-column m-1" noValidate autoComplete="off">
			<TextFieldGreen
				id="email"
				{...register("email")}
				className="m-2 "
				label="Email Address"
				type="text"
				color={errors.email && "secondary"}
			/>
			<span style={{ color: "red" }}>{errors.email?.message}</span>
			<TextFieldGreen
				id="Password"
				{...register("password")}
				className="m-2"
				label="Password"
				type="password"
				color={errors.password && "secondary"}
			/>
			<span style={{ color: "red" }}>{errors.password?.message}</span>
			<div className="d-flex flex-row-reverse m-2">
				<Button
					className="w-50"
					variant="success"
					onClick={handleSubmit(onSubmit)}
					type="submit"
				>
					Login
				</Button>
			</div>
		</form>
	);
}
export default Login;

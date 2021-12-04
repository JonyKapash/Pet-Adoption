import { ButtonBase } from "@material-ui/core";
import React from "react";
import { Modal } from "react-bootstrap";
import Login from "./Login";
import SignUp from "./SignUp";
import { useCon } from "../context/AppContext";
function ModalComponent() {
	const { show, setShow, register, setRegister } = useCon();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<div onClick={handleShow}>Login / Sign Up</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<div
						className="d-flex flex-row justify-content-around"
						style={{ border: "none", width: "100%" }}
					>
						<Modal.Title
							onClick={() => {
								setRegister(true);
							}}
							className={register ? "text-success" : "text-secondary"}
						>
							<ButtonBase> Login </ButtonBase>
						</Modal.Title>
						<Modal.Title
							onClick={() => {
								setRegister(false);
							}}
							className={!register ? "text-success" : "text-secondary"}
						>
							<ButtonBase> Sign Up </ButtonBase>
						</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-column mb-3 justify-content-evenly">
						{register ? <Login /> : <SignUp />}
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
export default ModalComponent;

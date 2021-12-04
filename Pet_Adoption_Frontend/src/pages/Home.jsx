import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCon } from "../context/AppContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Home.css";

function Home() {
	const { registerNotice } = useCon();
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [currentImg, setCurrentImg] = useState(
		"https://i.ibb.co/k6JKL7q/2.png"
	);

	const history = useHistory();
	const changePage = () => {
		history.push("/search");
	};

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
		if (registerNotice) {
			setOpenSnackBar(true);
		}
	}, [registerNotice]);
	return (
		<>
			<div>
				<section className="home-section">
					<div className="circle"></div>
					<div className="home-content">
						<div className="textBox">
							<h2>
								Welcome to PetAPet <br /> It's a <span>Family</span>
							</h2>
							<p>
								<b>Congratulations on adopting a pet!</b> You are embarking on a
								wonderful and rewarding relationship. Adopting a new pet comes
								with a lot of change for both pet and pet parent, but we sure
								you'll be Great!
							</p>
							<div
								style={{ borderRadius: "20px" }}
								className="btn btn-success"
								onClick={changePage}
							>
								Explore More
							</div>
						</div>
						<div className="imgBox dog-img">
							<img src={currentImg} alt="animal" border="0" />
						</div>
					</div>
					<ul className="thumb">
						<li>
							<img
								onClick={() => setCurrentImg("https://i.ibb.co/k6JKL7q/2.png")}
								src="https://i.ibb.co/rs4FrpC/3.png"
								alt="bird"
								border="0"
							/>
						</li>

						<li>
							<img
								onClick={() =>
									setCurrentImg("https://i.ibb.co/4N14tcp/Dog2.png")
								}
								src="https://i.ibb.co/4N14tcp/Dog2.png"
								alt="Dog"
								border="0"
							/>
						</li>

						<li>
							<img
								onClick={() => setCurrentImg("https://i.ibb.co/dc93D5m/1.png")}
								src="https://i.ibb.co/RcqM6YC/4.png"
								alt="rabit"
								border="0"
							/>
						</li>
					</ul>
				</section>
			</div>
			<Snackbar
				open={openSnackBar}
				autoHideDuration={5000}
				onClose={handleCloseSnackBar}
			>
				<Alert onClose={handleCloseSnackBar} severity="success">
					Success! Please Login...
				</Alert>
			</Snackbar>
		</>
	);
}

export default Home;

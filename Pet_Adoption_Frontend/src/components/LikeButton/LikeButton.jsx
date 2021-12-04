import React, { useState } from "react";
import "./LikeButton.css";

function LikeButton() {
	const [className, setClassName] = useState("");

	const handleClick = () => {
		setClassName(!className);
	};

	return (
		<div
			className={`heart ${className && "is-active"}`}
			onClick={() => handleClick()}
		></div>
	);
}

export default LikeButton;

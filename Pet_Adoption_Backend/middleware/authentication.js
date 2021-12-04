const jwt = require("jsonwebtoken");

const authenticate = () => {
	return (req, res, next) => {
		const secretKey = "oijfkdsfjodff843jfe89jfd9443fj9438fj9843jf9843fj98p3";
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.replace("Bearer ", "");

				// *Most Important Part Right Here*
				// this is how we verify the token is sent by the server (via secretKey during "sign" function), or someone else
				const decoded = jwt.verify(token, secretKey);
				req.decoded = decoded;
				next();
			}
		} catch (error) {
			console.log("error -", error);
			res.status(401).send({ message: "Failed to authenticate", error });
		}
	};
};
module.exports = authenticate;

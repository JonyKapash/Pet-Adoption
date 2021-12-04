const jwt = require("jsonwebtoken");
const secretKey = "oijfkdsfjodff843jfe89jfd9443fj9438fj9843jf9843fj98p3";
function sign(data) {
	return jwt.sign(data, secretKey, { expiresIn: 600 });
}
exports.sign = sign;

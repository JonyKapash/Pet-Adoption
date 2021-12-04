const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/user", require("./routes/user.routes"));
app.use("/pets", require("./routes/pets.routes"));

const port = 4000;
app.listen(port, () => {
	console.log(`server running on ${port}`);
});

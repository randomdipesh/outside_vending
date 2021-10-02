require("dotenv").config();
const express = require("express");
//app for express
const app = express();
//setup body parser
//json
app.use(express.json());
//url encoded body
app.use(express.urlencoded({ extended: true }));
//require database connection
require("./db/connection");

//call routes on /api route
const route = require("./routes/index")
app.use("/api",route)


//server running port
const port = process.env.PORT;
app.listen(port, (err) => {
	if (err) throw err;
	console.log(`App up and running at port ${port}`);
});

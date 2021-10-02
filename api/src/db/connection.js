const { connect } = require("mongoose");
connect(process.env.mongoURL, (err, succ) => {
	if (err) {
		throw err;
	}
	if (succ) {
		console.log("Database connected");
	}
});

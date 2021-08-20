const express = require("express");
const app = express();
const mongoose = require("mongoose");
const gamesRoutes = require("./routes/gamesRoute");
require("dotenv").config();

mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
	console.log("Connectedo ao db");
});


app.get("/",(req,res) => {
	res.send("ok");
});


app.use("/",gamesRoutes);
const PORT = 3000;
app.listen(process.env.PORT || PORT,() => {
	console.log(`rodando na porta ${PORT}`);
});
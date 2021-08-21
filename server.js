const express = require("express");
const app = express();
const mongoose = require("mongoose");

//rotas
const gamesRoutes = require("./routes/gamesRoute");
const favoritos = require("./routes/favoritos");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
	console.log("Connectedo ao db");
});


app.use("/favoritos",favoritos);
app.use("/",gamesRoutes);
const PORT = 3000;
app.listen(process.env.PORT || PORT,() => {
	console.log(`rodando na porta ${PORT}`);
});
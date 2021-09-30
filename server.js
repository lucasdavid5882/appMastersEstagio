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
	console.log("Conectado ao db");
});

app.use("/favorite",favoritos);
app.use("/",gamesRoutes);

//middleware para error handling
app.use((req,res,next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
})

app.use((error,req,res,next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message:error.message
		}
	})
})

const PORT = 3000;
app.listen(process.env.PORT || PORT,() => {
	console.log(`rodando na porta ${PORT}`);
});
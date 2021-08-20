const express = require("express");
const router = express.Router();
const Game = require("../models/game");

router.post("/favoritos",(req,res) => {
	const { appid,nota } = req.body;
	res.send("test");
	
});


module.exports = router;
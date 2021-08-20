const express = require("express");
const router = express.Router();
const Game = require("../models/games");

router.post("/",(req,res) => {
	const user = req.headers.user_hash;
	const { appid,nota } = req.body;
	res.send("test");
	
});


module.exports = router;
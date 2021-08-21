const express = require("express");
const router = express.Router();
const Game = require("../models/game");


router.get("/",async (req,res) => {
	const name = req.headers.user_hash;
	console.log(name)
	try{
	    const documents = await Game.find({name:name});
		console.log(documents)
	    const games = documents.map((game) => {
		  return game.appid;
	    })
	    res.send(games)
	}catch(err){
		res.send({"err":err});
	}
})

router.post("/",async (req,res) => {
	const name = req.headers.user_hash;
	const { appid,nota } = req.body;
	const newGame = new Game({
		name:name,
		appid:appid,
		nota:nota
	})
	
	try{
		const user = await Game.find({name:name,appid:appid});		
		if(user.length != 0){
			return res.json({"message":"jogo já cadastrado"})
	}
	}catch(err){
		res.json({"err":err});
	}
	
	try {
	    await newGame.save();
		res.json({"message":"jogo salvo com sucesso"});
	}catch(err){
		res.json({"err":err});
	}	
});

router.delete("/:appid",async(req,res) => {
	const name = req.headers.user_hash;
	const { appid } = req.params;
	try {
	    const document = await Game.find({name:name,appid:appid});
	    document.remove();
	    res.json({"message":"Game removido com sucesso"});
	}catch(err){
		res.json({"err":err});
	}
})

module.exports = router;
const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const fetch = require("node-fetch");

router.get("/",async (req,res) => {
	const name = req.headers.user_hash;
	if(name){
	try{
	    const documents = await Game.find({name:name});
	    const games = documents.map((game) => {
		  return {appid:game.appid,nota:game.nota};
	    })
		let gamesFavoritos = [];
		for(let i = 0;i < games.length;i++){
			let response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${games[i].appid}`);
			let responseInfo = await response.json();
			if(games[i].nota){
			    responseInfo.nota = games[i].nota;
			}else{
			    responseInfo.nota = "?";
			}
			gamesFavoritos.push(responseInfo);
		}
		
	    res.json(gamesFavoritos);
	}catch(err){
		res.json({"err":err});
	}
	}else{
		return res.json({"message":"Request sem usuario"});
	}
})

router.post("/",async (req,res) => {
	const name = req.headers.user_hash;
	if(name){
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
		return res.json({"err":err});
	}
	
	try {
	    await newGame.save();
		res.json({"message":"jogo salvo com sucesso"});
	}catch(err){
		res.json({"err":err});
	}	
	}else{
		return res.json({"message":"Request sem usuario"});
	}
});

router.delete("/:appid",async(req,res) => {
	const name = req.headers.user_hash;
	if(name){
	const { appid } = req.params;
	try {
	    const document = await Game.findOne({name:name,appid:appid});
		if(document){
	        document.remove();
	        res.json({"message":"Game removido com sucesso"});
		}else{
	        res.json({"message":"este jogo nao esta na sua lista de favoritos"});
		}
	}catch(err){
		res.json({"err":err});
	}
	}else{
		return res.json({"message":"Request sem usuario"});
	}
})

module.exports = router;
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


router.get("/",async(req,res) => {
	try{
	    const response = await fetch("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json");
	    const data = await response.json();
	    res.json(data);
	}catch(err){
		res.json({"err":err});
	}
});

router.get("/:id",async(req,res) => {
	try{
	    const { id } = req.params;
	    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`);
	    const data = await response.json();
	    res.json(data);
	}catch(err){
		res.json({"err":err});
	}
	
})

router.get("/search/:game",async(req,res) => {
	try{
	    const { game } = req.params;
	        const response = await fetch("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json");
	        const data = await response.json();
	        const result = data.applist.apps.filter((games) => {
		        return games.name == game;
	        })

	        const responseInfo = await fetch(`https://store.steampowered.com/api/appdetails?appids=${result[0].appid}`);
	        const dataInfo = await responseInfo.json();
	        res.json(dataInfo);

	}catch(err){
		res.json({"err":err});
	}
})

module.exports = router;
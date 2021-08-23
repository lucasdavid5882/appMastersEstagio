const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


router.get("/",async(req,res) => {
	const response = await fetch("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json");
	const data = await response.json();
	res.json(data);
});

router.get("/:id",async(req,res) => {
	const { id } = req.params;
	const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`);
	const data = await response.json();
	res.json(data);
})

router.get("/search/:game",async(req,res) => {
	const { game } = req.params;
	const response = await fetch("http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json");
	const data = await response.json();
	const result = data.applist.apps.filter((games) => {
		return games.name == game;
	})

	const responseInfo = await fetch(`https://store.steampowered.com/api/appdetails?appids=${result[0].appid}`);
	const dataInfo = await responseInfo.json();
	res.json(dataInfo);
})

module.exports = router;
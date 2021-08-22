const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema({
	name:{
		type:String,
		required:true
	},
	appid:{
		type:Number,
		required:true
	},
	nota:{
		type:Number,
		required:false,
		min:0,
		max:5
	}
})

module.exports = mongoose.model('Game',Game);
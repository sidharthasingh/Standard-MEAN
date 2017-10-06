const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Video = require("../models/video");

const db = "mongodb://localhost:27017/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db,function(err){
	if(err)
	{
		console.log("Error Connecting to mongoDB");
	}
});

router.get('/',function(req,res){
	res.send("Api Works!");
});

router.get("/video",(req,res) => {
	console.log("Get request for all videos");
	Video.find({}).exec(function(err,videos){
		if(err)
		{
			console.log("Error retrieving videos.");
		}
		else
		{
			res.json(videos);
		}
	});
});

router.get("/videos/:id",(req,res)=>{
	console.log("Request for single video by ID : "+req.params.id);
	Video.findById(req.params.id).exec(function(err,videos){
		if(err)
		{
			console.log("Couldn't load Item");
		}
		else
		{
			res.json(videos);
		}
	});
});

router.post("/video",function(req,res){
	console.log('Post a new video');
	var newVideo = new Video();
	newVideo.title = req.body.title;
	newVideo.url = req.body.url;
	newVideo.description = req.body.description;
	newVideo.save(function(err,insertedVideo){
		if(err)
		{
			console.log("Error inserting video");
		}
		else
		{
			res.json(insertedVideo);
		}
	});
});

router.put("/video/:id",function(req,res){
	par = req.params;
	data = req.body;
	console.log("PUT request to update video ID : "+par.id);
	Video.findByIdAndUpdate(par.id,{
		$set:data
	},
	{
		new:true
	},(err,updatedData) => {
		if(err){
			console.log("Error in updating Data.");
		}
		else{
			res.json(updatedData);
		}
	});
});

router.delete("/video/:id",(req,res)=>{
	console.log("DELETE request for ID : "+req.params.id);
	Video.findByIdAndRemove(req.params.id,function(err,deleted){
		if(err)
		{
			console.log("Error deleting video");
		}
		else
		{
			if(deleted == null)
			{
				res.send("Not found");
			}
			else
				res.json(deleted);
		}
	})
});
module.exports = router;
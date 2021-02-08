const express = require("express");
const Meme = require("../models/MemePost");
const bodyParser = require("body-parser");
const router = express.Router();

router.get("/", (req, res)=>{
    console.log("I am in memefeed get route");
    Meme.find({}, (err, memes)=>{
        if(!err){
            res.render("memes",{
                memes: memes
            });
        }
        else{
            console.log(err);
        }
    });
});

router.post("/", (req, res)=>{
    console.log(req.body);
});

module.exports = router;
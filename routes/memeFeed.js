const express = require("express");
const Meme = require("../models/MemePost");
const bodyParser = require("body-parser");
const router = express.Router();

//route to get all the memes
router.get("/", (req, res)=>{
    // console.log("I am in memefeed get route");
    Meme.find({}, (err, memes)=>{
        if(!err){
            res.render("memes",{
                memes: memes
            });
            // res.json(memes);
        }
        else{
            console.log(err);
        }
    });
});

//route to get a meme with a particular ID
router.get("/:memeId", (req, res)=>{
    const meme = Meme.findOne({ id: req.params.memeId }, (err, meme)=>{
        if(!err){
            if(meme!=null)
            {
                res.json(meme);
            }
            else{
                res.json("Meme with id "+ req.params.memeId+ " is not present");
            }
        }else
        {
            res.json({ message: err });
        }
    });
});

router.post("/", (req, res)=>{
    console.log(req.body);
});

module.exports = router;
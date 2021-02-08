//Requiring necessary modules/packages
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Meme = require("./models/MemePost");


const PORT = process.env.PORT || 3000;

//Connecting to mongoDB database
mongoose.connect(process.env.DB_url, 
{useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Database connected");
});

//Template(EJS)
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

//Statement to enable usage of static files(css) in express
app.use(express.static("public"));

//Routes
const memeFeed = require("./routes/memefeed");

app.use("/memefeed", memeFeed);

app.get("/", function(req, res){
    console.log("I am in home route");
    res.render("home"); 
});


app.post("/", async function(req, res){
    console.log(req.body.memeOwner);
    console.log(req.body.memeCaption);
    const meme = new Meme({
        memeOwner: req.body.memeOwner,
        memeCaption: req.body.memeCaption,
        memeUrl: req.body.memeUrl
    });
    try{
        const savedMeme = await meme.save();
        // res.json(savedMeme);
    } catch(err){
        res.json({ message: err });
        console.log(err);
    }
    res.redirect("/");
});

//Listening at PORT
app.listen(PORT,function(){
    console.log(`server started at port ${PORT}`);
});

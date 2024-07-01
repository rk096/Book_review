const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")


const port = 8000;
const app = express();
app.use(cors());
app.use(express.json())
    

MONGO_URI = "mongodb+srv://richakamani32:23112003@bookreview.stiw9v8.mongodb.net/?retryWrites=true&w=majority&appName=BookReview"

mongoose.connect(MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo");
        console.log(err);
    });



app.get("/", (req, res) => {
    res.send("hello world");

});


app.listen(port, () => {
    console.log("App is running on port " + port);
})
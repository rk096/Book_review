const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const authroute = require('./Controller/Auth');
const User = require('./Models/User');
const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const reviewroute = require('./Controller/ReviewController');
const bookroute = require('./Controller/BookController');


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
        //console.log(err);
    });


//setup passport-jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ItisaSecretKeyofMyProject";
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findOne({ _id: jwt_payload.identifier });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    })
);




app.get("/", (req, res) => {
    res.send("hello world");

});

app.use('/auth', authroute);
app.use('/reviews', reviewroute);
app.use('/books', bookroute);


app.listen(port, () => {
    console.log("App is running on port " + port);
})
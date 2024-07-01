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
const Book = require('./Models/Book');

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

const axios = require('axios');
const cheerio = require('cheerio');


const scrapeTrendingBooks = async function(){
  try {
    const response = await axios.get('https://openlibrary.org/trending/daily');
    const $ = cheerio.load(response.data);

    const arrayobjects = await Object.values(response.data.works);

    const books = [];
   
    for(let i=0;i<arrayobjects.length;i++){
      const obj = arrayobjects[i];
      const author_key = (obj.author_key);
      const author_name = (obj.author_name);
      const first_publish_year = (obj.fist_publish_year);
      const title = (obj.title);
      books.push({author_key,author_name,first_publish_year,title});
    }
    //console.log(books);
    for (const book of books) {
      await Book.findOneAndUpdate({ title: books.title, author_key : books.author_key, author_name : books.author_name }, book, { upsert: true });
    }


  } catch (error) {
    console.error('Error scraping:', error.message);
  }
};

 scrapeTrendingBooks();



app.get("/", (req, res) => {
    res.send("hello world");

});

app.use('/auth', authroute);
app.use('/reviews', reviewroute);
app.use('/books', bookroute);


app.listen(port, () => {
    console.log("App is running on port " + port);
})
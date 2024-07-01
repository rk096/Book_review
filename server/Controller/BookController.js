const express = require("express");
const router = express.Router();
const Book = require("../Models/Book");
const passport = require('passport');


router.post("/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        //console.log("User authenticated: ", req.user)
        try {
            const { title,author_key, author_name   } = req.body;
            if (!title || !author_key || !author_name) {
                return res
                    .status(301)
                    .json({ err: "Insufficient details to create book." });
            }
            const bookdetails = {
                title,
                author_key,
                author_name
            };
            const createbook = await Book.create(bookdetails);
            return res.status(200).json(createbook);
        } catch (error) {
            console.error("Error creating book");
            return res.status(500).json({ error: "Error creating book" });
        }
    });

module.exports = router;
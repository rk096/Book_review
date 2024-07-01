const express = require("express");
const router = express.Router();
const Review = require("../Models/Review");
const passport = require('passport');
const User = require('../Models/User')

router.post("/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        console.log("User authenticated: ", req.user)
        try {
            const { book_id, rating, comment } = req.body;
            if (!book_id || !rating || !comment) {
                return res
                    .status(301)
                    .json({ err: "Insufficient details to create Review." });
            }
            const user = req.user._id;
            const reviewdetails = { book_id, rating, comment, user };
            const createreview = await Review.create(reviewdetails);
            return res.status(200).json(createreview);
        } catch (error) {
            console.error("Error creating review");
            return res.status(500).json({ error: "Error creating review" });
        }
    });


// Get all reviews with pagination
router.get("/",
    async (req, res) => {
        try {
            const { page = 1, size = 10 } = req.query; // Default to page 1 and size 10 if not provided
            const limit = parseInt(size);
            const skip = (parseInt(page) - 1) * limit;

            const reviews = await Review.find().limit(limit).skip(skip);
            const total = await Review.countDocuments();

            return res.status(200).json({
                total,
                page: parseInt(page),
                size: limit,
                reviews
            });
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return res.status(500).json({ error: "Error fetching reviews" });
        }
    }
);


// Get a single review
router.get('/:review_id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { review_id } = req.params;
            const review = await Review.findById(review_id);
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(200).json(review);
        } catch (error) {
            console.error("Error getting review");
            return res.status(500).json({ error: "Error getting review" });
        }
    });

// Update a review
router.put('/:review_id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { review_id } = req.params;
            const { rating, comment } = req.body;
            const updatedreview = await Review.findByIdAndUpdate(review_id, { rating: rating, comment: comment }, { new: true });
            if (!updatedreview) {
                return res.status(404).json({ error: 'Review not found' });
            }
            return res.status(200).json(updatedreview);
        } catch (error) {
            console.error("Error updating review");
            return res.status(500).json({ error: "Error updating review" });
        }
    });

// Delete a review
router.delete('/:review_id',
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const { review_id } = req.params;
            const review = await Review.findByIdAndDelete(review_id);
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting review");
            return res.status(500).json({ error: "Error deleting review" });
        }
    });

module.exports = router;
const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema({
    book_id: {
         type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Review", reviewschema);
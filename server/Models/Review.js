const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema({
    book_id : {
        type: String,
        required:true
    },

    rating : {
        type: Number,
        required : true
    },

    comment : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Review", reviewschema);
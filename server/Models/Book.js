
const mongoose = require("mongoose");

const bookschema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    firstPublished: {
        type: String,
        required: true
    },
    editions: {
        type: Number,
        required: true
    },
    previewable: {
        type: Number,
        required: true
    },
    logCount: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    }
        
})

module.exports = mongoose.model("Books", bookschema);
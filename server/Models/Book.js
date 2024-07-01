
const mongoose = require("mongoose");

const bookschema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    author_key:[ {
        type: String,
        required: true
    }],
    author_name: [{
        type: String,
        required: true
    }],
        
})

module.exports = mongoose.model("Books", bookschema);
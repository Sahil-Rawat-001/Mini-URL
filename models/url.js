const mongoose = require('mongoose');


// Making Schema
const urlSchema = new mongoose.Schema({

    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [
        {timeStamp: Number},
    ]
}, {timeStamps: true});



// creating model on the basis of schema
const URL = mongoose.model('url',urlSchema);



// exporting module
module.exports = URL;
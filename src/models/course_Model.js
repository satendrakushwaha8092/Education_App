const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    course_Name: {
        type: String,
        trim: true
    },
    duration:{
        type: String,
        trim: true
    },
    topics:[{
        type:String,
    }],
    price: {
        type: Number
    }

},{timestamps:true});

module.exports = mongoose.model('education', educationSchema)
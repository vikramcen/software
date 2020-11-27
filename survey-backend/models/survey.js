
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")


const surveySchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true,
    },
    description:{
        type:String, 
    },
    type:{
        type:String,
        required:true
    },
    questions:[{
        title:String,
        options: []
        // [{option:String}] || String,
    }],
    createdBy:{
        name:{ type:String },
        _id:{ type:String }
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    }
},{
    timestamps:true
})

surveySchema.methods.toJSON = function () {
    const survey = this
    const surveyObject = survey.toObject()
    return surveyObject
}

const Survey = mongoose.model('Survey',surveySchema)

module.exports = Survey
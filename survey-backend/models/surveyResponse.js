
const mongoose = require('mongoose')


const surveyResponseSchema = new mongoose.Schema({
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
    }],
    createdBy:{
        name:{ type:String },
        _id:{ type:String }
    },
    performedBy:{
        name:{ type:String },
        _id:{ type:String }
    },
    surveyID: String
},{
    timestamps:true
})

const SurveyResponse = mongoose.model('SurveyResponse',surveyResponseSchema)

module.exports = SurveyResponse
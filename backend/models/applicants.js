const mongoose = require('mongoose')

const apllicantschema = new mongoose.Schema({
    applicantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'User'
    }
    ,
    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'User'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        trim:true,
        ref:'Jobs'
    }
    ,
    firstName: {
        type: String,
        required: true,
        trim: true
    }
    ,
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
    ,
    phonenumber: {
        type: Number,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
    ,
    city: {
        type: String,
        required: true,
        trim: true
    },
    postalcode: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    descriptionforjob: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type:String,
        trim:true,
        enum:['Accepted','Rejected','Pending'],
        default: 'Pending'
    }
},{
    timestamps:true
}
)

const applicants=mongoose.model('applicants',apllicantschema)
module.exports={applicants}
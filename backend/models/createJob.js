const { String } = require('core-js')
const mongoose=require('mongoose')

const createJobSchema =new mongoose.Schema(
    {
        AuthorId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        jobTitle:{
            type:String,
            required:true,
            trim:true
        },
        companyName:{
            type:String,
            required:true,
            trim:true
        },
       companyDescription:{
            type:String,
            required:true,
            trim:true
        },
        jobOverview:{
            type:String,
            required:true,
            trim:true
        },
        responsibilities:{
            type:String,
            required:true,
            trim:true
        },
        skills:{
            type:String,
            required:true,
            trim:true
        },
        qualifications:{
            type:String,
            required:true,
            trim:true
        },
        location:{
            type:String,
            required:true,
            trim:true
        },
        employmentType:{
            type:String,
            required:true,
            trim:true
        },
        salary:{
            type:String,
           
            trim:true
        },
        workingTime:{
            type:String,
            required:true,
            trim:true
        },
        startDate:{
            type:String,
        
            trim:true
        },
       
        applicationDeadline:{
            type:String,
            required:true,
            trim:true
        },
       applyProcess:{
            type:String,
            required:true,
            trim:true  
        }
     , 
     contactNumber:{
        type:String,
        required:true,
        trim:true  
    }, 
    email:{
        type:String,
        required:true,
        trim:true  
    }, 
    additionalInformation:{
        type:String,
        trim:true  
    }
    }
)

const Jobs= mongoose.model('Jobs',createJobSchema)

module.exports={Jobs}
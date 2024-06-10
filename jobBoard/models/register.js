const mongoose =require('mongoose')
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
  firstName:{
      type:String,
      required:true,  
      trim:true
    },
    lastName:{
      type:String,
      required:true,  
      trim:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      trim:true
    },
    password:{
      type:String,
      required:true,
      trim:true
    },
    gender:{
      type:String,
      required:true,
      enum:['male','female','prefer-not-to-say']
    },
    roles:{
      type:String,
      enum:['job-seeker','job-creator'],
      default:'job-seeker',
      required:true
    }

},{
 timestamps:true
}
)

//updating the hashpassword to the database 
userSchema.pre('save',async function(next){ 
const user =this
if(!user.isModified('password')) return next()
  try{
const salt =await bcrypt.genSalt(20)
const hashPassword= await bcrypt.hash(user.password,salt)
user.password=hashPassword

next()

}
catch(err)
{
  console.log(`error occur while saving the hash password ${err}`)
next(err)
}
})

const User = mongoose.model('User', userSchema)

module.exports= {User}
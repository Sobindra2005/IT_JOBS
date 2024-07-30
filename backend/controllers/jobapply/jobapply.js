const { applicants} = require('../../models/applicants')



const jobapply = async (req,res)=>{
console.log(req.body)
const {applicantId,recruiterId,postId,firstName,lastName,email,phonenumber,country,city,postalcode,address,descriptionforjob } = req.body 
const newapplicants = new applicants({
    applicantId,recruiterId,postId,firstName,lastName,email,phonenumber,country,city,postalcode,address,descriptionforjob
}) 

newapplicants.save()
res.status(200).json({msg:'success'})
}

module.exports ={jobapply}
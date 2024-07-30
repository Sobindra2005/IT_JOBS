const {Jobs} =require('../../models/createJob')
const {applicants}=require('../../models/applicants')

const getJobs=async (req,res)=>{
    const getJobs=await Jobs.find({AuthorId:req.user._id})
    const allJobs=await Promise.all(getJobs.map(async(job)=>{
        const postId=await job._id
        console.log(postId)
        const applicant=await applicants.find({postId:postId})
      
        return {
            ...job.toObject(),
            applicants: applicant? applicant.length : 0 
        }
    }))

    return res.status(200).json(allJobs)  
}

module.exports={getJobs}

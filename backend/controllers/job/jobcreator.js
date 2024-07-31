const { Jobs } = require('../../models/createJob')
const { applicants } = require('../../models/applicants')

const getJobs = async (req, res) => {
    const getJobs = await Jobs.find({ AuthorId: req.user._id })
    const allJobs = await Promise.all(getJobs.map(async (job) => {
        const postId = await job._id
        const applicant = await applicants.find({ postId: postId })

        return {
            ...job.toObject(),
            applicants: applicant ? applicant.length : 0
        }
    }))

    return res.status(200).json(allJobs)
}

const ApplicantsList = async (req, res) => {
    const postId = req.params.postId
    const allApplicants = await applicants.find({ postId: postId })
    return res.status(200).json(allApplicants)
}


const AcceptHandle = async (req, res) => {
    const id = req.params.id;
    const updatedData = await applicants.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true })
    return res.status(200).json(updatedData)

}

const RejectHandle = async (req, res) => {
    const id = req.params.id;
    const updatedData = await applicants.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true })
    return res.status(200).json(updatedData)
}

const pendingHandle = async (req, res) => {
    const id = req.params.id;
    const updatedData = await applicants.findByIdAndUpdate(id, { status: 'Pending' }, { new: true })
    return res.status(200).json(updatedData)
}

module.exports = { getJobs, ApplicantsList, RejectHandle, pendingHandle, AcceptHandle }

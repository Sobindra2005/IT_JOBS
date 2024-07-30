const { Jobs } = require('../../models/createJob');
const { applicants } = require('../../models/applicants');

const getappliedJobs = async (req, res) => {
    try {
        const getJobs = await applicants.find({ applicantId: req.user._id });

        const allAppliedJobs = await Promise.all(getJobs.map(async (job) => {
            const postDetails = await Jobs.findOne({ _id: job.postId });
            return {
                ...job.toObject(),
                jobTitle: postDetails ? postDetails.jobTitle : null,
            };
        }));
        console.log(allAppliedJobs)
        return res.status(200).json(allAppliedJobs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching applied jobs' });
    }
};

module.exports = { getappliedJobs };
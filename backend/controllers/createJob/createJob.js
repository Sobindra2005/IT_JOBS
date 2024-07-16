const { Jobs } = require('../../models/createJob');
const { User } =require('../../models/register')


const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      companyDescription,
      jobOverview,
      responsibilities,
      skills,
      qualifications,
      location,
      employmentType,
      salary,
      workingTime,
      startDate,
      applicationDeadline,
      applyProcess,
      contactNumber,
      email,
      additionalInformation
    } = req.body;
    const AuthorId = req.params.authorId;
    const Author= await User.findOne({_id:AuthorId})
    const firstName=Author.firstName
    const lastName=Author.lastName
    const newJob = new Jobs({
      AuthorId,
      firstName,
      lastName,
      jobTitle,
      companyName,
      companyDescription,
      jobOverview,
      responsibilities,
      skills,
      qualifications,
      location,
      employmentType,
      salary,
      workingTime,
      startDate,
      applicationDeadline,
      applyProcess,
      contactNumber,
      email,
      additionalInformation
    });

    await newJob.save();

    const data = await Jobs.find({});
    console.log(data);

    return res.status(200).json({ msg: 'Successfully created the job' });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ msg: 'Error occurred while creating the job' });
  }
};

module.exports = {createJob};

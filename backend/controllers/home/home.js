const { Jobs } = require('../../models/createJob');
const { User } = require('../../models/register')

function RandomOrder(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        array[i] = array[j]
        array[j] = array[i]
    }
    return array;
}

function shuffledpost(array) {
    shuffled = [...array]
   return RandomOrder(shuffled)
}
const getpost = async (req, res) => {
    const allJobs = await Jobs.find({})
    const orderedJobs=shuffledpost(allJobs)
    return res.status(200).json(orderedJobs)
}


module.exports = { getpost }


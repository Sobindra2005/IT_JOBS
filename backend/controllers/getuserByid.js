const { User } = require('../models/register')


const getUserById = async (req, res) => {
    const id = req.params.id
    const user = await User.find({ _id: id })
    return res.status(200).json(user )
}

module.exports = { getUserById }
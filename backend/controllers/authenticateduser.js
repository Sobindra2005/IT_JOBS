const { User } = require('../models/register')

const authenticatedUserDetails = async (req, res) => {
   try {
   
        const userId = await req.user._id
        const user = await User.findOne({_id:userId})
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(401).json({msg:'unauthorized user '})
    }
}

module.exports = { authenticatedUserDetails }
const { Following } = require('../../models/following')
const { User } = require('../../models/register')

const messageList = async (req, res) => {

    //now fetching the login details but later will fetch  profile setup data 
    try {
        const userId = req.user._id;

        // Fetch following data for the user
        const data = await Following.findOne({ userId });
        if (!data || !data.following) {
            return res.status(404).json({ msg: 'No following data found' });
        }

        // Convert follower IDs to string
        const followersData = data.following.map(followerId => followerId.toString());

        if (followersData.length === 0) {
            return res.json({ msg: 'create to chat' });
        }

        // Fetch follower user details
        const followerList = await User.find({ _id: { $in: followersData } });

        return res.status(200).json(followerList);
    } catch (error) {
        console.error('Error in messageList:', error);
        if (!res.headersSent) {
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
};

module.exports = { messageList }
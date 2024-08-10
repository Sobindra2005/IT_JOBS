const { Following } = require('../../models/following')
const { User } = require('../../models/register')
const { MsgRecord, Message } = require('../../models/message');

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

function generateId(senderId, receiverId) {
    return [senderId, receiverId].sort().join('_');

}
const startOrGetMsg = async (req, res) => {

    try {
        const { senderId, receiverId } = await req.body

        const chatId = await generateId(senderId, receiverId)

        const chatSession = await MsgRecord.find({ chatId })

        if (chatSession.length == 0) {
            newchatSession = new MsgRecord({
                senderId: senderId,
                receiverId: receiverId,
                chatId: chatId,
            })
            await newchatSession.save()

            return res.status(200).json({ chatId, message: [] })
        }
        else {
            await Message.updateMany({chatId:chatId},{$set:{isRead:true}})
            const allMessage = await Message.find({ chatId }).sort({ timestamp: 1 })

            return res.status(200).json({ allMessage, chatId })
        }
    }
    catch (err) {
        return res.json({ err })
    }
}

async function postMsg(req, res) {
    const { senderId, receiverId, chatId, message } = await req.body
    const chatid = await generateId(senderId, receiverId)
    if (chatid != chatId) {
        console.log('unexpected ')
    }
    const newMsg = new Message({
        chatId: chatId,
        senderId: senderId,
        recieverId: receiverId,
        message: message,
    })
    await newMsg.save()
    const allMessage = await Message.find({ chatId }).sort({ timestamp: 1 });
    return res.status(200).json({ allMessage, sucess: true })
}


const latestMsg = async (req, res) => {

    const receiverId=req.params.receiverId
    const chatId = await generateId(req.user._id,receiverId)
    const latestMsg = await Message.find({ chatId: chatId }).sort({ createdAt: -1 }).limit(1)
    return res.status(200).json(latestMsg)
}
module.exports = { messageList, postMsg, startOrGetMsg, latestMsg }

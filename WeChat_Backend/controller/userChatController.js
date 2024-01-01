import { Chat } from "../models/chatModel.js";
import User from "../models/userModel.js";

const getAllUserMsg = async (req, res) => {
    try {
        const { roomId } = req.body;
        const chat = await Chat.findOne({ roomId }).populate('messages');
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat', error: error.message });
    }
};



const getAllUserWithChat = async (req, res) => {
    try {
        const { userId } = req.body;
        const chats = await Chat.find({
            $or: [{ user1: userId }, { user2: userId }],
        });

        const friendIds = []
        chats.forEach(chat => {
            if (chat.user1 !== userId) {
                friendIds.push(chat.user1);
            }
            else {
                friendIds.push(chat.user2)
            }
        });

        const user = await User.find({ _id: { $in: friendIds } })
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export { getAllUserMsg, getAllUserWithChat };
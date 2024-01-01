import mongoose from 'mongoose';


// Define the ChatMessage schema
const chatMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

// Define the Chat schema
const chatSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },

    user1: {
        type: String,
        required: true,
    },
    user2: {
        type: String,
        required: true,
    },

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatMessage',
    }],
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
const Chat = mongoose.model('Chat', chatSchema);

export { ChatMessage, Chat };

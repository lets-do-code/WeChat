import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"; // Import the 'http' module
import { Server as SocketIO } from "socket.io"; // Import the Socket.io Server class
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import userChatRoutes from "./routes/userChatRoute.js";
import { Chat, ChatMessage } from "./models/chatModel.js";
/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* ROUTES */
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", userChatRoutes)

/* Create the HTTP server using Express app */
const server = http.createServer(app);

/* Initialize Socket.io by passing the server instance */
const io = new SocketIO(server);

/* Socket.io connection */
io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Handle incoming messages
    socket.on('chat-message', async ({ roomId, senderId, message, user1, user2 }) => {
        try {
            let chat = await Chat.findOne({ roomId });

            if (!chat) {
                const newChat = new Chat({ roomId, user1, user2, messages: [] });
                chat = await newChat.save();
            }

            const newChatMessage = new ChatMessage({ senderId, message });
            console.log(senderId, message);
            chat.messages.push(newChatMessage);
            await chat.save();
            await newChatMessage.save();

            const savedChatMessage = await newChatMessage.save();

            // Emit the message to all connected clients in the room
            io.emit('chat-message', savedChatMessage);
        } catch (error) {
            console.error('Error saving chat message:', error.message);
        }
    });

    // Additional event handlers can be added here
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));

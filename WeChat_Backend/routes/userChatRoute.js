import express from "express";
import { getAllUserMsg, getAllUserWithChat } from "../controller/userChatController.js"

const router = express.Router();


router.post('/userChat', getAllUserMsg)
router.post('/userWithChat', getAllUserWithChat)


export default router;
import express from 'express';
import { getAllUsers, getUserById } from '../controller/userController.js'

const router = express.Router()


router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:userId', getUserById);

export default router;
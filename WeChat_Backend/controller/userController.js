import User from "../models/userModel.js";




export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId

        const userById = await User.findById(userId);

        if (!userById) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userById);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching', err: err.message });
    }
}


export const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users)

    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching all users', err: err.message });
    }


}
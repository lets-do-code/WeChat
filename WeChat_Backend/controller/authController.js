import User from '../models/userModel.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
//  Login user

export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        console.log(phone, password)

        const existingUser = await User.findOne({ phone });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password', succcess: false });
        }
        const JWT_SECRET = "thisistoosecuretoGuess"
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        delete existingUser.password;
        res.status(200).json({ message: 'User Login SuccessFully', succcess: true, token, id: existingUser._id })
    }
    catch (err) {
        console.log("Error :", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Register a new user

export const register = async (req, res) => {
    try {
        const { name, phone, password } = req.body;


        //check if user is already registered

        const existingUser = await User.findOne({ phone });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }


        // new user created 
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            phone,
            password: passwordHash,
        });

        const savedUser = await newUser.save();

        res.status(200).json({ message: 'User registered successfully', userId: savedUser._id });
    }
    catch (err) {
        console.log("Error :", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


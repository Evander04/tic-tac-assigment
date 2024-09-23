//import model
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Register new user (signup)
const registerUser = async (req, res) => {
    //get email for query
    const { email } = req.body;

    try {
        // Check if the user already exists
        console.log("=====> checking if user exist");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        console.log("====> creating new user");
        // Create a new user
        const user = new User(req.body);
        console.log(user);
        const savedUser = await User.create(user);

        // Return the JWT token
        const token = generateToken(user._id);
        res.status(201).json({ 
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            token:`Bearer ${token}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches
        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }

        // Return the JWT token
        const token = generateToken(user._id);
        res.status(200).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            token 
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};


//WS
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {            
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
};


//Export Methods
module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    loginUser
};

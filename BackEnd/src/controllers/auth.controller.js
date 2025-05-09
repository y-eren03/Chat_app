import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).send({error: "All fields are required"});
        }
        //hash password
        if (password.length < 8) {
            return res.status(400).json({error: "Password must be between 8  characters"});
        }


        const user = await User.findOne({email})

        if (user) return res.status(400).json({error: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({fullName, email, password: hashPassword});

        if (newUser) {
            generateToken(newUser.id, res);
            await newUser.save();

            //res.status(201).json({success: true, message: "User successfully saved"});
            res.status(200).json({
                _id: newUser._id,
                full_name: newUser.full_name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({error: "Invaild user data!"});
        }

    } catch (error) {
        console.log("Error in signup controller!", error.message);
        res.status(500).json({error: "Internal server error"});

    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Invalid argumants"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid argumants"});
        }
        generateToken(user._id, res)

        res.status(200).json({
            _id: newUser._id,
            full_name: newUser.full_name,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });


    } catch (error) {
        console.log("Error in login controller!", error.message);
        res.status(500).json({error: "Internal server error"});

    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "");
        res.status(200).json({message: "Logged out"});
    } catch (error) {
        console.log("Error logout contorller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const updateProfile = async (req, res) => {
    try {
        const{profilePic} = req.body;
        const userId = req.user._id
        if (!profilePic) {
            return res.status(400).json({error: "Profile picture is required"});
        }

        const uploadResponse =await cloudinary.updloader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url},{new: true})

        res.status(200).json(updatedUser);

    }catch (error) {
        console.log("Error in profile picture",error);
        res.status(500).json({error: "Internal server error"});

    }
};

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({user: req.user});
    }catch (error) {
        console.log("Error in Check Auth controller!", error.message);
        res.status(500).json({error: "Internal server error"});

    }
}
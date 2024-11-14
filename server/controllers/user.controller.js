import bcrypt from "bcryptjs"; 
import User from "../models/user_model.js";
import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new AppError("All fields are required", 400));
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return next(new AppError("Email already exists", 400));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save to the database
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // If user creation fails, throw an error
        if (!user) {
            return next(new AppError("User registration failed, please try again", 400));
        }
        
        // Respond with success message and the user data (optional)
        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and password are required", 400));
    }
    try {
        // Use User model to find the user
        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError("Invalid credentials", 401));
        }

        // Check if the password matches
        console.log("Password to compare:", password);
        console.log("User's hashed password:", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new AppError("Invalid credentials", 401));
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });

        res.status(200).json({
            message: "Login Successful",
            token,
        });
    } catch (err) {
        console.error(err); 
        next(err);
    }
};

export { register, login };

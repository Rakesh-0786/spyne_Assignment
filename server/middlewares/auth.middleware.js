import jwt from "jsonwebtoken";
import AppError from "../utils/error.util.js";

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not authorized to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach userId to request
        next();
    } catch (err) {
        return next(new AppError("Not authorized to access this route", 401));
    }
};

export default protect;

import Car from "../models/car.model.js";
import AppError from "../utils/error.util.js";

// Add a new car
const addCar = async (req, res, next) => {
    const { title, description, tags } = req.body;
    const imageFiles = req.files;

    // Convert image files to an array of URLs or paths
    const images = imageFiles ? imageFiles.map(file => file.path) : [];

    try {
        const newCar = await Car.create({
            title,
            description,
            images,
            tags,
            // user: req.user._id, // Uncomment if associating cars with users
        });
        res.status(201).json({ message: "Car added successfully", car: newCar });
    } catch (err) {
        console.log("Error adding car:", err);
        next(err);
    }
};

// Get all cars
const getCars = async (req, res, next) => {
    try {
        const cars = await Car.find();
        res.status(200).json({ cars });
    } catch (err) {
        next(err);
    }
};

// Get a car by ID
const getCarById = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return next(new AppError("Car not found", 404));
        res.status(200).json({ car });
    } catch (err) {
        next(err);
    }
};

// Update car by ID
const updateCar = async (req, res, next) => {
    const { title, description, tags } = req.body;
    const imageFiles = req.files;
    
    // Convert image files to an array of URLs or paths if new images are uploaded
    const images = imageFiles ? imageFiles.map(file => file.path) : undefined;

    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { title, description, tags, ...(images && { images }) },
            { new: true, runValidators: true }
        );
        if (!car) return next(new AppError("Car not found", 404));
        res.status(200).json({ message: "Car updated successfully", car });
    } catch (err) {
        next(err);
    }
};

// Delete a car by ID
const deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return next(new AppError("Car not found", 404));
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
        next(err);
    }
};

export {
    addCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
};

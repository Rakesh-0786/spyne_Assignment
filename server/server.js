import express from "express";
import connectionToDB from "./Config/dbConfig.js";
import userRoute from "./routes/user.routes.js";
import carRoute from "./routes/car.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import dotenv from "dotenv";
import cors from "cors";  // Import CORS middleware

const app = express();
const PORT = 4000;

dotenv.config();

// CORS setup: Allow requests from your frontend (e.g., localhost:3000 for development)
const corsOptions = {
  origin: "http://localhost:5173",  // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true,  // Allow cookies or credentials
};

// Use CORS before any routes
app.use(cors(corsOptions));  // Enable CORS middleware

app.use(express.json());  // For parsing application/json

// Your routes
app.use("/api/docs/users", userRoute);
app.use("/api/docs/cars", carRoute);

// Global error handler
app.use(errorMiddleware);

// Connect to database
connectionToDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

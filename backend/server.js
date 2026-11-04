
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);
// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Job & Internship Portal Backend is Running!",
    });
});

// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();

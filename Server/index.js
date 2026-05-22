const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const uploadRoutes = require("./Routes/upload");
const authRoutes = require("./Routes/auth");
const eventRoutes = require("./Routes/event");
const bookingRoutes = require("./Routes/booking");
const noteRoutes = require("./Routes/internalNote");
const aiRoutes = require("./Routes/ai");

const errorHandler = require("./Middleware/errorMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ankit-eventora-frontend.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Error handler
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });
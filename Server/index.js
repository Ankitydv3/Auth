const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./Routes/auth');
const eventRoutes = require('./Routes/event');
const bookingRoutes = require('./Routes/booking');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/booking', bookingRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Team Task Manager API running');
});

// Database connection
if (!process.env.MONGO_URI) {
    console.log("MONGO_URI missing");
}
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
})
.catch((err) => {
    console.log("Database error:", err);
});
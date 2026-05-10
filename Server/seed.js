const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./Models/User');
const Event = require('./Models/Event');
const Booking = require('./Models/Booking');

dotenv.config();

// 👤 Users
const users = [
  { name: 'Ankit Yadav', email: 'ankit@test.com', password: "password123", role: 'admin', isVerified: true },
  { name: 'Rahul Sharma', email: 'rahul@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Priya Singh', email: 'priya@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Aman Verma', email: 'aman@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Neha Gupta', email: 'neha@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Rohit Kumar', email: 'rohit@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Sneha Patel', email: 'sneha@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Vikas Yadav', email: 'vikas@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Pooja Mehta', email: 'pooja@test.com', password: "password123", role: 'user', isVerified: true },
  { name: 'Karan Malhotra', email: 'karan@test.com', password: "password123", role: 'user', isVerified: true }
];

// 🎉 Events (fixed with all required fields)
const events = [
  {
    title: "Sunburn Music Festival",
    description: "India's biggest EDM and DJ night experience.",
    date: new Date(),
    location: "Goa",
    totalSeats: 500,
    availableSeats: 500,
    ticketPrice: 2500,
    category: "Music",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
  },

  {
    title: "Comedy Night Live",
    description: "Stand-up comedy show with top comedians.",
    date: new Date(),
    location: "Delhi",
    totalSeats: 120,
    availableSeats: 120,
    ticketPrice: 799,
    category: "Comedy",
    imageUrl: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b"
  },

  {
    title: "Gaming Championship",
    description: "Compete in BGMI, Valorant and FIFA tournaments.",
    date: new Date(),
    location: "Gurgaon",
    totalSeats: 200,
    availableSeats: 200,
    ticketPrice: 999,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
  },

  {
    title: "Food Carnival",
    description: "Taste delicious street food and desserts.",
    date: new Date(),
    location: "Noida",
    totalSeats: 300,
    availableSeats: 300,
    ticketPrice: 199,
    category: "Food",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  },

  {
    title: "Bollywood Dance Party",
    description: "Dance all night with Bollywood DJs and lights.",
    date: new Date(),
    location: "Mumbai",
    totalSeats: 400,
    availableSeats: 400,
    ticketPrice: 1499,
    category: "Dance",
    imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4"
  },

  {
    title: "Tech Startup Expo",
    description: "Meet startup founders and investors.",
    date: new Date(),
    location: "Bangalore",
    totalSeats: 250,
    availableSeats: 250,
    ticketPrice: 1200,
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },

  {
    title: "Adventure Trek Camp",
    description: "Mountain trekking and camping experience.",
    date: new Date(),
    location: "Manali",
    totalSeats: 60,
    availableSeats: 60,
    ticketPrice: 3500,
    category: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },

  {
    title: "Luxury Car Show",
    description: "Explore supercars and sports cars exhibition.",
    date: new Date(),
    location: "Chandigarh",
    totalSeats: 150,
    availableSeats: 150,
    ticketPrice: 600,
    category: "Automobile",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
  },

  {
    title: "Fashion Week",
    description: "Designer fashion showcase and celebrity appearance.",
    date: new Date(),
    location: "Jaipur",
    totalSeats: 180,
    availableSeats: 180,
    ticketPrice: 2200,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
  },

  {
    title: "Beach New Year Party",
    description: "Celebrate New Year with live music and fireworks.",
    date: new Date(),
    location: "Pondicherry",
    totalSeats: 600,
    availableSeats: 600,
    ticketPrice: 4999,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  }
];

// 🌱 Seed Function
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // clear old data
    await User.deleteMany();
    await Event.deleteMany();
    await Booking.deleteMany();

    // insert users
    const createdUsers = await User.insertMany(users);

    // assign admin as creator
    const adminId = createdUsers[0]._id;

    const updatedEvents = events.map(event => ({
      ...event,
      createdBy: adminId
    }));

    // insert events
    await Event.insertMany(updatedEvents);

    console.log("✅ Users & Events seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

// run seed
seedData();
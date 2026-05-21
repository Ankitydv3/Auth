const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./Models/User");
const Event = require("./Models/Event");
const Booking = require("./Models/Booking");

dotenv.config();

// Users
const users = [
  {
    name: "Ankit Yadav",
    email: "Ankitydvpvt@gmail.com",
    password: "123456",
    role: "admin",
    isVerified: true,
  },
  {
    name: "Rahul Sharma",
    email: "rahul@test.com",
    password: "123456",
    role: "user",
    isVerified: true,
  },
  {
    name: "Priya Singh",
    email: "priya@test.com",
    password: "123456",
    role: "user",
    isVerified: true,
  },
];

// Events
const events = [
  {
    title: "Neon Glow Party",
    description: "Dance under neon lights with DJs and unlimited fun.",
    date: new Date(),
    location: "Goa",
    totalSeats: 500,
    availableSeats: 500,
    ticketPrice: 2500,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
  },

  {
    title: "Weekend Club Night",
    description: "Live DJ performance with energetic dance vibes.",
    date: new Date(),
    location: "Delhi",
    totalSeats: 120,
    availableSeats: 120,
    ticketPrice: 799,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b"
  },

  {
    title: "Gaming After Party",
    description: "Celebrate with gaming lovers, music and fun challenges.",
    date: new Date(),
    location: "Gurgaon",
    totalSeats: 200,
    availableSeats: 200,
    ticketPrice: 999,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
  },

  {
    title: "Food & Music Night",
    description: "Party with delicious food, live music and dance.",
    date: new Date(),
    location: "Noida",
    totalSeats: 300,
    availableSeats: 300,
    ticketPrice: 199,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  },

  {
    title: "Bollywood Night Bash",
    description: "Dance all night with Bollywood hits and DJs.",
    date: new Date(),
    location: "Mumbai",
    totalSeats: 400,
    availableSeats: 400,
    ticketPrice: 1499,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4"
  },

  {
    title: "Rooftop Party Fest",
    description: "Enjoy city skyline views with live DJs and drinks.",
    date: new Date(),
    location: "Bangalore",
    totalSeats: 250,
    availableSeats: 250,
    ticketPrice: 1200,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },

  {
    title: "Mountain Camp Party",
    description: "Bonfire, music and camping under the stars.",
    date: new Date(),
    location: "Manali",
    totalSeats: 60,
    availableSeats: 60,
    ticketPrice: 3500,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },

  {
    title: "Supercar Party Show",
    description: "Luxury cars, music and nightlife experience.",
    date: new Date(),
    location: "Chandigarh",
    totalSeats: 150,
    availableSeats: 150,
    ticketPrice: 600,
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
  },

  {
    title: "Celebrity Fashion Party",
    description: "Fashion show mixed with music and celebrity appearances.",
    date: new Date(),
    location: "Jaipur",
    totalSeats: 180,
    availableSeats: 180,
    ticketPrice: 2200,
    category: "Party",
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

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Clear old data
    await User.deleteMany();
    await Event.deleteMany();
    await Booking.deleteMany();

    // Hash passwords
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert users
    const createdUsers = await User.insertMany(
      usersWithHashedPasswords
    );

    const adminId = createdUsers[0]._id;

    // Assign admin as creator
    const updatedEvents = events.map((event) => ({
      ...event,
      createdBy: adminId,
    }));

    // Insert events
    await Event.insertMany(updatedEvents);


    process.exit();

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedData();
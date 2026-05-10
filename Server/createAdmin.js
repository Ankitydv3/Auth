// createAdmin.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./Models/User");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(
      "Admin123",
      10
    );

    const admin = await User.create({
      name: "Ankit Yadav",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    console.log("Admin created:", admin.email);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
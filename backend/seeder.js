const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await Service.deleteMany();
    await User.deleteMany();

    // Create a dummy provider
    const salt = await require('bcryptjs').genSalt(10);
    const hashedPassword = await require('bcryptjs').hash('password123', salt);

    const provider = await User.create({
      name: 'John Doe',
      email: 'provider@example.com',
      password: hashedPassword,
      role: 'provider',
      location: 'New York',
      phone: '1234567890'
    });

    // Create dummy services
    const services = [
      {
        providerId: provider._id,
        serviceName: 'House Plumbing',
        category: 'Plumber',
        description: 'Professional plumbing services for your home. Leak fixing, pipe installation, and more.',
        price: 500,
        location: 'New York'
      },
      {
        providerId: provider._id,
        serviceName: 'Electrical Repair',
        category: 'Electrician',
        description: 'Complete electrical checkup and repair. High-quality work guaranteed.',
        price: 800,
        location: 'New York'
      },
      {
        providerId: provider._id,
        serviceName: 'Math Tutoring',
        category: 'Tutor',
        description: 'Experienced math tutor for high school and college students.',
        price: 300,
        location: 'Online'
      }
    ];

    await Service.insertMany(services);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();

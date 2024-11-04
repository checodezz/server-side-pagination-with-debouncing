const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const connectDB = require("./db/db.connect")
const User = require("./model/user.model")

const seedUsers = async (numUsers) => {
  try {
    await connectDB(); 

    const users = Array.from({ length: numUsers }).map(() => ({
      username: faker.internet.username(),
      email: faker.internet.email(),
    }));
    await User.insertMany(users); 
    console.log(`${numUsers} users created successfully!`);
  } catch (error) {
    console.error("Error seeding users:", error.message);
  } finally {
    mongoose.connection.close(); 
  }
};
seedUsers(2000); 
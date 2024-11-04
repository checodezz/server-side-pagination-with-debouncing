const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        // await mongoose.connect("mongodb+srv://neoGStudent:neoGStudent@neog.nxppkiu.mongodb.net/randomusers?retryWrites=true&w=majority&appName=neoG");

        await mongoose.connect("mongodb+srv://neoGStudent:neoGStudent@neog.nxppkiu.mongodb.net/")
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;


//mongodb+srv://neoGStudent:neoGStudent@neog.nxppkiu.mongodb.net/randomusers?retryWrites=true&w=majority&appName=neoG
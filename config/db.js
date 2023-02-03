const mongoose = require('mongoose');

const connectDB = async() => {
    mongoose.set('strictQuery',false);
    await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology : true,
    });

    console.log("MongoDB connected")
}

module.exports = connectDB;
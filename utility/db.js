const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net/recipieDb"
    );
    return isConnected;
  } catch (e) {
    return e;
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to mongo succesfully");
  } catch (error) {
    console.log("Couldnt connect", error);
  }
};

module.exports = connectToMongo;

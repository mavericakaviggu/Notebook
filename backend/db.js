const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
const mongoURI = "mongodb://127.0.0.1:27017/notebook";
// const client = new MongoClient(mongoURI);

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to mongo succesfully");
  } catch (error) {
    console.error("Couldnt connect vignesh shet", error);
  }
};

module.exports = connectToMongo;

// async function connectToMongo() {
//   let result = await client.connect();
//   let db = result.db("sample");
//   let collection = db.collection("trial");
//   console.log("Connected");
// }
// export default connectToMongo;

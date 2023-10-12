//Mongoose is an Object data Modelling(ODM) library for MongoDB.
const mongoose = require("mongoose");
//extracting "Schema" object from mongoose library.
const { Schema } = mongoose;

//"NotesSchema" is used as a blueprint for doucment in the collection.
const NotesSchema = new Schema({
  user: {
    //"user" is defined as a reference to another "user" collection, and it's expected to be an ObjectId.
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    //Fetches current date as default date.
    default: Date.now,
  },
});

//Creating and exporting a Mongoose model for a collection named "notes."
//In mongoDB, a collection is similar to a table in a relational DB
module.exports = mongoose.model("notes", NotesSchema);

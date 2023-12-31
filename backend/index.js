const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
// const mongoose = require("mongoose");

connectToMongo();

// mongoose.connect("mongodb://localhost:27017/local");

const app = express();
const port = 5000;

app.use(cors())
//Helps in viewing json fies through thunderstorm clinet(postman)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/signin", (req, res) => {
//     res.send("Hello sign in!");
//   });

//   app.get("/login", (req, res) => {
//     res.send("Hello login!");
//   });

app.listen(port, () => {
  console.log(`Notebook backend listening on port http://localhost:${port}`);
});

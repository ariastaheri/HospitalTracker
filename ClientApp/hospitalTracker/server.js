const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userRouter = require("./routes/userRoute");
const visitRouter = require("./routes/visitRoute");
const patientRouter = require("./routes/patientRoute");
const path = require("path");
require("dotenv").config();

const app = express();

const mongo_uri = process.env.MONGO_URI;

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyparser.json());

// static file

// api routes
app.use("/api/user", userRouter);
app.use("/api/patient", patientRouter);
app.use("/api/visit", visitRouter);

//mongo DB connection

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.use("/*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
} else {
  app.use(express.static(path.join(__dirname, "public")));
}

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

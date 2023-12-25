const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./db");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", require("./Routes/idCard"));

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  // Database connection
  await connectDB();
  console.log(`Server running on port ${port}`);
});

import Dotenv from "dotenv";
Dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// ^^^ Note to come back and plug in the correct settings for cors before I deploy soley

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`GoodTimes app is running on port ${PORT}`);
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connected) =>
    console.log(`Mongodb Connected on ${connected.connection.db.databaseName}`)
  )
  .catch((err) => console.log(`${err} did not connect`));

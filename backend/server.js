import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectToDB } from "./lib/connectToDB.js";
import { Object } from "./models/object.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDB();

app.get("/", (req, res) => {
  res.send("{ message: 'Hello Sitemate' }");
});

// Create a new object
app.post("/object", async (req, res) => {
  const { id, title, description } = req.body;
  const Object = mongoose.model("Object");
  const object = new Object({
    id,
    title,
    description,
  });
  try {
    await object.save();
    res.status(201).send(object);
  } catch (error) {
    res.status(500).send(error);
  }
});

// always at the end
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

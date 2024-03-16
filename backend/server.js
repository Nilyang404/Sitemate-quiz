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
    console.log("Object created:");
    console.log(object);
    res.status(201).send(object);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get objects

app.get("/objects", async (req, res) => {
  try {
    const objects = await Object.find();
    if (!objects) {
      res.status(404).send("Objects not found");
    } else {
      res.status(200).json({ objects: objects });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// get object by _id
app.get("/object/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const object = await Object.findById(_id);
    if (!object) {
      res.status(404).send("Object not found");
    } else {
      res.status(200).json(object);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// update by _id
app.put("/object/:_id", async (req, res) => {
  const { _id } = req.params;
  const { id, title, description } = req.body;
  try {
    const object = await Object.findByIdAndUpdate(
      _id,
      { id, title, description },
      { new: true }
    );
    if (!object) {
      res.status(404).send("Object not found");
    }
    console.log("Object updated");
    console.log(object);
    res.status(200).json(object);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete by _id
app.delete("/object/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const object = await Object.findByIdAndDelete(_id);
    if (!object) {
      res.status(404).send("Object not found");
    }
    console.log("Object deleted:");
    console.log(object);
    res.status(200).json(object);
  } catch (error) {
    res.status(500).send(error);
  }
});

// always at the end
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

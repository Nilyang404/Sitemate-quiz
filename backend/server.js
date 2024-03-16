import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("{ message: 'Hello World' }");
});

// always at the end
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

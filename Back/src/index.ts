import cors from "cors";
import express from "express";
import { getAllHobbies } from "./MongoDb/Hobbies/Actions";
import { getPostByType } from "./MongoDb/Posts/Actions";
import { addUser, getUser } from "./MongoDb/Users/Actions";

const app = express();
const port = 4000;
app.use(cors());

// Hobbies
app.get("/hobbies/getAll", async (req, res) => {
  const hobbies = await getAllHobbies();
  res.json("ok");
  res.send(hobbies);
});

// Posts
app.get("/posts/byTag/:tag", async (req, res) => {
  const type = req.body('tag');
  const posts = await getPostByType(type);
  res.json("ok");
  res.send(posts);
});

// Users
app.post("/users/add:user", async (req, res) => {
  const user = req.body('user');
  const result = await addUser(user);
  res.json("added");
  res.send(result);
});

app.get("/users/get:email", async (req, res) => {
  const email = req.body('email');
  const user = await getUser(email);
  res.json("ok");
  res.send(user);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/add-user", (req, res) => {
  console.log(req.body);
  res.json("OK");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

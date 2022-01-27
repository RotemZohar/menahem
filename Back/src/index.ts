import cors from "cors";
import express from "express";
import { getAllHobbies } from "./MongoDb/Hobbies/Actions";
import { getPostByTag } from "./MongoDb/Posts/Actions";
import { addUser, getUser } from "./MongoDb/Users/Actions";

const app = express();
const port = 4000;
app.use(cors());

// Hobbies
app.get("/hobbies/getAll", async (req, res) => {
  const hobbies = await getAllHobbies();
  res.send(hobbies);
});

// Posts
app.get("/posts/byTag/:tag", async (req, res) => {
  const posts = await getPostByTag(req.params.tag);
  if (posts) {
  res.send(posts);
  } else {
    res.json("no values for this tag");
  }
});

// Users
app.post("/users/add", async (req, res) => {
  const user = req.body;
  console.log(user);
  const result = await addUser(user);
  res.send(result);
});

app.get("/users/get:email", async (req, res) => {
  const user = await getUser(req.params.email);
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

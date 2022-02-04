import cors from "cors";
import express from "express";
import { getAllHobbies, getHobbie } from "./MongoDb/Hobbies/Actions";
import { getPostByTag } from "./MongoDb/Posts/Actions";
import { addUser, getUser } from "./MongoDb/Users/Actions";

const app = express();
const port = 4000;
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Hobbies
app.get("/hobbies/getAll", async (req, res) => {
  const hobbies = await getAllHobbies();
  res.send(hobbies);
});

app.get("/hobbies/:id", async (req, res) => {
  const hobbie = await getHobbie(req.params.id);
  res.send(hobbie);
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
  const result = await addUser(user);
  if (result) {
    res.send(user.email);
  } else {
    res.send("adding failed");
  }
});

app.get("/users/get:email", async (req, res) => {
  const user = await getUser(req.params.email);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

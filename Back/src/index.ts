import cors from "cors";
import express from "express";
import { ObjectId } from "mongodb";
import { getAllHobbies, getHobbie } from "./MongoDb/Hobbies/Actions";
import {
  getPostByTag,
  addPost,
  editPost,
  deletePost,
  getAllPosts,
} from "./MongoDb/Posts/Actions";
import { addUser, getUser, editUserPassword } from "./MongoDb/Users/Actions";

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
app.get("/posts/getAll", async (req, res) => {
  const posts = await getAllPosts();
  res.send(posts);
});

app.get("/posts/byTag/:tag", async (req, res) => {
  const posts = await getPostByTag(req.params.tag);
  if (posts) {
    res.send(posts);
  } else {
    res.json("no values for this tag");
  }
});

app.post("/posts/add", async (req, res) => {
  const post = req.body;
  const result = await addPost(post);
  if (result) {
    res.send(result);
  } else {
    res.send("Addition failed");
  }
});

app.put("/posts/:id", async (req, res) => {
  const post = req.body;
  const result = await editPost(new ObjectId(req.params.id), post);
  if (result) {
    res.send(result);
  } else {
    res.send("Editing failed");
  }
});

app.delete("/posts/:id", async (req, res) => {
  const result = await deletePost(new ObjectId(req.params.id));
  if (result) {
    res.send("Deletion succeeded");
  } else {
    res.send("Deletion failed");
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

app.get("/users/get/:email", async (req, res) => {
  const user = await getUser(req.params.email);
  res.send(user);
});

app.put("/users/changePass/:id", async (req, res) => {
  const { password } = req.body;
  const result = await editUserPassword(new ObjectId(req.params.id), password);
  if (result) {
    res.send(result);
  } else {
    res.send("An error occured");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

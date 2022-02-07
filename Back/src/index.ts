import cors from "cors";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import { getAllHobbies, getHobby } from "./MongoDb/Hobbies/Actions";
import { menahemDbName, dbUserName, dbPassword } from "./MongoDb/consts";
import {
  getPostByTag,
  addPost,
  editPost,
  deletePost,
} from "./MongoDb/Posts/Actions";
import {
  addUser,
  getUser,
  editUserPassword,
  validateUser,
} from "./MongoDb/Users/Actions";

const uri = `mongodb+srv://${dbUserName}:${dbPassword}@menahem.jjn8m.mongodb.net/${menahemDbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const connectClient = async (mongoClient: MongoClient) => {
  await mongoClient.connect();
};

connectClient(client);

const app = express();
const port = 4000;
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Hobbies
app.get("/hobbies/getAll", async (req, res) => {
  const hobbies = await getAllHobbies(client);
  res.send(hobbies);
});

app.get("/hobbies/:id", async (req, res) => {
  const hobby = await getHobby(client, req.params.id);
  res.send(hobby);
});

// Posts
app.get("/posts/byTag/:tag", async (req, res) => {
  const posts = await getPostByTag(client, req.params.tag);
  if (posts) {
    res.send(posts);
  } else {
    res.json("no values for this tag");
  }
});

app.post("/posts/add", async (req, res) => {
  const post = req.body;
  const result = await addPost(client, post);
  if (result) {
    res.send(result);
  } else {
    res.send("Addition failed");
  }
});

app.put("/posts/:id", async (req, res) => {
  const post = req.body;
  const result = await editPost(client, new ObjectId(req.params.id), post);
  if (result) {
    res.send(result);
  } else {
    res.send("Editing failed");
  }
});

app.delete("/posts/:id", async (req, res) => {
  const result = await deletePost(client, new ObjectId(req.params.id));
  if (result) {
    res.send("Deletion succeeded");
  } else {
    res.send("Deletion failed");
  }
});

// Users
app.post("/users/add", async (req, res) => {
  const user = req.body;
  const result = await addUser(client, user);
  if (result) {
    res.send(user.email);
  } else {
    res.send("adding failed");
  }
});

app.get("/users/get/:email", async (req, res) => {
  const user = await getUser(client, req.params.email);
  res.send(user);
});

app.get("/users/validateUser", async (req, res) => {
  const userDetails = req.query.user;

  const user = await validateUser(client, userDetails);
  res.send(user);
});

app.put("/users/changePass/:id", async (req, res) => {
  const { password } = req.body;
  const result = await editUserPassword(
    client,
    new ObjectId(req.params.id),
    password
  );
  if (result) {
    res.send(result);
  } else {
    res.send("An error occured");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

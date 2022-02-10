import cors from "cors";
import http from "http";
import express from "express";
import socketIo, { Socket as BaseSocket } from "socket.io";
import { MongoClient, ObjectId } from "mongodb";
import { getAllHobbies, getHobby } from "./MongoDb/Hobbies/Actions";
import { menahemDbName, dbUserName, dbPassword } from "./MongoDb/consts";
import {
  getPostByTag,
  addPost,
  editPost,
  deletePost,
  getAllPosts,
} from "./MongoDb/Posts/Actions";
import {
  addUser,
  getUser,
  updateUserDetails,
  validateUser,
  getAllUsers,
  setUserConnected,
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
app.get("/hobbies/getAll", async (req, res, next) => {
  try {
    const hobbies = await getAllHobbies(client);
    res.send(hobbies);
  } catch (e) {
    next(e);
  }
});

app.get("/hobbies/:id", async (req, res, next) => {
  try {
    const hobby = await getHobby(client, req.params.id);
    res.send(hobby);
  } catch (e) {
    next(e);
  }
});

// Posts
app.get("/posts/getAll", async (req, res, next) => {
  try {
    const posts = await getAllPosts(client);
    res.send(posts);
  } catch (e) {
    next(e);
  }
});

app.get("/posts/byTag/:tag", async (req, res, next) => {
  try {
    const posts = await getPostByTag(client, req.params.tag);
    res.send(posts);
  } catch (e) {
    next(e);
  }
});

app.post("/posts/add", async (req, res, next) => {
  try {
    const post = req.body;
    const result = await addPost(client, post);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.put("/posts/:id", async (req, res, next) => {
  try {
    const post = req.body;
    const result = await editPost(client, new ObjectId(req.params.id), post);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.delete("/posts/:id", async (req, res, next) => {
  try {
    const result = await deletePost(client, new ObjectId(req.params.id));
    res.send(result);
  } catch (e) {
    next(e);
  }
});

// Users
app.post("/users/add", async (req, res, next) => {
  try {
    const user = req.body;
    const result = await addUser(client, user);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.get("/users/get/:email", async (req, res, next) => {
  try {
    const user = await getUser(client, req.params.email);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

app.get("/users/validateUser", async (req, res, next) => {
  try {
    const userDetails = req.query.user;
    const user = await validateUser(client, userDetails);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

app.put("/users/updateDetails/:id", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const result = await updateUserDetails(
      client,
      new ObjectId(req.params.id),
      name,
      password
    );
    res.send(result);
  } catch (e) {
    next(e);
  }
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// socket.io

const io = new socketIo.Server(server, {
  cors: { origin: "*" },
});

interface Socket extends BaseSocket {
  email: string;
}

io.on("connection", (param) => {
  const socket = param as Socket;

  socket.on("sign-in", async (email) => {
    socket.email = email;
    await setUserConnected(client, email);
  });

  socket.on("sign-out", async () => {
    if (socket.email) {
      await setUserConnected(client, socket.email, false);
    }
  });

  socket.on("disconnect", async () => {
    if (socket.email) {
      await setUserConnected(client, socket.email, false);
    }
  });
});

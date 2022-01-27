import express from "express";
import { getAllHobbies } from "./MongoDb/Hobbies/Actions";
import { getPostByType } from "./MongoDb/Posts/Actions";
import { addUser, getUser } from "./MongoDb/Users/Actions";

const app = express();
const port = 4000;

// Hobbies
app.get("/getAllHobbies", async (req, res) => {
  const hobbies = await getAllHobbies();
  res.json("ok");
  res.send(hobbies);
});

// Posts
app.get("/getPostsByType", async (req, res) => {
  const type = req.body('tag');
  const posts = await getPostByType(type);
  res.json("ok");
  res.send(posts);
});

// Users
app.post("/addUser", async (req, res) => {
  const user = req.body();
  const result = await addUser(user);
  res.json("added");
  res.send(result);
});

app.get("/getUser", async (req, res) => {
  const email = req.body('email');
  const user = await getUser(email);
  res.json("ok");
  res.send(user);
});

//  addnewUser();

// async function mainDb() {

//   const hobbies = await getAllHobbies();
//   console.log(hobbies);

//   if(!hobbies) {
//     console.log("no hobbies have been returned");
//   }
// }

// mainDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

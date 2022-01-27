import express from "express";
import { getAllHobbies } from "./MongoDb/Hobbies/Actions";

const app = express();
const port = 4000;

app.get("/getAllHobbies", async (req, res) => {
  const hobbies = await getAllHobbies();
  res.send(hobbies);
  res.json("ok");
})

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

import express from "express";
import { getAllHobbies } from "./MongoDb/Hobbies/Actions";

const app = express();
const port = 3000;

app.get("/getAllHobbies", (req, res) => {
  res.send(getAllHobbies());
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

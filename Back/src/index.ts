import cors from "cors";
import express from "express";

const app = express();
const port = 4000;
app.use(cors());

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

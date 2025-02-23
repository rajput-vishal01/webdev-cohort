const express = require("express");
const morgan = require("morgan");
const userModel = require("./models/user.model.js");
const connection = require("./config/db.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/data", (req, res) => {
  console.log(req.query);

  res.send("data recieved");
});

app.get("/reg", async (req, res) => {
  res.render("register");
});

app.post("/reg", async (req, res) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  const newUser = await userModel.create({
    username,
    email,
    password,
  });

  res.send(newUser);
});

app.get("/data", async (req, res) => {
  const user = await userModel.find();
  res.send(user);
});

app.get("/update", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "a",
    },
    {
      email: "c@c",
    }
  );
  res.send("updated");
});

app.get("/delete", async (req, res) => {
  await userModel.findOneAndDelete({
    username: "a",
  });
  res.send("deleted");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

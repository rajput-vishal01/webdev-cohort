const express = require("express");
const userRouter = require("./routes/user.routes");
const connecToDB = require("./config/db");
const cookieParser=require('cookie-parser');
const indexRouter = require("./routes/index.routes");
require('dotenv').config();

connecToDB();
const app = express();

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

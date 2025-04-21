import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB error: ${err}`);
  });

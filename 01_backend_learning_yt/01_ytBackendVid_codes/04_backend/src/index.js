// require("dotenv").config({ path: "./env" }); //consistency issue
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// also add -r dotenv/config --experimental-json-modules in package.json
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    try {
      app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on the port ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(`Unable to Load the Server`,error);
      
    }
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
    
  });

/*
//First approch to connect DB

// Immediately Invoked Function Expression (IIFE)(( )=>{})()
//; is added for cleaning
//This approch is good but it pollutes the index file alot
const app = express()
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log("App is listening on port", process.env.PORT);
    });
  } catch (error) {
    console.log(("ERROR :", error));
    throw error;
  }
})();
*/

/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/

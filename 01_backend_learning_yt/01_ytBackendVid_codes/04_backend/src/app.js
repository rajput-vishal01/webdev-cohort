import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Enables CORS with allowed origin and credentials
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Parses incoming JSON requests with a 16kb size limit
app.use(express.json({ limit: "16kb" }));

// Parses URL-encoded data with a 16kb size limit
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serves static files from the 'public' directory
app.use(express.static("public"));

// Parses cookies in incoming requests
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes.js";

//routes declaration

app.use("/api/v1/users", userRouter);
// https://localhost:8000/api/vi/users/register
//login bhi yahi hai aa skta hai ab 
// i.e https://localhost:8000/api/vi/users/login

export { app };

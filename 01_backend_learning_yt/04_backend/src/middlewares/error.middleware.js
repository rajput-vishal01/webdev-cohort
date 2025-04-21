import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode;
  let message;
  let errors;

  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors; 
  } else {
    // Handle Mongoose validation errors
    if (err instanceof mongoose.Error.ValidationError) {
      statusCode = 400;
      message = err.message;
      errors = Object.values(err.errors).map((e) => e.message);
    } else if (err instanceof mongoose.Error) {
      statusCode = 400;
      message = err.message;
    } else {
      statusCode = 500;
      message = "Something went wrong";
    }
  }

  // Construct the response object explicitly
  const response = {
    statusCode,
    message,
    errors: errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  return res.status(statusCode).json(response);
};

export { errorHandler };

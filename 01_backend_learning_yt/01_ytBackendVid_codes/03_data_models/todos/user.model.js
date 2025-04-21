import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // //this is also correct
    // username : String,
    // email: String,
    // isActive : Boolean

    //This is correct way
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  //its out of the main object and provides two fields created at and updated at
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);

//after connecting the model with the mongoDB the /"User" will become users
//standard practice of mongoDB to conver the name in lowercase and plural form

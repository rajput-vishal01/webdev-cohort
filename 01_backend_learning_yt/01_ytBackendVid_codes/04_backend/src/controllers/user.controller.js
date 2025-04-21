import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get details from frontend
  //validation - not empty
  //check if user already exists =username and mail
  //check for images, check for avatar
  //upload them to cloudinary,check for avatar as well
  //create user object -create entry in db
  //remove password ad refresh token field from response
  //check for user creation
  //return response else error

  //req.body sai saari user details mil jaati hai ir form ,json sai but url ka nahi milta
  const { fullname, email, username, password } = req.body;
  // console.log("email:", email);

  //aise single single pe validdte kr skte hai
  //   if(fullname===""){
  //     throw new ApiError(400,"fullname is required")
  //   }

  if (
    [fullname, email, username, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //provided by multer
  const avatarLocalPath = req.files?.avatar[0]?.path;

  //ye wala bhi work kr raha hai atleast mere code mai
  // const coverImageLocalPath = req.file?.coverImage[0]?.path;
  //anotherway
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    " -password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body sai data le aao
  //check for username or email
  //find the user
  //password check
  //access and refresh token generate
  //send cokies and sucessfully login message

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ApiError(400, "User does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Wrong Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  //our user refrence does not have any refresh or access  token its empty as the generate call was made using user._id but it is never saved in out user referecnce
  //saving it as loggedInUser by calling Database again
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true, //need to enable before sending the cookie so that only server can modify it
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //for logging out the user we have to clear all te cookies and also clear that cookies from the DB

  //is baar hame user  auth middleware ki wjh sai mil raha hai
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true, //need to enable before sending the cookie so that only server can modify it
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  //incoming token aayega usko recieve karo
  //jwt sai decode karo
  //match incoming refresh token n recieved token
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  //got user id from auth middleware
  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password changed"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  //TODO: delete old image - assignment

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading Cover Image");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "username is missing");
  }

  // Aggregation pipeline to fetch channel details, including subscriber count and whether the current user is subscribed
  const channel = await User.aggregate([
    {
      // Match the channel (user) by their username
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      // Lookup the "subscriptions" collection to find all subscribers of this channel
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel", // Matches the "channel" field in the "subscriptions" collection
        as: "subscribers", // Outputs the result into a field called "subscribers"
      },
    },
    {
      // Lookup the "subscriptions" collection to find all channels the user is subscribed to
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber", // Matches the "subscriber" field in the "subscriptions" collection
        as: "subscribedTo", // Outputs the result into a field called "subscribedTo"
      },
    },
    {
      // Add new fields to the result: subscribersCount, channelsSubscribedToCount, and isSubscribed
      $addFields: {
        // Count the number of subscribers by getting the size of the "subscribers" array
        subscribersCount: {
          $size: "$subscribers",
        },
        // Count the number of channels the user is subscribed to
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        // Check if the current user (from `req.user`) is in the list of subscribers
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] }, // If current user's _id is found in subscribers array
            then: true,
            else: false,
          },
        },
      },
    },
    {
      // Select only the necessary fields to be returned in the final response
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  // Aggregation pipeline to fetch the user's watch history along with video owner details
  const user = await User.aggregate([
    {
      // Match the current user by their _id
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      // Lookup the "videos" collection to get the details of videos in the user's watch history
      $lookup: {
        from: "videos",
        localField: "watchHistory", // Reference the user's watch history field (array of video IDs)
        foreignField: "_id", // Match the video IDs from the "videos" collection
        as: "watchHistory", // Outputs the result into a field called "watchHistory"
        pipeline: [
          {
            // Lookup to get the owner of each video (user who uploaded the video)
            $lookup: {
              from: "users",
              localField: "owner", // Matches the "owner" field (user ID) in the "videos" collection
              foreignField: "_id", // Corresponds to the user _id in the "users" collection
              as: "owner", // Outputs the result into a field called "owner"
              pipeline: [
                {
                  // Project only the necessary fields from the owner (user) document
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            // Add a new field "owner" to the video by getting the first element from the "owner" array
            $addFields: {
              owner: {
                $first: "$owner", // Extracts the first owner object from the "owner" array
              },
            },
          },
        ],
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      user[0].watchHistory, // Return the watch history array
      "Watch history fetched successfully"
    )
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};

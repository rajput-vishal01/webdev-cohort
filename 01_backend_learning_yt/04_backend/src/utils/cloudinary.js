import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully on Cloudinary:", response.url);

    // Delete the local file after uploading
    await fs.promises.unlink(localFilePath);

    return response;
  } catch (error) {
    console.log("Upload failed on Cloudinary:", error);
    
    // Ensure local file is deleted even if upload fails
    try {
      await fs.promises.unlink(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting local file after failed upload:", unlinkError);
    }
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary. Public Id:", publicId);
    return result;
  } catch (error) {
    console.log("Error deleting image on Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("firebase-admin");
const serviceAccount = require("./driveapp-c9aaf-firebase-adminsdk-fbsvc-1985933216.json");

const storage = firebaseStorage({
  credential: firebase.credential.cert(serviceAccount),
  bucketName: "driveapp-c9aaf.appspot.com",
  uniqure: true,  
});

const upload = multer({
  storage,
});

module.exports = upload;

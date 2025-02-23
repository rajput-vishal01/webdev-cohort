const Firebase = require("firebase-admin");

const serviceAccount = require("./driveapp-c9aaf-firebase-adminsdk-fbsvc-1985933216.json");

const firebase = Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),
  storageBucket: "driveapp-c9aaf.appspot.com",
});

module.exports = Firebase;

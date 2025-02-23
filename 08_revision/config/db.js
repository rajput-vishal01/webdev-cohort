const mongoose = require("mongoose");

const connection = mongoose.connect("addMongoDBurl").then(() => {
  console.log("connected");
});

module.exports = connection;

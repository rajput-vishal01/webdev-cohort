const express = require("express");

const app = express();

// Function that returns a boolean if the age is more than 14
function isoldEnough(age) {
  return age >= 14;
}

app.get("/ride1", (req, res) => {
  if (isoldEnough(req.query.age)) {
    res.json({
      msg: "You have successfully ridden ride 1",
    });
  } else {
    res.status(401).json({
      msg: "You are not old enough to ride ride 1",
    });
  }
});

// Middleware using the above logic
function isoldEnoughMiddleware(req, res, next) {
  const age = parseInt(req.query.age); // Get age from query parameters
  if (age >= 14) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not old enough to ride this ride",
    });
  }
}

// Now the route only does what it was supposed to do
app.get("/ride2", isoldEnoughMiddleware, (req, res) => {
  res.json({
    msg: "You have successfully ridden ride 2",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

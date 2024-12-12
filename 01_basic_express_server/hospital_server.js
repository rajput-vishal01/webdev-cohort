const express = require("express");
const app = express();
const port = 3000;

const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

// GET request: Displays the number of healthy and unhealthy kidneys
app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;

  // Validation: Check if kidneys exist
  if (!johnKidneys || johnKidneys.length === 0) {
    return res.status(404).json({
      message: "No kidneys found for the user.",
    });
  }

  const numberOfKidneys = johnKidneys.length;

  // Count the healthy kidneys
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }

  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    message: `Hello ${users[0].name}! You have ${numberOfKidneys} kidneys. Out of them, ${numberOfHealthyKidneys} are healthy and ${numberOfUnhealthyKidneys} are unhealthy.`,
  });
});

// POST request: Adds a new kidney
app.post("/", function (req, res) {
  const { isHealthy } = req.body;

  // Validation: Check if `isHealthy` is provided and is a boolean
  if (typeof isHealthy !== "boolean") {
    return res.status(400).json({
      message: "Invalid input. Please provide a boolean value for 'isHealthy'.",
    });
  }

  users[0].kidneys.push({ healthy: isHealthy });

  res.json({
    message: "Kidney added successfully",
    kidney: { healthy: isHealthy },
  });
});

// PUT request: Marks all kidneys as healthy
app.put("/", function (req, res) {
  const johnKidneys = users[0].kidneys;

  // Validation: Check if kidneys exist
  if (!johnKidneys || johnKidneys.length === 0) {
    return res.status(404).json({
      message: "No kidneys found to update.",
    });
  }

  // Mark all kidneys as healthy
  for (let i = 0; i < johnKidneys.length; i++) {
    johnKidneys[i].healthy = true;
  }

  res.json({
    message: "All kidneys are now healthy",
    kidneys: johnKidneys,
  });
});

// DELETE request: Removes all unhealthy kidneys
app.delete("/", function (req, res) {
  const johnKidneys = users[0].kidneys;

  // Validation: Check if kidneys exist
  if (!johnKidneys || johnKidneys.length === 0) {
    return res.status(404).json({
      message: "No kidneys found to delete.",
    });
  }

  // Filter out unhealthy kidneys
  const filteredKidneys = johnKidneys.filter((kidney) => kidney.healthy);

  // If no healthy kidneys are left, return a message
  if (filteredKidneys.length === 0) {
    return res.status(404).json({
      message: "No healthy kidneys left after deletion.",
    });
  }

  users[0].kidneys = filteredKidneys;

  res.json({
    message: "All unhealthy kidneys removed",
    kidneys: users[0].kidneys,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

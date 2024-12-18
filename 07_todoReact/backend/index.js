const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { z } = require("zod");

// MongoDB Connection
mongoose
  .connect("mongodb+srv://add-your-mongoDB-link@cluster0.ypbx2.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Mongoose Schema and Model
const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

// Express App
const app = express();
const port = 8000;

// Middleware
app.use(cors({}));
app.use(express.json());

// Validation Schemas
const createTodo = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean().optional(),
});

const updateTodo = z.object({
  _id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid MongoDB ObjectId",
  }),
});

// Routes
app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    return res
      .status(400)
      .json({ msg: "Invalid inputs", errors: parsePayload.error.errors });
  }

  try {
    await Todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: createPayload.completed || false,
    });
    res.status(201).json({ msg: "Todo created successfully" });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ msg: "Failed to create todo" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ msg: "Failed to fetch todos" });
  }
});

app.put("/complete", async (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    return res
      .status(400)
      .json({ msg: "Invalid inputs", errors: parsePayload.error.errors });
  }

  try {
    await Todo.findByIdAndUpdate(updatePayload._id, { completed: true });
    res.json({ msg: "Todo completed successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ msg: "Failed to update todo" });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

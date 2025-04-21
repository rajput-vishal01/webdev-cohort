import express from "express"; //ModuleJS, SO in package.json add  "type":"module", below main

const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("ready");
// });

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Why don’t scientists trust atoms?",
      content: "Because they make up everything!",
    },
    {
      id: 2,
      title: "What do you call fake spaghetti?",
      content: "An impasta!",
    },
    {
      id: 3,
      title: "Why don't programmers like nature?",
      content: "It has too many bugs.",
    },
    {
      id: 4,
      title: "How many tickles does it take to make an octopus laugh?",
      content: "Ten tickles.",
    },
    {
      id: 5,
      title: "Why did the coffee file a police report?",
      content: "It got mugged!",
    },
  ];
  res.send(jokes);
});

app.listen(port, () => {
  console.log(`Serve at https://localhost:${port}`);
});

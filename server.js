// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());// Дозволяє серверу приймати запити з інших доменів.
// app.use(bodyParser.json());
// app.use(express.static('public'));


// // MongoDB Connection
// const uri = "mongodb+srv://Cluster99980:cXBYZWteRk5f@cluster99980.jb2nl.mongodb.net/blog?retryWrites=true&w=majority";

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to DB"))
//   .catch(err => console.log(err));

// // Schema and Model
// const postSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   author: String,
// });

// const Post = mongoose.model("Post", postSchema);



// // Create Post
// ///Цей обробник:

// /*Отримує дані про пост (заголовок, опис і автора) із тіла запиту.
// Створює новий об'єкт у базі даних.
// Зберігає його.
// Повертає клієнту успішну відповідь із створеним постом.
// */

// app.post("/posts", async (req, res) => {
//   const { title, description, author } = req.body;
//   const newPost = new Post({ title, description, author });
//   await newPost.save();
//   res.status(201).json(newPost);
// });

// // Get All Posts
// app.get("/posts", async (req, res) => {
//   const posts = await Post.find();
//   res.json(posts);
// });

// // Update Post
// /*
// Повна логіка
// Клієнт надсилає PUT-запит на маршрут /posts/:id, вказуючи ідентифікатор посту в URL і нові дані у тілі запиту.
// Post.findByIdAndUpdate знаходить пост за переданим id і оновлює його даними з тіла запиту.
// Якщо оновлення успішне, сервер повертає клієнту оновлений пост у форматі JSON.
// */
// app.put("/posts/:id", async (req, res) => {
//   const { title, description, author } = req.body;
//   const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description, author }, { new: true });
//   res.json(updatedPost);
// });

// // Delete Post
// app.delete("/posts/:id", async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   res.status(204).send();
// });

// // Start Server
// const PORT = 8001;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}!`);
// });



// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(express.static('public'));

// // MongoDB Connection
// const uri = "mongodb+srv://Cluster99980:cXBYZWteRk5f@cluster99980.jb2nl.mongodb.net/blog?retryWrites=true&w=majority";

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to DB"))
//   .catch(err => console.log(err));

// // Schema and Model
// const postSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   author: String,
// });

// const Post = mongoose.model("Post", postSchema);

// // Create Post
// app.post("/posts", async (req, res) => {
//   const { title, description, author } = req.body;
//   const newPost = new Post({ title, description, author });
//   await newPost.save();
//   res.status(201).json(newPost);
// });

// // Get All Posts
// app.get("/posts", async (req, res) => {
//   const posts = await Post.find();
//   res.json(posts);
// });

// // Update Post
// app.put("/posts/:id", async (req, res) => {
//   const { title, description, author } = req.body;
//   const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description, author }, { new: true });
//   res.json(updatedPost);
// });

// // Delete Post
// app.delete("/posts/:id", async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   res.status(204).send();
// });

// // Start Server (Vercel automatically handles port)
// const PORT = process.env.PORT || 3000; // Встановлюємо порт на основі середовища
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}!`);
// });


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Дозволяє серверу приймати запити з інших доменів
app.use(bodyParser.json());
app.use(express.static('public')); // Обслуговування статичних файлів з папки "public"

// MongoDB Connection
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/blog"; // URI для MongoDB з середовища
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error("Failed to connect to DB:", err));

// Schema and Model
const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
});
const Post = mongoose.model("Post", postSchema);

// Routes

// Create Post
app.post("/posts", async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newPost = new Post({ title, description, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get All Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Update Post
app.put("/posts/:id", async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, author },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// Delete Post
app.delete("/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Catch-all Route (для SPA, якщо ви використовуєте React або подібне)
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start Server
const PORT = process.env.PORT || 8001; // Порт для хостингу
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

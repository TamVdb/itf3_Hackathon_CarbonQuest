const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(
   cors({
      origin: process.env.API_URL, // Your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
      credentials: true, // Allow cookies if needed
   })
);

// Connect to MongoDB
mongoose
   .connect(process.env.MONGODB_CONNECTION_STRING)
   .then(() => console.log("MongoDB connected successfully"))
   .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define User schema
const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   scores: {
      type: [Number],
      required: false,
   },
});

// Create User model
const User = mongoose.model("User", userSchema);

// Start the server
const port = process.env.PORT || 3001;

app.listen(port, () => {
   console.log("Server is running and listening on port 3001");
});

app.get("/", (req, res) => {
   res.status(200).send("Welcome to the API!");
});

// Login endpoint
app.post("/login", async (req, res) => {
   const { username, password } = req.body;

   // Validate input
   if (!username || !password) {
      return res
         .status(400)
         .json({ error: "Username and password are required" });
   }

   try {
      const userPassword = await User.findOne(
         { username },
         { password: 1, _id: 0 }
      );

      if (!userPassword) {
         return res.status(400).json({ error: "Identifiants invalides." });
      }

      if (password !== userPassword.password) {
         return res.status(400).json({ error: "Identifiants invalides." });
      }

      console.log("Right credentials!");
      return res.status(200).json({ message: "Right credentials!" });
   } catch (error) {
      console.log("Erreur interne: ", error);
      return res.status(500).json({ error: "Erreur interne" });
   }
});

// Register endpoint
app.post("/register", async (req, res) => {
   const { username, password } = req.body;

   // Validate input
   if (!username || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
   }

   try {
      //Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
         return res.status(400).json({ error: "Ce pseudo est déjà pris." });
      }

      // Create a new user
      const newUser = new User({
         username,
         password,
      });

      // Save the new user to the db
      await newUser.save();
      console.log("User saved!");
      return res.status(201).json({ message: "User saved!" });
   } catch (error) {
      console.log("Error saving user: ", error);
      return res.status(500).json({
         error: "Erreur lors de l'inscription. Veuillez réessayer plus tard.",
      });
   }
});

app.patch("/score", async (req, res) => {
   const { username, score } = req.body;

   if (!username || !score) {
      return res.status(400).json({ error: "Username and score are required" });
   }

   try {
      const updatedUser = await User.findOneAndUpdate(
         { username }, // Find the user by username
         { $push: { scores: score } }, // Add the score to the scores array
         { new: true } // Option: Return the updated document instead of the old one
      );

      if (!updatedUser) {
         return res.status(404).json({ error: "User not found" });
      }

      console.log("Score added!");
      return res
         .status(200)
         .json({ message: "Score successfully added!", updatedUser: updatedUser });
   } catch (error) {
      console.error("Error adding score: ", error);
      return res.status(500).json({ error: "Failed to add score" });
   }
});

// GET /oldScores?username=Amandine

app.get("/oldScores", async (req, res) => {
   const { username } = req.query;

   try {
      const userScores = await User.findOne({ username }, { scores: 1, _id: 0 });

      if (!userScores) {
         return res.status(404).json({ error: "User not found" });
      }

      console.log("Got old scores: ", userScores.scores);
      return res.status(200).json({ scoresArray: userScores.scores });
   } catch (error) {
      console.log("Internal error while trying to get old score: ", error);
      return res
         .status(500)
         .json({ error: "Internal error while trying to get old score" });
   }
});

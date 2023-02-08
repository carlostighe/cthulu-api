const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  chapters: [
    {
      title: "Chapter 1",
      text: "In my younger and more vulnerable years..."
    },
    {
      title: "Chapter 2",
      text: "I hope she'll be a fool -- that's the best thing a girl can be..."
    }
  ],
  characters: [
    {
      name: "Jay Gatsby",
      description: "The title character and protagonist of the novel."
    },
    {
      name: "Daisy Buchanan",
      description: "Gatsby's love interest and the wife of Tom Buchanan."
    }
  ]
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

app.use(passport.initialize());

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/api/book", (req, res) => {
  res.send({ book });
});

app.get("/api/book/chapters", (req, res) => {
  res.send({ chapters: book.chapters });
});

app.get("/api/book/chapters/:chapterId", (req, res) => {
  const chapterId = req.params.chapterId;
  const chapter = book.chapters[chapterId];
  if (!chapter) {
    res.status(404).send({ error: "Chapter not found." });
    return;
  }
  res.send({ chapter });
});

app.get("/api/book/characters", (req, res) => {
  res.send({ characters: book.characters });
});

app.get("/api/book/characters/:characterId", (req, res) => {
  const characterId = req.params.characterId;
  const character = book.characters[characterId];
  if (!character) {
    res.status(404).send({ error: "Character not found." });
    return;
  }
  res.send({ character });
});

// Define a global variable to store the note
let note = "";

// Endpoint to get the current note
app.get("/note", (req, res) => {
  res.send({ note });
});

// Endpoint to update the note
app.put("/note", (req, res) => {
  note = req.body.note;
  res.send({ message: "Note updated successfully." });
});

const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Note app listening on port ${port}`);
  });
  
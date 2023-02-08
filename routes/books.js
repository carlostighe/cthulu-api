const express = require("express");
const router = express.Router();

// Get all books
router.get("/api/books", (req, res) => {
  // Code to fetch all books from the database
  res.send({ book });
});

// Get a specific book
router.get("/api/books/:id", (req, res) => {
  // Code to fetch a specific book by its id from the database
});

// Create a new book
router.post("/api/books", (req, res) => {
  // Code to create a new book in the database
});

// Update a specific book
router.put("/api/books/:id", (req, res) => {
  // Code to update a specific book by its id in the database
});

// Delete a specific book
router.delete("/api/books/:id", (req, res) => {
  // Code to delete a specific book by its id from the database
});

// Get all chapters of a specific book
router.get("/api/books/:id/chapters", (req, res) => {
  // Code to fetch all chapters of a specific book by its id from the database
  connection.query("SELECT * FROM chapters", (err, chapters) => {
    if (err) throw err;
    res.json(chapters);
  });
});

// Get a specific chapter of a specific book
router.get("/api/books/:bookId/chapters/:chapterId", (req, res) => {
  // Code to fetch a specific chapter of a specific book by its id from the database
  const chapterId = req.params.chapterId;
  const chapter = book.chapters[chapterId];
  if (!chapter) {
    res.status(404).send({ error: "Chapter not found." });
    return;
  }
  res.send({ chapter });
});

// Create a new chapter for a specific book
router.post("/api/books/:id/chapters", (req, res) => {
  // Code to create a new chapter for a specific book by its id in the database
});

// Update a specific chapter of a specific book
router.put("/api/books/:bookId/chapters/:chapterId", (req, res) => {
  // Code to update a specific chapter of a specific book by its id in the database
});

// Delete a specific chapter of a specific book
router.delete("/api/books/:bookId/chapters/:chapterId", (req, res) => {
  // Code to delete a specific chapter of a specific book by its id from the database
});

// Get all characters of a specific book
router.get("/api/books/:id/characters", (req, res) => {
  // Code to fetch all characters of a specific book by its id from the database
  // res.send({ characters: book.characters });
  connection.query("SELECT * FROM characters", (err, characters) => {
    if (err) throw err;
    res.json(characters);
  });
});

// Get a specific character of a specific book
router.get("/api/books/:bookId/characters/:characterId", (req, res) => {
  // Code to fetch a specific character of a specific book by its id from the database
  // const characterId = req.params.characterId;
  // const character = book.characters[characterId];
  // if (!character) {
  //   res.status(404).send({ error: "Character not found." });
  //   return;
  // }
  // res.send({ character });
  connection.query(
    "SELECT * FROM character_stats WHERE characterId = ?",
    [req.params.id],
    (err, characterStats) => {
      if (err) throw err;
      res.json(characterStats);
    }
  );
});

// Create a new character for a specific book
router.post("/api/books/:id/characters", (req, res) => {
  // Code to create a new character for a specific book by its id in the database
});

// Update a specific character of a specific book
router.put("/api/books/:bookId/characters/:characterId", (req, res) => {
  // Code to update a specific character of a specific book by its id in the database
});

// Delete a specific character of a specific book
router.delete("/api/books/:bookId/characters/:characterId", (req, res) => {
  // Code to update a specific character of a specific book by its id in the database
});

const express = require("express");
const router = express.Router();

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

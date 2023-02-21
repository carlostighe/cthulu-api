const express = require("express");
const router = express.Router();

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

const express = require("express");
const app = express();
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "bookapp",
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the database");
// });

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
      };
      done(null, user);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  connection.query(
    "SELECT * FROM users WHERE googleId = ?",
    [id],
    (err, user) => {
      if (err) throw err;
      done(null, user);
    }
  );
});

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-01-10T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-01-10T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-01-10T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

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
  // res.send({ chapters: book.chapters });
  connection.query("SELECT * FROM chapters", (err, chapters) => {
    if (err) throw err;
    res.json(chapters);
  });
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
  // res.send({ characters: book.characters });
  connection.query("SELECT * FROM characters", (err, characters) => {
    if (err) throw err;
    res.json(characters);
  });
});

app.get("/api/book/characters/:characterId", (req, res) => {
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

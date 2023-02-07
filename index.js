const express = require("express");
const app = express();
const mysql = require("mysql");
const session = require("express-session");

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
      clientID: "your-google-client-id",
      clientSecret: "your-google-client-secret",
      callbackURL: "http://localhost:3000/auth/google/callback",
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

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

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

app.get("/api/chapters", (req, res) => {
  connection.query("SELECT * FROM chapters", (err, chapters) => {
    if (err) throw err;
    res.json(chapters);
  });
});

app.get("/api/characters", (req, res) => {
  connection.query("SELECT * FROM characters", (err, characters) => {
    if (err) throw err;
    res.json(characters);
  });
});

app.get("/api/characters/:id", (req, res) => {
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

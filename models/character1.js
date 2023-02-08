const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookapp",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

const createCharactersTable = `
  CREATE TABLE IF NOT EXISTS characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    userId INT NOT NULL
  );
`;

const createCharacterStatsTable = `
  CREATE TABLE IF NOT EXISTS character_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    characterId INT NOT NULL,
    str INT NOT NULL,
    con INT NOT NULL,
    dex INT NOT NULL,
    app INT NOT NULL,
    edu INT NOT NULL,
    size INT NOT NULL,
    int INT NOT NULL,
    pow INT NOT NULL,
    move_rate INT NOT NULL,
    FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE
  );
`;

connection.query(createCharactersTable, (err, result) => {
  if (err) throw err;
  console.log("Characters table created");
});

connection.query(createCharacterStatsTable, (err, result) => {
  if (err) throw err;
  console.log("Character stats table created");
});

module.exports = connection;

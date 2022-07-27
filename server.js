const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const uuid = require("uuid");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//  API Routes

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  //console.log(req.body)
  const userNotes = req.body;
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    dbData = JSON.parse(data);
    dbData.push(userNotes);
    let i = 1;
    dbData.forEach((note, index) => {
      note.id = i;
      i++;
      return dbData;
    });
    stringData = JSON.stringify(dbData);

    fs.writeFile("./db/db.json", stringData, (err, data) => {
      if (err) throw err;
    });
    res.json(dbData);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== parseInt(req.params.id));
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  res.json(delNote);
});

//  HTML Routes

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, () => {
  console.log("App Listening on Port http://localhost:" + PORT);
});


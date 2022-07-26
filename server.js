const express = require("express");
const path = require("path");
const db = require ("./db/db.json")
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended:true }));
app.use(express.static("public"));

//  HTML Routes

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

//  API Routes

app.get("/api/notes", (req,res)=>{
    res.json(db)
})

app.post("/api/notes", (req,res)=>{
    console.log(req.body)
    const newNote = createNote(req.body, db)
    res.json(newNote)
})

app.listen(PORT, () =>{
    console.log(`App Listening at ${PORT}`)
})


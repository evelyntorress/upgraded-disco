// Dependencies
const express = require('express');
const path = require('path');
const util =require('util');
const fs = require('fs');
const uuid = require('uuid');
const notes = require("./db/db.json")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// express handler
const app = express();
// setting up the server
const PORT = process.env.PORT || 3004;

// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));

// Middleware for parsing application/json
app.use(express.json());

// Middleware for urlecoded data
// `urlencoded` data represents a URL encoded form.
app.use(express.urlencoded({ extended: true }));

// to get notes and return notes.html 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname,'./public/notes.html'))
);

// get route for /api/notes

app.get('/api/notes', async (req, res) => {
 const notes = await readFileAsync("./db/db.json","utf-8")
  res.json(JSON.parse(notes)); 
  });

// Post function to add new notes to db.json
app.post("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
   fs.writeFileSync("./db/db.json",JSON.stringify(notes))
    res.json(notes); 
});

// To delete notes
app.delete("/api/notes/:id", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id!== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

// Calls homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

 // GET * should return the index.html file.

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


// Listen for connections
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


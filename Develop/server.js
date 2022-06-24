// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const notes = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 3004;


// Add a static middleware for serving assets in the public folder
app.use(express.static('./Develop/public'));

// Middleware for parsing application/json
app.use(express.json());

// Middleware for urlecoded data
// `urlencoded` data represents a URL encoded form.
// This middleware will parse that string into an object containing key value pairs
app.use(express.urlencoded({ extended: true }));

// to get notes and return notes.html 
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Post function to add new notes to db.json
app.post("/api/notes", (req,res) => {
    const notes = JSON.parse(fs.readFileSync("./db/bd.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
   fs.writeFileSync("./db/db.json",JSON.stringify(notes))
    res.json(notes);
});

// To deletie notes
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


// to get notes and return notes.html 
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);


// Listen for connections
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);




// // POST request for notes. 
// app.post('/api/notes/:id', (req, res) => {
// // Inform the client that their POST request was received
//   res.json(`${req.method} request received to add a review`);
// // Log our request to the terminal
//   console.info(`${req.method} request received to add a review`);
// });


// // Helper function that accepts a `review` object, sends a POST request and returns the result
// const postReview = (review) =>
//   // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
//   fetch('/api/reviews', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(review),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('Successful POST request:', data);
//       return data;
//     })
//     .catch((error) => {
//       console.error('Error in POST request:', error);
//     });
// // ================================


// // -----------------------------------------------------------------------

// // Another form===================== revisar act 15 para ver como estan hechas las carpetas

// // POST request to add a review
// app.post('/api/reviews', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Prepare a response object to send back to the client
//   let response;

//   // Check if there is anything in the response body
//   if (req.body && req.body.product) {
//     response = {
//       status: 'success',
//       data: req.body,
//     };
//     res.json(`Review for ${response.data.product} has been added!`);
//   } else {
//     res.json('Request body must at least contain a product name');
//   }

//   // Log the response body to the console
//   console.log(req.body);
// });
// // ======================================================


// // GET * should return the index.html file.

// app.get('/index', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// );


// // this is to get a response of json

// // GET /api/notes should read the db.json file and return all saved notes as JSON.

// app.get('/api/notes', (req, res) => {
//     res.json({
//       term: 'api',
//       description:
//         'An application programming interface, is a computing interface that defines interactions between multiple software intermediaries',
//     });
//   });
// // fetch

// const getPets = () =>
//   fetch('/api/pets', {
//     method: 'GET',
//   })
//     .then((res) => res.json())
//     .then((data) => data);


// // button
// const buttonHandler = () =>
//   getTerms().then((response) => response.forEach((item) => renderTerm(item)));

// termButton.addEventListener('click', buttonHandler);


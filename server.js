const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//  parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

const { notes } = require('./data/db');

app.get('/api/notes', (req, res) => {
   
   res.json(notes);
});

// route to index file
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '.public/index.html'));
});

// route to notes file
app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
   // set id based on what the next index of the array will be
   req.body.id = notes.length.toString();

   // if any data in req.body is incorrect, send 400 error back
   if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
   } else {
   
   // add note to json file and notes array in this function
   const note = createNewNote(req.body, notes);
   
   res.json(note);
   }
});

// deletes notes
app.delete('/api/notes/:id', (req, res) => {
   const id = req.params.id;
   let note;

   notes.map((element, index) => {
      if(element.id == id) {
         note = element
         notes.splice(index, 1)
         return res.json(note);
      }
   })
});

//  creates notes
function createNewNote(body, notesArray) {
   const note = body;
   notesArray.push(note);
   fs.writeFileSync(
      path.join(__dirname, './data/db.json'),
      JSON.stringify({notes: notesArray}, null, 2)
   );

   return note;
}

// validates syntax of new notes
function validateNote(note) {
   if (!note.title || typeof note.title !== 'string') {
      return false;
   }

   if (!note.text || typeof note.text !== 'string') {
      return false;
   }
   return true;
}

app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}!`);
});

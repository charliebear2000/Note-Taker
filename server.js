const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//  parse incoming JSON data
app.use(express.json());

const { notes } = require('./data/db');

app.get('/api/notes', (req, res) => {
   
   res.json(notes);
});

app.post('/api/notes', (req, res) => {
   // set id based on what the next index of the array will be
   req.body.id = notes.length.toString();

   // add note to json file and notes array in this function
   const note = createNewNote(req.body, notes);
   
   res.json(note);
});

function createNewNote(body, notesArray) {
   const note = body;
   notesArray.push(note);
   fs.writeFileSync(
      path.join(__dirname, './data/db.json'),
      JSON.stringify({notes: notesArray}, null, 2)
   );

   return note;
}



app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}!`);
});

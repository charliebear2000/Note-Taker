const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//  parse incoming JSON data
app.use(express.json());

const { notes } = require('./data/db');

app.get('/api/notes', (req, res) => {
   let results = notes;
   if (req.query) {
      results = filterByQuery(req.query, results);

   }
   res.json(results);
});

app.post('/api/notes', (req, res) => {
   console.log(req.body);
   res.json(req.body);
});




app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}!`);
});

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./db/db');

app.get('/db/db', (req, res) => {
   res.send('hello!');
});

app.listen(PORT, () => {
   console.log(`API server now on port ${PORT}!`);
});

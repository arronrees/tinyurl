require('dotenv').config();
const express = require('express');
const { db } = require('./lib/db');
const cors = require('cors');

const app = express();

const urlRouter = require('./routes/url');

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(urlRouter);

app.use('*', (req, res) => {
  res.status(404).send('404 - Not found');
});

db.authenticate()
  .then(() => {
    console.log('db connected');

    app.listen(3000, () => {
      console.log('server running on port 3000');
    });
  })
  .catch((err) => {
    console.error(err);
  });

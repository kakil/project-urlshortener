require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const urlExits = require("url-exists");

// Use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

app.route('/api/shorturl')
  .get((req, res) => {
    const { url } = req.body;
    const original_url = `${url}`;

    urlExits(original_url, (err, exists) => {
      if (exists) {
        console.log(`url good: ${original_url}`);
      } else {
        res.json({ error: 'invalid url' });
        console.log('Not a valid URL');
      }
    });
  })
  .post((req, res) => {
    console.log('data: ', req.body);
    const { url } = req.body;
    const original_url = `${url}`;

    urlExits(original_url, (err, exists) => {
      if (exists) {
        console.log(`url good: ${original_url}`);
      } else {
        res.json({ error: 'invalid url' });
        console.log('Not a valid URL');
      }
    });

  });



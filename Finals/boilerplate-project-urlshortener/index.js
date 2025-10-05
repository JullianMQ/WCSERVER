require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const bodyParser = require('body-parser');
const { URL } = require('url');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

const urlDatabase = [];
let nextId = 1;

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function (req, res) {
  const inputUrl = req.body.url || req.query.url;

  if (!inputUrl) {
    return res.json({ error: 'invalid url' });
  }

  if (!/^https?:\/\//i.test(inputUrl)) {
    return res.json({ error: 'invalid url' });
  }

  let hostname;
  try {
    const parsed = new URL(inputUrl);
    hostname = parsed.hostname;
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, (err /*, address, family */) => {
    if (err) {
      // doesn't resolve
      return res.json({ error: 'invalid url' });
    }

    const existing = urlDatabase.find((entry) => entry.original_url === inputUrl);
    if (existing) {
      return res.json({ original_url: existing.original_url, short_url: existing.id });
    }

    const id = nextId++;
    urlDatabase.push({ id, original_url: inputUrl });

    return res.json({ original_url: inputUrl, short_url: id });
  });
});

app.get('/api/shorturl/:short_url', function (req, res) {
  const shortUrl = Number(req.params.short_url);
  if (!Number.isFinite(shortUrl)) {
    return res.json({ error: 'No short URL found for the given input' });
  }

  const entry = urlDatabase.find((e) => e.id === shortUrl);
  if (!entry) {
    return res.json({ error: 'No short URL found for the given input' });
  }

  return res.redirect(entry.original_url);
});

app.get('/api/urls', (req, res) => {
  res.json(urlDatabase);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

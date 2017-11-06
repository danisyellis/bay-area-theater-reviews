const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/db')

const port = process.env.PORT || 3000

const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  db.getAlbums()
  .then(albums => {
    res.render('index', {albums});
  })
  .catch(err => {console.error("Error:", err);});
});

app.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  db.getAlbumsById(albumId)
  .then(album => {
    res.render('album', {album});
  })
  .catch(err => {console.error("Error:", err);});
});

app.use((req, res) => {
  res.status(404).render('not_found');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});

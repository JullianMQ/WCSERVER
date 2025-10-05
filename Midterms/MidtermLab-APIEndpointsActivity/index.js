const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('My New app!')
})

app.get('/api/heroes', (req, res) => {
  res.send(['Superman', 'Iron Man', 'Batman', 'Hulk'])
})

app.get('/api/heroes/:id', (req, res) => {
  res.send(req.params.id)
})

// app.get('/api/heroes/:title/:publisher', (req, res) => {
//   res.send(req.params)
// })

app.get('/api/heroes/:title/:publisher', (req, res) => {
  res.send([req.params, req.query])
})

const movies = [{
  id: 1,
  title: 'Superman'
}, {
  id: 2,
  title: 'Thor'
}, {
  id: 3,
  title: 'Iron Man'
}]

app.get('/api/movies', (req, res) => {
  res.send(movies)
})

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(h => h.id === parseInt(req.params.id))
  if(!movie) return res.status(404).send('The movie with the given ID was not found.')
  res.send(movie)
})

app.use(express.json())
app.post('/api/movies', (req, res) => {
  const movie = {
    id: movies.length + 1,
    title: req.body.title
  }
  movies.push(movie)
  res.send(movie)
})

app.listen(3000, () => console.log('Listening on port 3000'))
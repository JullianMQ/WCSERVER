const express = require('express')
const app = express()

const data = [
  {
    "id": 1,
    "name": 'Carmela',
    "email": 'mela@gmail.com',
    "age": 25,
    "salary": 25000
  },
  {
    "id": 2,
    "name": 'Joseph',
    "email": 'joe@yahoo.com',
    "age": 30,
    "salary": 45000
  },
  {
    "id": 3,
    "name": 'James',
    "email": 'james@msn.com',
    "age": 35,
    "salary": 30000
  },
  {
    "id": 4,
    "name": 'John',
    "email": 'john@gmail.com',
    "age": 40,
    "salary": 25000
  },
  {
    "id": 5,
    "name": 'Frank',
    "email": 'frank@yahoo.com',
    "age": 45,
    "salary": 45000
  },
  {
    "id": 6,
    "name": 'Alex',
    "email": 'alex@msn.com',
    "age": 21,
    "salary": 33000
  },
]

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send(`
<ul>
  <li>Root at /</li>
  <li>GET at /api/users</li>
  <li>GET at /api/users/</li>
  <li>GET at /api/users/</li>
  <li>POST at /api/users</li>
  <li>DELETE at /api/delete</li>
</ul>
`)
})

app.get('/api/users', (req, res) => {
  res.json(data)
})

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.json(data.filter((values) => values.id === id))
})

app.post('/api/users', (req, res) => {
  const newData = {
    id: data.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: parseInt(req.body.age),
    salary: parseInt(req.body.salary)
  }

  data.push(newData)
  res.json(newData)
})

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.json(data.map((values, idx) => {
    if (values.id === id) {
      data.slice(idx)
    }
    return data
  }))
})

app.use((_, res) => {
  res.send("Data not found")
})

app.listen(3000, () => {
  console.log("Server is starting at port 3000")
})
const express = require('express')
const app = express()

const data = {
  sisig: {
    type: "Sisig",
    province: "Pampanga",
    price: 220
  },

  bagnet: {
    type: "Bagnet",
    province: "Ilocos",
    price: 370
  },

  salpicao: {
    type: "Salpicao",
    province: "Quezon",
    price: 180
  }
}

app.get('/', (req, res) => {
  res.send("Root route")
})

app.get('/dishes', (req, res) => {
  res.json(data)
})

app.get('/dishes/:type', (req, res) => {
  const type = req.params.type
  if (data[type] === undefined) {
     res.send("Record not found") 
  }
  res.json(data[type])
})

app.use((req, res) => {
  res.send("Record not found")
})

app.listen(3000, "localhost", () => {
  console.log("Server is running at localhost port 3000")
})

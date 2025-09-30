const express = require('express')
const app = express()

app.use(express.json())

let numbers = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const getNextId = () => {
  // const maxId = numbers.length > 0
  //   ? Math.max(...numbers.map(n => Number(n.id)))
  //   : 0
  // return String(maxId + 1)
  return Math.floor(Math.random() * Number.MAX_VALUE);
}

app.get('/info', (request, response) => {
  const numPeople = numbers.length
  const now = new Date()

  response.send(`
    <div>
      <p>Phonebook has info for ${numPeople} people</p>
      <p>${now.toString()}</p>
    </div>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(numbers)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const number = numbers.find(number => number.id === id)

  if (number) {
    response.json(number)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  numbers = numbers.filter(number => number.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing"
    })
  } else if (numbers.find(n => n.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  const number = {
    "name": body.name,
    "number": body.number,
    "id": getNextId()
  }

  numbers = numbers.concat(number)

  response.json(numbers)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
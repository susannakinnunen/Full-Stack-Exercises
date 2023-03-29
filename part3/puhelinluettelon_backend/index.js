const express = require('express')
const morgan = require('morgan')
const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })


app.use(express.json())
app.use(requestLogger)

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req,res)
    ].join(' ')
  }))

let persons = [
          {
            id: 1,
            name: "Arto Hellas",
            number: "040-123456"
          },
          {
            id: 2,
            name: "Ada Lovelace",
            number: "39-44-5323523"
          },
          {
            id: 3,
            name: "Dan Abramov",
            number: "12-43-234345"
          }
        ]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    const numberOfPersons = persons.length
    const today = new Date();
    const date = today.getDate()+'.'+(today.getMonth()+1)+'.'+ today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
     
    console.log(dateTime)
    res.send(`<p>Phonebook has info for ${numberOfPersons} people</p> ${dateTime}`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random() * 1000000000000);
    }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()

      }
      persons = persons.concat(person)
    
      response.json(person)
    })

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
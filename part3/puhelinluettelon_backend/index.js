const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
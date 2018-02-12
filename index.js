const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))
/*
let persons = [
  {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
  },
  {
      name: 'Martti Tienari',
      number: '040-123456',
      id: 2

  },
  {
      name: 'Arto Järvinen',
      number: '040-123456',
      id: 3
  },
  {
      name: 'Lea Kutvonen',
      number: '040-123456',
      id: 4
  }
]

*/

const formatPerson = (person) => {
    return {
        id: person._id,
        name: person.name,
        number: person.number
    }
}

app.get('/api/persons', (request, response) => {
    Person
    .find({})
    .then(people => {
        response.json(people.map(formatPerson))
    })
  })


  app.get('/info', (req, res) => {
      Person
      .find({})
      .then(people => {
        res.send(`<p>Puhelinluettelossa on ` + people.length + ` henkilön tiedot</p> <p>${new Date()}</p>`)
      })
      
  })

  app.get('/api/persons/:id', (req, res) => {
     Person
     .findById(req.params.id)
     .then(person => {
         if (person) {
            res.json(formatPerson(person))
         } else {
             res.status(404).end()
         }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id'})
     })
  })

  app.post('/api/persons', (req, res) => {
      const body = req.body

      if (body.name === undefined) {
          return res.status(400).json({ error: 'name is missing'})
      }

      if (body.number === undefined) {
          return res.status(400).json({ error: 'number is missing'})
      }
/*
      if (people.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
          return res.status(400).json({ error: 'person already exists'})
      }
*/
     const person = new Person({
         name: body.name,
         number: body.number,
     })

     person
     .save()
     .then(savedPerson => {
         res.json(formatPerson(savedPerson))
     })
  })

  app.delete('/api/persons/:id', (req, res) => {
      Person
      .findByIdAndRemove(req.params.id)
      .then(result => {
          res.status(204).end()
      })
      .catch(error => {
          res.status(400).sendDate({ error: 'malformatted id'})
      })
  })

  app.put('/api/persons/:id', (req, res) => {
      const body = req.body

      const person = {
          name: body.name,
          number: body.number
      }

      Person
      .findByIdAndUpdate(req.params.id, person, { new: true})
      .then(updatedPerson => {
          res.json(formatPerson(updatedPerson))
      })
      .catch(error => {
          console.log(error)
          res.status(400).send({ error: 'malformatted id'})
      })
  })
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
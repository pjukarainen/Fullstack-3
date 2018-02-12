const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://@ds029565.mlab.com:29565/fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String 
})

if (process.argv[2] && process.argv[3]) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    
    person
    .save()
    .then(result => {
        console.log('lisättiin henkilö ' + process.argv[2] + ' numero ' + process.argv[3])
        mongoose.connection.close()
    })
} else {


Person
  .find({})
  .then(result => {
      console.log('puhelinluettelo:')
    result.forEach(person => {
        console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}
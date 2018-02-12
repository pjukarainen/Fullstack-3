const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://fullstack:sekret@ds029565.mlab.com:29565/fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String 
})

module.exports = Person
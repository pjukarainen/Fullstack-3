const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = process.env.MONGODB_URL

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String 
})

module.exports = Person
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const number = '1234567890'
const allLetters = lowerCaseLetters + upperCaseLetters + number

//產生亂數
function sample (array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  
  return array[randomIndex]
}

//產生短網址
function urlShorten (num) {

  let collection = []
  
  collection = collection.concat(allLetters.split(''))

  let shortURL = ''
  for (let i = 1; i <= num; i++) {
    shortURL += sample(collection)
  }
  return shortURL
}

urlShorten()

// export urlShorten function for other files to use
module.exports = urlShorten


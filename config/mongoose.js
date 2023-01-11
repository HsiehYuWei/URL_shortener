//(安裝 npm i mongoose@5.9.7 )
const mongoose = require('mongoose')

//僅在非正式環境時, 使用 dotenv(安裝 npm i dotenv -D )
if (process.env.NODE_ENV !== 'prodction') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
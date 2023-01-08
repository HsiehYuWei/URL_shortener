const express = require('express')
const exphbs = require('express-handlebars')
//載入mongoose連線
require('./confing/mongoose')
const routes = require('./routes')

const  app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
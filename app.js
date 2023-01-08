const express = require('express')
const exphbs = require('express-handlebars')
//載入mongoose連線
require('./confing/mongoose')
const URL = require('./models/url')
const urlShorten = require('./url_shorten')



const  app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


// rander畫面
app.get('/', (req, res) => {
  res.render('index')
})


app.post('/', (req, res) => {
  if(!req.body.url)return res.redirect('/')
  const shortURL = urlShorten(5)

  URL.findOne({ originalURL: req.body.url})
    .then(data => data? data : URL.create({ shortURL, originalURL: req.body.url}))
    .then(data => res.render('index', {origin: req.headers.origin, shortURL: data.shortURL}))
    .catch(error => console.error(error))
})

app.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params

  URL.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        })
      }

      res.redirect(data.originalURL)
    })
    .catch(error => console.error(error))
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
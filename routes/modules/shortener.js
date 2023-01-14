const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const urlShorten = require('../../url_shorten')


router.post('/', (req, res) => {
  if (!req.body.url) return res.redirect('/')
  const shortURL = urlShorten(5)

  URL.findOne({ originalURL: req.body.url })
    .then(data => data ? data : URL.create({ shortURL, originalURL: req.body.url }))
    .then(data => res.render('index', { origin: req.headers.origin, shortURL: data.shortURL }))
    .catch(error => console.error(error))
})

router.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params
  console.log(req.headers)
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

module.exports = router
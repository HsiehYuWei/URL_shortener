const express = require('express')
const router = express.Router()
const URL = require('../../models/url')

// rander畫面
router.get('/', (req, res) => {
  res.render('index')
})


module.exports = router
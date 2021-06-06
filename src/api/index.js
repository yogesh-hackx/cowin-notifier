const express = require('express');

const checkSlots = require('./checkSlots');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/checkSlots', checkSlots);

module.exports = router;

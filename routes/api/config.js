const express = require('express');
const router = express.Router();
const Config = require('../../models/Config');

router.get('/', async (req, res) => {
  const config = await Config.find();
  return res.status(200).send(config[0]);
});

module.exports = router;

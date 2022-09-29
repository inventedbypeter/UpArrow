const express = require('express');
const router = express.Router();

const investor = require('./investor');
const post = require('./post');
const admin = require('./admin');
const user = require('./user');

router.use('/post', post);
router.use('/investor', investor);
router.use('/admin', admin);
router.use('/user', user);

module.exports = router;

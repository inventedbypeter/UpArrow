const express = require('express');
const router = express.Router();

const investor = require('./investor');
const post = require('./post');
const admin = require('./admin');
const user = require('./user');
const comment = require('./comment');
const config = require('./config');
const purchase = require('./purchase');
const stock = require('./stock');

router.use('/post', post);
router.use('/investor', investor);
router.use('/admin', admin);
router.use('/user', user);
router.use('/comment', comment);
router.use('/config', config);
router.use('/purchase', purchase);
router.use('/stock', stock);

module.exports = router;

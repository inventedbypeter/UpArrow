const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Stock = require('../../models/Stock');
const Advertisement = require('../../models/Advertisement');
const Comment = require('../../models/Comment');
const Analysis = require('../../models/Analysis');
const Purchase = require('../../models/Purchases');
const Average = require('../../models/Average');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

// POST http://localhost:4000/api/v1/investor/register/user
// a user is registering for the first time on UpArrow

// REST API

// GET POST PUT DELETE  http method <- 하려는 동작. (동사)
// 회원
// 회원정보 가져오기
// 회원정보 추가하기 (회원가입)
// 회원정보 수정하기 (email 변경, nickname 변경)
// 회원정보 삭제하기 (회원탈퇴)

// ['a', 'b', 'c']
// POST ('/user') <- 회원가입 API
// GET ('/user') <- 회원정보 전체 가져오기
// GET ('/user/:id') <- 회원정보 하나 가져오기
// PUT ('/user/:id') <- 회원정보 하나 가져오기
// DELETE ('/user/:id') <- 회원정보 하나 가져오기

router.post('/', async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  if (user) {
    return res.status(400).send({});
  } else {
    const newUser = new User(req.body);
    newUser.save().catch((err) => console.log(err));
    return res.status(200).send(newUser);
  }
});

// a user getting a user data using email

router.get('/:email', async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email: email });

  if (user) {
    return res.status(200).send(user);
  } else {
    return res.status(200).send({});
  }
});

// a logged user can see other investor’s profile and comments

router.get('/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userObjectId = ObjectId(userId);
    const userDocument = await User.findById(userObjectId);

    if (!userDocument) {
      return res.status(404).send({});
    } else {
      return res.status(200).send(userDocument);
    }
  } catch (error) {
    return res.status(400).send({});
  }
});

// GET http://localhost:4000/api/v1/investor/fetch/all/users
// we are getting all users in UpArrow

router.get('/', async (req, res) => {
  try {
    const userList = await User.find();
    return res.status(200).send(userList);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// GET http://localhost:4000/api/v1/investor/search/user/:email
// a user can see other user's profile and comments using email address

router.get('/:email/search', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userDocument = await User.findOne({ email: userEmail });

    if (!userDocument) {
      return res.status(404).send({});
    } else {
      return res.status(200).send(userDocument);
    }
  } catch (error) {
    return res.status(400).send({});
  }
});

// GET http://localhost:4000/api/v1/investor/fetch/userprofiles/
// a user can get all investors

module.exports = router;

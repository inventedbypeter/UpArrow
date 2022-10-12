const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Stock = require('../../models/Stock');
const Comment = require('../../models/Comment');
const ObjectId = require('mongodb').ObjectId;

router.get('/:stockId/stock', async (req, res) => {
  const stockStringId = req.params.stockId;
  const allComments = await Comment.find({ stockId: stockStringId });

  return res.status(200).send(allComments);
});

router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);

    const stockId = req.body.stockId;
    const stockObjectId = ObjectId(stockId);
    const stockDocument = await Stock.findById(stockObjectId);
    const stockCommentList = stockDocument.comments;

    stockCommentList.push(newComment._id);

    const stockQuery = { _id: stockObjectId };
    const updatedStockValue = {
      name: stockDocument.name,
      ticker: stockDocument.ticker,
      profile_image_url: stockDocument.profile_image_url,
      pros: stockDocument.pros,
      cons: stockDocument.cons,
      industryCategory: stockDocument.industryCategory,
      comments: stockCommentList,
      video_url: stockDocument.video_url,
      advertisementId: stockDocument.advertisementId,
      invest: stockDocument.invest,
      notInvest: stockDocument.notInvest,
      stockString: stockDocument.stockString,
      posts: stockDocument.posts,
    };

    await Stock.findOneAndUpdate(stockQuery, updatedStockValue);

    const userId = req.body.userId;
    const userObjectId = ObjectId(userId);
    const userDocument = await User.findById(userObjectId);
    const userCommentList = userDocument.comments;

    userCommentList.push(newComment._id);

    const userQuery = { _id: userObjectId };
    const updatedUserValue = {
      name: userDocument.name,
      profile_image_url: userDocument.profile_image_url,
      username: userDocument.username,
      password: userDocument.password,
      email: userDocument.email,
      description: userDocument.description,
      websiteUrl: userDocument.websiteUrl,
      comments: userCommentList,
      likes: userDocument.likes,
      isAdmin: userDocument.isAdmin,
      stockPreference: userDocument.stockPreference,
      investedCompanies: userDocument.investedCompanies,
      posts: userDocument.posts,
      purchases: userDocument.purchases,
      totalInvestment: userDocument.totalInvestment,
      totalProfits: userDocument.totalProfits,
      totalAssets: userDocument.totalAssets,
      followers: userDocument.followers,
      followings: userDocument.followings,
    };
    await User.findOneAndUpdate(userQuery, updatedUserValue);
    await newComment.save();

    return res.status(200).send(newComment);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;

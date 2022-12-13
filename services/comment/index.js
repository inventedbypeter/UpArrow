const User = require('../../models/User');
const Stock = require('../../models/Stock');
const ObjectId = require('mongodb').ObjectId;
const Comment = require('../../models/Comment');

const addStockComment = async ({
  stockId,
  userId,
  content,
  timeStamp,
  likes,
}) => {
  const newComment = new Comment({
    stockId,
    userId,
    content,
    timeStamp,
    likes,
  });

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
  return newComment;
};

const addPostComment = async ({
  postId,
  userId,
  content,
  timeStamp,
  likes,
}) => {
  const newComment = new Comment({
    postId,
    userId,
    content,
    timeStamp,
    likes,
  });
  return newComment;
};

module.exports = { addStockComment, addPostComment };

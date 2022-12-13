const express = require('express');
const router = express.Router();
const Comment = require('../../models/Comment');
const commentService = require('../../services/comment');

router.get('/:stockId/stock', async (req, res) => {
  const stockStringId = req.params.stockId;
  const allComments = await Comment.find({ stockId: stockStringId });

  return res.status(200).send(allComments);
});

router.post('/', async (req, res) => {
  try {
    const isStockComment = !!req.body.stockId;
    let newComment;
    if (isStockComment) {
      const { stockId, userId, comment, timeStamp, likes } = req.body;
      newComment = commentService.addStockComment({
        stockId,
        userId,
        comment,
        timeStamp,
        likes,
      });
    } else {
      const { postId, userId, comment, timeStamp, likes } = req.body;
      newComment = commentService.addPostComment({
        postId,
        userId,
        comment,
        timeStamp,
        likes,
      });
    }
    return res.status(200).send(newComment);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  stockId: String,
  userId: String,
  username: String,
  title: String,
  content: String,
  date: String,
  likes: Array,
  comments: Array,
  thumbnailImageUrl: String,
});

module.exports = mongoose.model('Post', PostSchema);

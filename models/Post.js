const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const PostSchema = new Schema({
    stockId: String,
    userId: String,
    userName: String,
    title: String,
    content: String,
    date: String,
    likes: Array,
    numberLikes: Number,
    comments: Array,
    video_url: String,
    image_url: String
})

module.exports = mongoose.model('Post', PostSchema);
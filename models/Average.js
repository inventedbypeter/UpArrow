const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AverageSchema = new Schema({
  averages: Array,
});

module.exports = mongoose.model("Average", AverageSchema);

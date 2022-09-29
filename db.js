const mongoose = require("mongoose");
const uri = "mongodb+srv://StockReview:AstonMartinDB12@cluster0.jiyst.mongodb.net/stockreview?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect (uri, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("mongodb has successfully connected");

}

module.exports = connectDB;
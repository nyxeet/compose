const mongoose = require("mongoose");
const { db } = require("../configuration");

module.exports.connectDb = () => {
  return mongoose.connect(db, { useNewUrlParser: true });
};

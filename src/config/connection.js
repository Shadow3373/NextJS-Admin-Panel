const mongoose = require("mongoose");

const connection = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Database Connected Successfully"));
  } catch (error) {
    console.log(err);
  }
};

module.exports = connection;

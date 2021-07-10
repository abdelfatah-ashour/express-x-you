const mongoose = require("mongoose");
const { logger } = require("../utilities/winston");

module.exports = async function connectToDatabase(uri) {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      logger.error(error.message);
    });
};

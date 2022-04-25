const mongoose = require('mongoose');

const connectDB = ({ config, logger }) => {
  return async () => {
    const mongoURI = config.get('db.mongoURI');
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  };
};

module.exports = connectDB;

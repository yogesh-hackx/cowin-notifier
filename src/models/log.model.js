const mongoose = require('mongoose');

const REQUIRED_STRING = {
  type: String,
  required: true,
};

const logSchema = new mongoose.Schema({
  phone: REQUIRED_STRING,
  message: REQUIRED_STRING,
  time: REQUIRED_STRING,
});

logSchema.index({
  phone: 1,
  message: 1,
}, {
  unique: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

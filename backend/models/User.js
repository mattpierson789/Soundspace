const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: false,
      enum: ['NYC', 'LA', 'Miami']
    },
    profilePicture: {
      type: String,
      required: false
    },
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);

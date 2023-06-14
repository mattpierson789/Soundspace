const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const userSchema = new Schema({
    name: {
      type: String,
      required: false
    },
    profileImageUrl: {
      type: String,
      required: true
    },
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
      required: true,
    },
    profilePicture: {
      type: String,
      required: false
    },
    trackIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Track'
    }]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('User', userSchema);
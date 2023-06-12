const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const userSchema = new Schema({
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
      required: false,
      enum: ['NYC', 'LA', 'Miami']
    },
    profilePicture: {
      type: String,
      required: false
    },
    trackIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Tracks'
    }]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('User', userSchema);
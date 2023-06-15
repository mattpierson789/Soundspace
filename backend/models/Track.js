const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tracksSchema = new Schema({
  trackImageUrl: {
    type: String,
    required: false
  },
  trackUrl: {
    type: String, 
    required: false, 
  },
  artist: {
    type: String,
    required: false,
    index: true  
  },
  title: {
    type: String,
    required: false,
    index: true  
  },
  reshares: {
    type: Number,
    required: false,
    default: 0
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  location: {
    type: String,
    required: false,
    enum: ['NYC', 'LA', 'Miami']
  },
  plays: {
    type: Number,
    required: false,
    default: 0
  },
  genre: {
    type: String,
    required: false,
    enum: ['Pop', 'Rock', 'Hip Hop', 'Electronic']
    },
  owner: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Track', tracksSchema);
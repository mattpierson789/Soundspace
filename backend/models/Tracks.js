const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tracksSchema = new Schema({
    trackImageUrls: {
    type: [String],
    required: false
  },
  artist: {
    type: String,
    required: true,
    index: true  
  },
  song: {
    type: String,
    required: true,
    index: true  
  },
  reshares: {
    type: Number,
    required: true,
    default: 0
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String,
    required: true,
    enum: ['NYC', 'LA', 'Miami']
  },
  plays: {
    type: Number,
    required: true,
    default: 0
  },
  genre: {
    type: String,
    required: true,
    index: true  
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    // User references the users collection aka a foreign k
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tracks', tracksSchema);
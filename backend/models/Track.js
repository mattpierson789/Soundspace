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
    index: true
  },
  owner: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Track', tracksSchema);
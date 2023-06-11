const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tracksSchema = new Schema({
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
}, {
  timestamps: true
});

module.exports = mongoose.model('Tracks', tracksSchema);

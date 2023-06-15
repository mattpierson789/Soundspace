const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      posterImgUrl: {
        type: String,
        ref: 'User',
        required: true,
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Post', postSchema);
  

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const Post = require('../models/Post');

// Connects to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializePosts();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Initializes posts in the Post model
const initializePosts = async () => {
  console.log("Initializing posts...");
  await Post.updateMany({}, { $set: { content: '' } });

  console.log("Done!");
  mongoose.disconnect();
};

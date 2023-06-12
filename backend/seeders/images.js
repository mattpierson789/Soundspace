const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tracks = require('../models/Tracks');

const DEFAULT_PROFILE_IMAGE_URL = 'https://soundspace-seeds.s3.amazonaws.com/public/blank-profile-picture-g84ce38eb1_1280.png'; // <- Insert the S3 URL that you copied above here

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Initialize image fields in db
const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });
    
  console.log("Initializing Tweet image URLs...");
  await Tracks.updateMany({}, { trackImageUrls: [] });

  console.log("Done!");
  mongoose.disconnect();
}
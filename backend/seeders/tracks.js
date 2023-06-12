const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const Tracks = require('../models/Tracks');

// connects to MongoDb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeTracks();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Initializes tracks onto the Track model
const initializeTracks = async () => {
  console.log("Initializing tracks...");
  await Tracks.updateMany({}, { song: [] });

  console.log("Done!");
  mongoose.disconnect();
}
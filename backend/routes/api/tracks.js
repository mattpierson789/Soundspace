
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const { requireUser } = require('../../config/passport');
const validateTrackInput = require('../../validations/tracks');
const User = mongoose.model('User');

// const currentUser = req.user;

// const AWS = require('aws-sdk');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// Track index
router.get('/', async function(req, res, next) {
  try {
    const tracks = await Track.find()
      .populate("owner", "_id username")
      .sort({ createdAt: -1 });

    return res.json(tracks);
  } catch (err) {
    return res.json([]);
  }
});

// Get all tracks from specific user
router.get('/user/:username', async (req, res, next) => {
  let user;
  try {
      // user = await User.findById(req.params.userId);
      user = await User.findOne({ username: req.params.username });
      } catch (err) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: "No user found with that id" };
      return next(error);
  }
  try {
      const tracks = await Track.find({ owner: user._id })
          .sort({ createdAt: -1 })
          .populate("owner", "_id username");
          debugger
      return res.json(tracks);
  }
  catch (err) {
      return res.json([]);
  }
})

// Find the user by username and then make a anothe rquery in order to get the trackdata which then gets served to the frontend

// Track by Id
router.get('/:id', async function(req, res, next) {

  try { 
    const track = await Track.findById(req.params.id)
    .populate("owner", "_id username")
    return res.json(track);
  }
  catch (err) {
      const error = new Error('Track not found');
      error.statusCode = 404;
      error.errors = { message: "No track found with that id" };
      return next(error);
    }
  });


// Track by genre
router.get('/genre/:genre', async function(req, res, next) {
  Track.find({ genre: req.params.genre })

  // .sort('song') //  ----> We should sort on the front end
  .exec(function(err, tracks) {
    if (err) {
      next(err);
    } else {
      res.json(tracks);
    }
  });
});

// Track by location
router.get('./location/:location', async function(req, res, next) {
  Track.find({ location: req.params.location})
  .exec(function(err, tracks) {
    if (err) {
      next(err);
    } else {
      res.json(tracks);
    }
  });
})

// Create a track
router.post('/', requireUser, validateTrackInput, async (req, res, next) => {
  try {
    const { artist, song, location, genre, user} = req.body;
    debugger
    const newTrack = new Track({
      artist,
      song,
      location,
      genre,
      // owner: req.user._id
      // owner: currentUser._id
      owner: [user]
    });

    let track = await newTrack.save();
    track = await track.populate('owner', '_id username')
    return res.json(track);
  } catch (err) {
    next(err);
  }
});

// Add an owner to a track
router.post('/:id/owner/:userId', requireUser, async (req, res, next) => {
  debugger
  console.log("track not tyvan found")
  try {
    const trackId = req.params.id;
    const userId = req.params.userId;

    const track = await Track.findById(trackId);
    if (!track) {
      console.log("track not tyvan found")
      return res.status(404).json({ error: 'Track not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.log("user not tyvan found")
      return res.status(404).json({ error: 'User not found' });
    }

    track.owner.push(user);
    track.reshares+=1;
    await track.save();

    user.trackIds.push(track);
    await user.save();

    // Populate the owner field with the updated owner information
    const populatedTrack = await track.populate('owner', '_id username')

    return res.json(populatedTrack);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const trackId = req.params.id;
    const track = await Track.findById(trackId);

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    await Track.deleteOne({ _id: trackId });

    return res.status(200).json({ message: 'Track deleted successfully' });
  } catch (err) {
    next(err);
  }
});



module.exports = router;



/// <------------------------------------------------>

/* GET tweets listing. */
// router.get('/', async (req, res) => {
//   try {
//       const tweets = await Tweet.find()
//           .populate("author", "_id username")
//           .sort({ createdAt: -1 });
//       return res.json(tweets);
//   }
//   catch (err) {
//       return res.json([]);
//   }
// });

// router.get('/user/:userId', async (req, res, next) => {
//   let user;
//   try {
//       user = await User.findById(req.params.userId);
//   } catch (err) {
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       error.errors = { message: "No user found with that id" };
//       return next(error);
//   }
//   try {
//       const tweets = await Tweet.find({ author: user._id })
//           .sort({ createdAt: -1 })
//           .populate("author", "_id username");
//       return res.json(tweets);
//   }
//   catch (err) {
//       return res.json([]);
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try {
//       const tweet = await Tweet.findById(req.params.id)
//           .populate("author", "_id username");
//       return res.json(tweet);
//   }
//   catch (err) {
//       const error = new Error('Tweet not found');
//       error.statusCode = 404;
//       error.errors = { message: "No tweet found with that id" };
//       return next(error);
//   }
// });

// // Attach requireUser as a middleware before the route handler to gain access
// // to req.user. (requireUser will return an error response if there is no 
// // current user.) Also attach validateTweetInput as a middleware before the 
// // route handler.
// router.post('/', requireUser, validateTweetInput, async (req, res, next) => {
//   try {
//     const newTweet = new Tweet({
//       text: req.body.text,
//       author: req.user._id
//     });

//     let tweet = await newTweet.save();
//     tweet = await tweet.populate('author', '_id username');
//     return res.json(tweet);
//   }
//   catch(err) {
//     next(err);
//   }
// });

// module.exports = router;
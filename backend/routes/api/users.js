const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const { singleFileUpload, singleMulterUpload, multipleMulterUpload, multipleFilesUpload} = require("../../awsS3");
const { ResourceExplorer2 } = require('aws-sdk');
// import { useSelector } from 'react-redux'

const Track = mongoose.model('Track')


const DEFAULT_PROFILE_IMAGE_URL = 'https://soundspace-seeds.s3.amazonaws.com/public/blank-profile-picture-g84ce38eb1_1280.png';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

// POST /api/users/register
router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
// router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const profileImageUrl = req.file ? 
    await singleFileUpload({ file: req.file, public: true}) :
    DEFAULT_PROFILE_IMAGE_URL;
  const newUser = new User({
    username: req.body.username,
    profileImageUrl,
    email: req.body.email,
    location: 'NYC',
    name: 'kyle'
    // adjust to be dynamic later
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user)); 
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// POST /api/users/login
router.post('/login', singleMulterUpload(""), validateLoginInput, async (req, res, next) => {
// router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});
// module.exports = router;

router.get('/current', restoreUser, (req, res) => {
  debugger 
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  
  if (!req.user) return res.json(null);
  
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email,
    location: req.user.location,
    name: req.user.name
  });
  console.log(req.user._id);
  // console.log(req.user);
});

// needs authentication to post
// validate track input 
// require User? or Jwt iN ACTION REDUCER SUFFICIENT?


// const { artist, song, location, genre, user} = req.body;
//     debugger
//     const newTrack = new Track({
//       artist,
//       song,
//       location,
//       genre,
//       // owner: req.user._id
//       // owner: currentUser._id
//       owner: [user]
//     });

//     let track = await newTrack.save();
//     track = await track.populate('owner', '_id username')

// router.post('/upload-music', multipleMulterUpload(['audiofile', 'imagefile']), async (req, res, next) => {
//   // const { title, genre } = req.body;
//   const { userId } = req.body;

//   // const { userId } = req.session; 
//   const trackFile = req.files;
//   const trackImageFile = req.files;
  
//   try {
//     const uploadedTrackUrl = await singleFileUpload({ file: trackFile, public: true });
//     const uploadedImageUrl = await singleFileUpload({ file: trackImageFile, public: true });

//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const newTrack = new Track({
//       trackUrl: uploadedTrackUrl,
//       trackImageUrl: uploadedImageUrl,
//       owner: [user],
//     });

//     const track = await newTrack.save();

//     if (Array.isArray(user.trackIds)) {
//       user.trackIds.push(track);
//     } else {
//       user.trackIds = [track];
//     }

//     await user.save();

//     res.status(200).json({ message: 'Music file uploaded successfully!' });
//   } catch (error) {
//     console.error('An error occurred while uploading the music file', error);
//     next(error);
//   }
// });


router.post('/upload-music', multipleMulterUpload('files'), async (req, res, next) => {
  const { userId, title, genre } = req.body;
  const { files } = req;

  try {
    const uploadedTrackUrl = await singleFileUpload({ file: files[0], public: true });
    const uploadedImageUrl = await singleFileUpload({ file: files[1], public: true });

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newTrack = new Track({
      artist: user.username, 
      title: title,
      genre: genre,
      location: user.location,
      trackUrl: uploadedTrackUrl,
      trackImageUrl: uploadedImageUrl,
      owner: [user],
    });

    const track = await newTrack.save();

    if (Array.isArray(user.trackIds)) {
      user.trackIds.push(track);
    } else {
      user.trackIds = [track];
    }

    await user.save();

    res.status(200).json({ message: 'Music file uploaded successfully!' });
  } catch (error) {
    console.error('An error occurred while uploading the music file', error);
    next(error);
  }
});



module.exports = router;
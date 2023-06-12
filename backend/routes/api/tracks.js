
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Track = mongoose.model('Tracks');
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


router.get('/', function(req, res, next) {
  Track.find({}, function(err, tracks) {
    if (err) {
      next(err);
    } else {
      res.json(tracks);
    }
  });
});


router.get('/:trackId', function(req, res, next) {
  Track.findById(req.params.trackId, function(err, track) {
    if (err) {
      next(err);
    } else {
      res.json(track);
    }
  });
});


router.get('/genre/:genre', function(req, res, next) {
  Track.find({ genre: req.params.genre })
  .sort('song')
  .exec(function(err, tracks) {
    if (err) {
      next(err);
    } else {
      res.json(tracks);
    }
  });
});

module.exports = router;

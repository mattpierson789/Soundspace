const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateTrackInput = [
  check('artist')
    .exists({ checkFalsy: true })
    .withMessage('Artist is required'),
  check('song')
    .exists({ checkFalsy: true })
    .withMessage('Song is required'),
  check('location')
    .exists({ checkFalsy: true })
    .isIn(['NYC', 'LA', 'Miami'])
    .withMessage('Location must be one of NYC, LA, or Miami'),
  check('genre')
    .exists({ checkFalsy: true })
    .withMessage('Genre is required'),
  handleValidationErrors
];

module.exports = validateTrackInput;
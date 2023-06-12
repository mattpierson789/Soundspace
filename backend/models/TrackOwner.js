const mongoose = require('mongoose');
const trackOwnerSchema = new mongoose.Schema({
  track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const TrackOwner = mongoose.model('TrackOwner', trackOwnerSchema);
module.exports = TrackOwner;
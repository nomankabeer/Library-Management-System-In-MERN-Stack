var mongoose = require('mongoose');
var date = require('../scripts/Date')
var RacksSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    required: "Name is required",
    trim: true
  },
  description: {
    type: String,
    required: "Description is required",
  },
  create_at: {
    type: String,
    require: true,
    default: date.currentDateTimeSec
  }

});
var RacksSchema = mongoose.model('Racks', RacksSchema);
module.exports = RacksSchema;
var mongoose = require('mongoose');
var date = require('../scripts/Date')
var BookSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    required: [true , 'required' ],
    trim: true
  },
  description: {
    type: String,
    required: [true , 'required' ],
  },
  cover: {
    type: String,
    // required: "cover is required",
  },
  file: {
    type: String,
    // required: "File is required",
  },
  rack: 
    {
      required: [true , 'required' ],
      type: mongoose.Schema.Types.ObjectId,
      ref: "Racks" 
    } ,
    user: 
    {
      required: [true , 'required' ],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" 
    } ,
  created_at: {
    type: String,
    require: true,
    default: date.currentDateTimeSec
  }
});
var Book = mongoose.model('Book', BookSchema);
module.exports = Book;
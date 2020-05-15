var mongoose = require('mongoose');
var date = require('../scripts/Date')
var UserRole = require('../scripts/UserRole')

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: true,
    required: [true , 'required' ],
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    required: true,
    default: UserRole.User
  },
  is_active: {
    type: Number,
    required: true,
    default: 0
  },
  create_at: {
    type: String,
    require: true,
    default: date.currentDateTimeSec
  },
  updatetd_at: {
    type: String,
    require: true,
    default: date.currentDateTimeSec
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;




var UserModel = require('../models/User')
moderator = async (req , res , next) => {
  if(req.user.role_id === userRole.Moderator){
    next()
  }
  else{
    res.send({'message' : 'Access Denide'});
  }
}

module.exports = moderator

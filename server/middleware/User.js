var userRole = require('../scripts/UserRole')
user = (req , res , next) => {
  if(req.user.role_id === userRole.User){
    next()
  }
  else{
    res.send({'message' : 'Access Denide'});
  }
}

module.exports = user

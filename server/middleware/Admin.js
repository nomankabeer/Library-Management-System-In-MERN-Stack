var userRole = require('../scripts/UserRole')
admin = async (req , res , next) => {
  if(req.user.role_id === userRole.Admin){
    next()
  }
  else{
    res.send({'message' : 'Access Denide'});
  }
}

module.exports = admin

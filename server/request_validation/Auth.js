var UserModel = require('../models/User')

exports.UserExist = async (req , res , next) => {

  var errorMsg = false ;
    const user_email = await UserModel.exists({ email: req.body.email });
    const username = await UserModel.exists({ username: req.body.username });
    if(user_email){
      errorMsg = 'E-mail Already Exist';
    }
    else if(username) {
      errorMsg = 'Username Already Exist';
    }
    
    if(errorMsg){
      var json_response = {
        errors: {
            message: errorMsg,
            name: "ValidatorError",
          }
      };
      res.json(json_response).status(403).end()
    }
    else{
      next()
    }
}

var UserModel = require('../models/User')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');

exports.UserLogin = (req, res , next) => {
  req.body.password = crypto.createHash('md5').update(req.body.password).digest("hex")
  passport.authenticate('local', {session: false}, (err, user, info) => {
    // console.log(err);
    if (err || !user) {
        return res.status(400).json({
            message: info ? info.message : 'Login failed',
            user   : user
        });
    }

    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }
        const authToken = jwt.sign({ id: user._id , username: user.username,  password: user.password }, process.env.ACCESS_TOKEN_SECRET , {
           expiresIn: process.env.TOKEN_TIME_OUT // it will be expired after 30 seconds - "20d" 20 days - 10h 10 hours
     });
        return res.json({user , authToken});
    });
})
(req, res);
};


exports.UserRegister = async (req, res , next) => {

  let hash = crypto.createHash('md5').update(req.body.password).digest("hex")
  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: hash,
  }
  UserModel.create(userData, function (err, user) {
    if(err){   
      res.json(err)
    }
    else {
      message ="User created Sucessfully"
      res.json({user , message}).status(200).end()
    }
  })
};


exports.GetUser = async (req, res , next) => {
  res.json(req.user).status(200).end()
};



exports.updateUser = async (req, res , next) => {
  // res.json( req.body).status(200).end();
  var user_id = { _id: req.user._id };
  var user_data = {
    email: req.body.email,
    username: req.body.username,
  };
  // res.json(user_data).status(200).end();
  const d = await UserModel.findOneAndUpdate(user_id, user_data , function (err, user) {
    // res.json(user).status(200).end()
  }).then(response => {
    // console.log(response , 'ressssssss');
    var data = { success: "true" , user: response , message: "Profile updated"}
    res.json(data).status(200).end();
  }).catch(error => {
    var data = { success: "false" , error: error , message: "Something went wrong"}
    res.json(data).status(403).end()
  });
};


// var success = false;

    // if(user === null){
    //   res.json({success: success , 'message' : "Something went wrong please try again"})
    // }
    // else 
    // if(err === null){   
    //   res.json({success:success , "message" : "Something went wrong please try again"})
    // }
    
      // message ="User Profile Updated Sucessfully";
      // success = true;
      // res.json({user , message , success , err}).status(200).end()
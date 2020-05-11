var express = require('express');
var app = express();

var helmet = require('helmet')
app.use(helmet());

require('dotenv').config();
const db = require('./db/db');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./middleware/passport');
var passport = require('passport');

var AuthRoutes = require('./routes/AuthRoutes');
app.use('/auth', AuthRoutes);


var UserRoutes = require('./routes/UserRoutes');
app.use('/u', UserRoutes);

var ModeratorMiddleware = require('./middleware/Moderator')
var ModeratorRoutes = require('./routes/ModeratorRoutes');
app.use('/m', [passport.authenticate('jwt', {session: false}) , ModeratorMiddleware ], ModeratorRoutes);



var AdminMiddleware = require('./middleware/Admin')
var AdminRoutes = require('./routes/AdminRoutes');
app.use('/a', [passport.authenticate('jwt', {session: false}) , AdminMiddleware ], AdminRoutes);


app.get('/' , function(req, res , next){
    res.send('done')
})



  // allow-cors
  app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
      console.log(`Server running on port ${port}`)
  });
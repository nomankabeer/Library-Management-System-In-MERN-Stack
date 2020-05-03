var express = require('express');
var app = express();

app.get('/' , function(req, res , next){
    res.send('done')
})


  const port = 5000;
  app.listen(port, () => {
      console.log(`Server running on port ${port}`)
  });
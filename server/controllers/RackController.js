var RackModel = require('../models/Racks')


exports.getRacks = async (req, res , next) => {
  RackModel.find( function (err, rack) {
    if(rack == null){
      res.json({'message' : "Rack not Found"})
    }
    else if(err){   
      res.json(err)
    }
    else {
      message ="Racks Found"
      res.json({rack , message}).status(200).end()
    }
  })
};


exports.createRack = async (req, res , next) => {
  var rackData = {
    name: req.body.name,
    description: req.body.description,
  }
  RackModel.create(rackData, function (err, rack) {
    if(err){   
      res.json(err)
    }
    else {
      message ="Rack created Sucessfully"
      res.json({rack , message}).status(200).end()
    }
  })
};

exports.deleteRack = async (req, res , next) => {
  var rackData = {
    _id: req.params.rack_id
  }
  RackModel.findOneAndDelete(rackData, function (err, rack) {
    if(rack == null){
      res.json({'message' : "Rack not Found"})
    }
    else if(err){   
      res.json(err)
    }
    else {
      message ="Rack Deleted Sucessfully"
      res.json({rack , message}).status(200).end()
    }
  })
};


exports.updateRack = async (req, res , next) => {
  var rackId = {
    _id: req.params.rack_id
  }
  var rackData = {
    name: req.body.name,
    description: req.body.description,
  }
  await RackModel.findOneAndUpdate(rackId, rackData , function (err, rack) {
    if(rack == null){
      res.json({'message' : "Rack not Found"})
    }
    else if(err){   
      res.json(err)
    }
    else {
      message ="Rack Updated Sucessfully"
      res.json({rack , message}).status(200).end()
    }
  })
};


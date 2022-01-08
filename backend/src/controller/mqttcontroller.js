const mqttData = require('../models/mqtt');
const mqtt = require('mqtt');

exports.getResults = async (req, res , next)=> {
    mqttData.find({}, function(err, data) {
      res.json(data);      });
};

exports.addmqtt = (infos)=> {
  mqttData.createmqtt(infos);
};
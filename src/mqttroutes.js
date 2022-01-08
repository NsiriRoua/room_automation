var express = require('express');

var router = express.Router();
var MqttData = require('./controller/mqttcontroller')
var mqtt = require('mqtt')
/* GET mqtt listing. */

//Connection to MQTT
const client = mqtt.connect('mqtt://mqtt.roomautomationcot.me', {
  port: 8883,
  username: '',
  password: ''
});
//On received MQTT message
client.on('message', function (topic, message) {
    //Saving received data to MongoDB
    var mongomqttdata = {
      topic: topic,
      payload: message.toString()
    };
    const saved = MqttData.addmqtt(mongomqttdata)
    console.log("a new message is received from your sensors")
  });

router.get('/',[MqttData.getResults]);

module.exports = router;
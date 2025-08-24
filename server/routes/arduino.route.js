const ArduinoController = require('../controllers/arduino.controller')

module.exports = app => {
   app.post('/send-text', ArduinoController.sendToArduino);
}
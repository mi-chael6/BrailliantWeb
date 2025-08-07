const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const arduinoPort = new SerialPort({
    path: 'COM1',  // PAPALITAN NALANG
    baudRate: 9600,
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', data => {
    console.log('From Arduino:', data);
});

const sendToArduino = (req, res) => {
    const { message } = req.body;
    console.log('Message to arduino:', message);
    if (arduinoPort.writable) {
        console.log('arduino is writable')
        const lines = message.split('\n');
        for (let line of lines) {
            if (line.trim() !== '') {
                console.log('Sending to Arduino:', line.trim());
                arduinoPort.write(line.trim() + '\n');
            }
        }
        res.send({ status: 'sent', message: lines });
    } else {
        res.status(500).send({ error: 'Arduino not writable' });
    }
};

module.exports = { sendToArduino };

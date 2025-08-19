/*const { SerialPort } = require('serialport');
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
*/


let arduinoPort = null;
let parser = null;

if (process.env.NODE_ENV === "development") {
    const { SerialPort } = require("serialport");
    const { ReadlineParser } = require("@serialport/parser-readline");

    try {
        arduinoPort = new SerialPort({
            path: "COM1",  // change if needed locally
            baudRate: 9600,
        });

        parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\n" }));

        parser.on("data", (data) => {
            console.log("From Arduino:", data);
        });

        console.log("Arduino serial connection initialized.");
    } catch (err) {
        console.error("Could not open COM1:", err.message);
    }
} else {
    console.log("Skipping Arduino serial connection in production.");
}


const sendToArduino = (req, res) => {
    const { message } = req.body;
    console.log("Message to Arduino:", message);

    if (arduinoPort && arduinoPort.writable) {
        console.log("Arduino is writable");
        const lines = message.split("\n");
        for (let line of lines) {
            if (line.trim() !== "") {
                console.log("Sending to Arduino:", line.trim());
                arduinoPort.write(line.trim() + "\n");
            }
        }
        res.send({ status: "sent", message: lines });
    } else {
        res.status(500).send({ error: "Arduino not available or not writable" });
    }
};

module.exports = { sendToArduino };

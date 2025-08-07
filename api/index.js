const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const serverless = require('serverless-http');

const app = express();
const port = 8000;

const fs = require('fs');
const path = require('path');

const pdfParse = require('pdf-parse')

const nodemailer = require('nodemailer')

// const helmet = require('helmet');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');

// app.use(helmet());             
// app.use(xss());               
// app.use(mongoSanitize());  

const louPath = `"C:\\Users\\micha\\Downloads\\liblouis-3.34.0-win64\\bin\\lou_translate.exe"`;
const table = `"C:\\Users\\micha\\Downloads\\liblouis-3.34.0-win64\\share\\liblouis\\tables\\en-us-g2.ctb"`;
const tempTxtPath = "C:\\Users\\micha\\Downloads\\test.txt"; // Example input
const brfFilePath = "C:\\Users\\micha\\Downloads\\output.brf"; // Example output

const cmd = `${louPath} ${table} "${tempTxtPath}" > "${brfFilePath}"`;






app.use('/files', express.static("files"))

app.use(express.json());

require("./config/mongoose.config")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

const AllUserRoutes = require('./routes/user.route')
AllUserRoutes(app)

const AllBookRoutes = require('./routes/book.route')
AllBookRoutes(app)

const AllAdminRoutes = require('./routes/admin.route')
AllAdminRoutes(app)

const AllAuditTrailRoutes = require('./routes/audit_trail.route')
AllAuditTrailRoutes(app)

const AllSectionRoutes = require('./routes/section.route')
AllSectionRoutes(app)

const allStudentRoutes = require('./routes/student.route')
allStudentRoutes(app)

const allRequestBookRoutes = require('./routes/request_book.route')
allRequestBookRoutes(app)

const AuthRoutes = require('./routes/login.route');
AuthRoutes(app);

const ArduinoRoutes = require('./routes/arduino.route');
ArduinoRoutes(app);

const EmailRoutes = require('./routes/email.route');
EmailRoutes(app);


app.listen(port, () => {
    console.log('server is running', port)
})


app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express API!' });
});

module.exports = serverless(app);

///////////////////////////////////////////////////////////////////////////////////////////////////

/*

const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');


app.use(cors());
app.use(bodyParser.json());

const arduinoPort = new SerialPort({
    path: 'COM1',  //JIRO PALITAN MO NALANG TO DEPENDE SA PORT. HINDI KO ALAM WALA NA KO ALAM
    baudRate: 9600,
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', data => {
    console.log('From Arduino:', data);
});


app.post('/send-text', (req, res) => {
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
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

*/



//////////////////////////////////////////////////////////////////////////////////////
















const multer = require('multer');
const { useRef } = require("react");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})


require("./models/file.model")
const FileSchema = mongoose.model("File")

require("./models/book.model")
const Book = mongoose.model("Book")

require("./models/requst_book.model")
const RequestBook = mongoose.model("RequestBook")

require("./models/user.model")
const User = mongoose.model("User")
/*
app.put('/upload-files/:id', upload.single("file"), async (req, res) => {
    console.log(req.file)
    res.send("HI")

    try {
        const fileName = req.file.filename;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { book_file: fileName },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
})
*/

/*
app.put('/upload-requestfiles/:id', upload.single("file"), async (req, res) => {
    console.log(req.file)


    try {
        const fileName = req.file.filename;

        const updatedBook = await RequestBook.findByIdAndUpdate(
            req.params.id,
            { request_book_file: fileName },
            { new: true, runValidators: true }
        );
        res.send("HI")
        res.json({ status: "ok", book: updatedBook });

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
})
*/
/*
app.get("/get-files", async (req, res) => {
    try {
        Book.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
    }
})

app.get("/get-requestfiles", async (req, res) => {
    try {
        RequestBook.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
    }
})
*/



require('./models/image.model')
const Images = mongoose.model('Image')

const storages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../src/images/")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})

const uploads = multer({ storage: storages })
/*
app.put('/upload-image/:id', uploads.single('image'), async (req, res) => {
    console.log(req.body)
    const imageName = req.file.filename

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { book_img: imageName },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook });
    } catch (error) {
        res.json({ status: 'error' })
    }
})
*/

/*
app.put('/upload-requestimage/:id', uploads.single('image'), async (req, res) => {
    console.log(req.body)
    const imageName = req.file.filename

    try {
        const updatedBook = await RequestBook.findByIdAndUpdate(
            req.params.id,
            { request_book_img: imageName },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", book: updatedBook });
    } catch (error) {
        res.json({ status: 'error' })
    }
})
*/

/*
app.put('/upload-profile-icon/:id', uploads.single('image'), async (req, res) => {
    console.log(req.body)
    const imageName = req.file.filename

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { user_img: imageName },
            { new: true, runValidators: true }
        );

        res.json({ status: "ok", user: updateUser });
    } catch (error) {
        res.json({ status: 'error' })
    }
})
*/

app.get('/get-image', async (req, res) => {
    try {
        Images.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
        res.json({ status: 'error' })

    }
})
/*
app.get('/get-requestimage', async (req, res) => {
    try {
        RequestBook.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
        res.json({ status: 'error' })

    }
})
*/

/*
app.get('/get-profile-icon', async (req, res) => {
    try {
        User.find({}).then(data => {
            res.send({ status: 'ok', data: data })
        })
    } catch (error) {
        res.json({ status: 'error' })

    }
})
*/







/*

app.post('/extract-text', async (req, res) => {
    const { filename } = req.body;

    if (!filename) {
        return res.status(400).send('Filename not provided');
    }

    const filePath = path.join(__dirname, 'files', filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    try {
        const fileBuffer = fs.readFileSync(filePath);
        const result = await pdfParse(fileBuffer);
        res.send(result.text);
    } catch (error) {
        console.error('Error parsing PDF:', error);
        res.status(500).send('Error parsing PDF');
    }
});
*/
/*
app.post('/send-email', async (req, res) => {
    const { subject, text, html } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'michaeljosephmelo464@gmail.com',
            pass: 'wdpb tgwe judq tjyw'
        }
    });

    try {
        const info = await transporter.sendMail({
            from: '"Braille Translator" <braille@example.com>',
            to: 'michaeljosephmelo464@gmail.com',
            subject: subject || "No Subject",
            text: text || "Plain text content",
            html: html || "<b>No HTML content</b>"
        });

        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("Email sent:", info.messageId);
        console.log("Preview:", previewUrl);

        res.json({
            success: true,
            message: 'Email sent successfully!',
            previewUrl
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});
*/




const { exec } = require('child_process');

const upload = multer({ dest: 'uploads/' }); // Temporary folder

app.post('/upload-pdf-to-brf', upload.single('file'), async (req, res) => {
    try {
        const pdfPath = req.file.path;
        const pdfOriginalName = path.parse(req.file.originalname).name; // e.g., "MyFile"
        const pdfBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(pdfBuffer);

        const text = data.text;
        const tempTxtPath = `temp_${Date.now()}.txt`;
        const brfFilePath = `output_${Date.now()}.brf`;

        fs.writeFileSync(tempTxtPath, text, 'utf8');

        const louPath = `"C:\\Users\\micha\\Downloads\\liblouis-3.34.0-win64\\bin\\lou_translate.exe"`;
        const table = `"C:\\Users\\micha\\Downloads\\liblouis-3.34.0-win64\\share\\liblouis\\tables\\en-us-g2.ctb"`;
        const cmd = `${louPath} --forward ${table} < ${tempTxtPath} > ${brfFilePath}`;

        exec(cmd, (error, stdout, stderr) => {
            fs.unlinkSync(tempTxtPath); // Clean temp .txt

            if (error) {
                console.error(stderr);
                return res.status(500).json({ error: 'Translation failed.' });
            }

            const brfDownloadName = `${pdfOriginalName}.brf`; // ← use the PDF name

            res.download(brfFilePath, brfDownloadName, (err) => {
                if (!err) {
                    fs.unlinkSync(pdfPath);       // Clean uploaded PDF
                    fs.unlinkSync(brfFilePath);   // Clean .brf
                }
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});







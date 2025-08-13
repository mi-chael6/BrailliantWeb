const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

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
// app.use(mongoSanitize());  //

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

const BookReadRoutes = require('./routes/book_read.route');
BookReadRoutes(app);


app.listen(port, () => {
    console.log('server is running', port)
})

app.get("/", async (req, res) => {
    res.json("Hello")
})








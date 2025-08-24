require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { exec } = require("child_process");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("files"));

// Database + Config
require("./config/mongoose.config");
require("./config/cloudinary.config");

// Routes
require("./routes/user.route")(app);
require("./routes/book.route")(app);
require("./routes/admin.route")(app);
require("./routes/audit_trail.route")(app);
require("./routes/section.route")(app);
require("./routes/student.route")(app);
require("./routes/request_book.route")(app);
require("./routes/login.route")(app);
require("./routes/arduino.route")(app);
require("./routes/email.route")(app);
require("./routes/book_read.route")(app);

// Multer setup (temp storage for uploaded files)
const upload = multer({ dest: "uploads/" });

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

app.post("/upload-pdf-to-brf", upload.single("file"), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const pdfOriginalName = path.parse(req.file.originalname).name;

    // extract text from PDF
    const pdfBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    const brfFilePath = `output_${Date.now()}.brf`;

    // use lou_translate with forward translation and English Grade 2 table
    const table = "/usr/share/liblouis/tables/en-us-g2.ctb"; // adjust path if needed
    const child = spawn("lou_translate", ["--forward", table]);

    // pipe stdout to file
    const outputStream = fs.createWriteStream(brfFilePath);
    child.stdout.pipe(outputStream);

    // pipe stderr for debugging
    child.stderr.on("data", (data) => {
      console.error("lou_translate error:", data.toString());
    });

    // write text to stdin
    child.stdin.write(text);
    child.stdin.end();

    child.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Translation failed" });
      }

      const brfDownloadName = `${pdfOriginalName}.brf`;
      res.download(brfFilePath, brfDownloadName, (err) => {
        if (!err) {
          fs.unlinkSync(pdfPath);
          fs.unlinkSync(brfFilePath);
        }
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.json("Server is running");
});
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
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

// Health check
app.get("/", (req, res) => {
  res.json("Server is running");
});

// Multer setup (temp storage for uploaded files)
const upload = multer({ dest: "uploads/" });

// PDF → BRF conversion endpoint
app.post("/upload-pdf-to-brf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const pdfPath = req.file.path;
    const pdfOriginalName = path.parse(req.file.originalname).name;

    // Extract text from PDF
    const pdfBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(pdfBuffer);

    const tempTxtPath = `temp_${Date.now()}.txt`;
    const brfFilePath = `output_${Date.now()}.brf`;

    fs.writeFileSync(tempTxtPath, data.text, "utf8");

    // Run lou_translate (redirect stdout → output file)
    const louPath = "lou_translate";
    const table = "/usr/share/liblouis/tables/en-us-g2.ctb";
    const cmd = `${louPath} ${table} "${tempTxtPath}" > "${brfFilePath}"`;

    exec(cmd, (error, stdout, stderr) => {
      // Clean temp input no matter what
      fs.unlinkSync(tempTxtPath);

      if (error) {
        console.error("Translation error:", stderr);
        return res.status(500).json({ error: "Translation failed" });
      }

      const brfDownloadName = `${pdfOriginalName}.brf`;

      res.download(brfFilePath, brfDownloadName, (err) => {
        // Clean temp files after response
        try {
          fs.unlinkSync(pdfPath);
          fs.unlinkSync(brfFilePath);
        } catch (cleanupErr) {
          console.warn("Cleanup error:", cleanupErr);
        }
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

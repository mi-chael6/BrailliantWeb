const fs = require('fs');
const path = require('path');

const convertTextToBrf = async (req, res) => {
  const { text } = req.body; // or extracted from PDF
  try {
    const tableSpec = "en-us-brf.dis"; // output BRF standard table
    const braille = liblouis.translateString(tableSpec, text);
    const filename = `output-${Date.now()}.brf`;
    const filePath = path.join(__dirname, '..', 'files', filename);s
    fs.writeFileSync(filePath, braille, 'utf8');
    res.json({ success: true, brfFile: filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { convertTextToBrf };

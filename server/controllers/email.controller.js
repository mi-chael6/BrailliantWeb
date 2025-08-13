const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { subject, text, html, email } = req.body;

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
            to:  email,
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
};

module.exports = { sendEmail };

const nodemailer = require('nodemailer');

// For development, we'll just log the "email" to console
// In production, use a real SMTP service
const sendEmail = async (options) => {
    console.log('--- EMAIL SIMULATION ---');
    console.log(`TO: ${options.email}`);
    console.log(`SUBJECT: ${options.subject}`);
    console.log(`MESSAGE: ${options.message}`);
    console.log('------------------------');
    
    // If you want to use ethereal.email or a real SMTP, 
    // uncomment and configure the transporter below:
    /*
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: '"Tranxact Support" <support@tranxact.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
    */
    
    return true;
};

module.exports = sendEmail;

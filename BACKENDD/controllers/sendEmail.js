const nodemailer = require('nodemailer');

// Nodemailer configuration (Ethereal SMTP details)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail's SMTP service
  auth: {
    user: 'ankushscs645852@gmail.com', // Your Gmail address
    pass: 'mpad zwxq xddj cana'
        // Your Gmail password or app password
  }
});
// Function to send an email to a user
exports.sendEmailToUser = async (user) => {
  // Ensure user object has necessary fields
  if (!user.email) {
    console.error('User name or email is missing');
    return { success: false, message: 'User name or email is missing' };
  }

  const mailOptions = {
    from: 'glennie.feest@ethereal.email', // Use the email from your SMTP configuration
    to: user.email,                       // Recipient email (the user's email)
    subject: 'Payment Notification',      // Subject line
    text: `Hello ${user.email},\n\nYour payment has been successfully processed!\n\nBest regards,\nYour Company` // Email body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email} (${user.email}): ${info.messageId}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send email to ${user.email} (${user.email}): ${error.message}`);
    return { success: false, message: error.message };
  }
};

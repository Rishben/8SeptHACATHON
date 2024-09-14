const express = require('express');
const router = express.Router();
const User=require('../models/User')
const {sendEmailToUser} = require('../controllers/sendEmail');

router.post('/api/send-email', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
  
      // Send payments to each user
      for (const user of users) {
        await sendEmailToUser(user);
      }
  
      res.json({ success: true, message: 'Payments sent successfully to all users!' });
    } catch (error) {
      console.error('Error sending payments:', error);
      res.json({ success: false, message: 'Failed to send payments.' });
    }
  });
  
  module.exports = router;


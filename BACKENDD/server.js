const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();
const emailRouter=require('./routes/emailRouter')
const app = express();
connectDB();

// Enable CORS for all origins (or specify the origin)
app.use(cors());

app.use(express.json({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/',emailRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

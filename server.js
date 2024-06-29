

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import CORS middleware
const { logger, logevents } = require('./middleware/logger');
const errorhandler = require('./middleware/errorhandler');
const connectDB = require('./config/dbConn');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(logger);
app.use(cors({
  origin: 'https://outpasspro.onrender.com', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set cache-control headers to prevent caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
  res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
  res.setHeader('Expires', '0'); // Proxies.
  next();
});

// Routes
app.use('/', require('./routes/root')); 
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/outpass', require('./routes/outpassRoutes')); 

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 not found' });
    } else {
        res.type('txt').send('404 not found');
    }
});

app.use(errorhandler);

const port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', error => {
    console.error('MongoDB connection error:', error);
    logevents(`${error.no} ${error.code} ${error.syscall} ${error.hostname}`, 'mongoErrLog.log');
});

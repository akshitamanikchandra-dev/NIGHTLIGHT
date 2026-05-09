const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logger
app.use(express.json()); // Body parser

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', process.env.CLIENT_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// Routes
app.use('/api', postRoutes); // Mounts /api/posts, /api/vent
app.use('/api/chat', chatRoutes); // Mounts /api/chat

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT} 🛡️
  ################################################
  `);
});

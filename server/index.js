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
app.use(cors({
  origin: true, // Allow all origins for simplicity in deployment
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

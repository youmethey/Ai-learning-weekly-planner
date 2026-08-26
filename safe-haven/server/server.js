import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import locationsRouter from './routes/locations.js';
import hangoutsRouter from './routes/hangouts.js';
import contactsRouter from './routes/contacts.js';
import profileRouter from './routes/profile.js';
import safetyRouter from './routes/safety.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/locations', locationsRouter);
app.use('/api/hangouts', hangoutsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/safety', safetyRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'SafeHaven API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🌸 SafeHaven Server running securely on http://localhost:${PORT}`);
    console.log(`✨ API Endpoints ready: /api/locations, /api/hangouts, /api/contacts, /api/profile, /api/safety`);
  });
}

startServer();

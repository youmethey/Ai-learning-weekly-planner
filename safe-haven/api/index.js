import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../server/config/db.js';

import locationsRouter from '../server/routes/locations.js';
import hangoutsRouter from '../server/routes/hangouts.js';
import contactsRouter from '../server/routes/contacts.js';
import profileRouter from '../server/routes/profile.js';
import safetyRouter from '../server/routes/safety.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Initialize DB connection
connectDB().catch(err => console.log('DB init notice:', err.message));

// API Routes
app.use('/api/locations', locationsRouter);
app.use('/api/hangouts', hangoutsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/safety', safetyRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'SafeHaven API on Vercel',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

export default app;

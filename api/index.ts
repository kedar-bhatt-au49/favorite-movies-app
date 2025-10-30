import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

// Import routes
import entryRoutes from '../routes/entries';
import authRoutes from '../routes/auth';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://favorite-movies-j3k33y3j8-kedars-projects-f337497c.vercel.app',
        'https://favorite-movies-kedar.vercel.app'
      ]
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/entries', entryRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$connect();
    await prisma.user.count(); // Simple query to test DB
    res.json({ 
      status: 'OK', 
      message: 'Server is running!',
      database: 'Connected'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Server running but database connection failed',
      database: 'Disconnected'
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Export for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};

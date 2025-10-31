import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory user storage (shared with other auth endpoints)
let users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}> = [
  {
    id: 'demo-user',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method === 'GET') {
      // Check for auth token
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'No token provided'
        });
      }
      
      // Extract user ID from token (format: token-{userId})
      const userId = token.replace('token-', '');
      
      // Find user by ID
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid token'
        });
      }
      
      // Return user data (without password)
      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  } catch (error) {
    console.error('Auth Me API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

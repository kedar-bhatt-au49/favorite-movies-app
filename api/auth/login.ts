import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory user storage (shared with register.ts)
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

    if (req.method === 'POST') {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }
      
      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password'
        });
      }
      
      console.log('User logged in:', user.email);
      
      return res.status(200).json({
        success: true,
        data: {
          token: `token-${user.id}`,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        }
      });
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  } catch (error) {
    console.error('Login API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// Export users for consistency
export { users };

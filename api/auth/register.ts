import type { VercelRequest, VercelResponse } from '@vercel/node';
import { users, findUserByEmail, addUser } from '../dataStore';

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
      const { email, password, name } = req.body;
      
      // Validate input
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          error: 'Email, password, and name are required'
        });
      }
      
      // Check if user already exists
      const existingUser = findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User with this email already exists'
        });
      }
      
      // Create new user
      const newUser = addUser({
        email,
        password, // In production, hash this password
        name
      });
      
      console.log('New user registered:', newUser.email);
      
      return res.status(201).json({
        success: true,
        data: {
          token: `token-${newUser.id}`,
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name
          }
        }
      });
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  } catch (error) {
    console.error('Register API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

// Export users for use in other API endpoints
export { users };

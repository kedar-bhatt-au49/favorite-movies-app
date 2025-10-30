import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }

    if (req.method === 'POST') {
      // Mock authentication
      const { email, password } = req.body
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        })
      }
      
      if (email === 'demo@example.com' && password === 'demo123') {
        return res.status(200).json({
          success: true,
          data: {
            token: 'demo-jwt-token',
            user: {
              id: 'demo-user',
              email: 'demo@example.com',
              name: 'Demo User'
            }
          }
        })
      }
      
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      })
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    })
  } catch (error) {
    console.error('Login API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

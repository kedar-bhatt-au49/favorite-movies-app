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
      const { email, password, name } = req.body
      
      // Validate input
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          error: 'Email, password, and name are required'
        })
      }
      
      return res.status(201).json({
        success: true,
        data: {
          token: 'demo-jwt-token',
          user: {
            id: `user-${Date.now()}`,
            email,
            name
          }
        }
      })
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    })
  } catch (error) {
    console.error('Register API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
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

  return res.status(405).json({ error: 'Method not allowed' })
}

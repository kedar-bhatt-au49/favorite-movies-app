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
    const { email, password, name } = req.body
    
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

  return res.status(405).json({ error: 'Method not allowed' })
}

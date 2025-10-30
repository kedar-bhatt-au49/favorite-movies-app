import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // API status endpoint
  try {
    res.status(200).json({
      success: true,
      message: 'Favorite Movies API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        entries: '/api/entries',
        login: '/api/auth/login',
        register: '/api/auth/register'
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

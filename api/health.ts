import type { VercelRequest, VercelResponse } from '@vercel/node';

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

    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        status: 'healthy',
        message: 'API is running smoothly',
        timestamp: new Date().toISOString(),
        environment: 'production'
      })
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    })
  } catch (error) {
    console.error('Health check error:', error)
    return res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: 'Internal server error'
    })
  }
}

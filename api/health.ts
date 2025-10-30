import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Simple health check for now
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Vercel API is working!',
      timestamp: new Date().toISOString()
    });
  }
  
  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}

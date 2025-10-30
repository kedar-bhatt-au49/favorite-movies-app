import type { VercelRequest, VercelResponse } from '@vercel/node'

// Mock data
const entries = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    year: 1994,
    director: 'Frank Darabont',
    watchedDate: '2024-01-15',
    userId: 'demo-user'
  },
  {
    id: '2',
    title: 'The Godfather',
    genre: 'Crime',
    rating: 9.2,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    year: 1972,
    director: 'Francis Ford Coppola',
    watchedDate: '2024-01-20',
    userId: 'demo-user'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    genre: 'Action',
    rating: 9.0,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    year: 2008,
    director: 'Christopher Nolan',
    watchedDate: '2024-01-25',
    userId: 'demo-user'
  }
]

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
        data: entries
      })
    }

    if (req.method === 'POST') {
      const newEntry = {
        id: Date.now().toString(),
        ...req.body,
        userId: 'demo-user'
      }
      entries.push(newEntry)
      return res.status(201).json({
        success: true,
        data: newEntry
      })
    }

    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    })
  } catch (error) {
    console.error('Entries API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

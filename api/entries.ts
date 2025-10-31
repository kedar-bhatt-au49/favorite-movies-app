import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock data - simplified for debugging
let entries = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    type: 'MOVIE',
    genre: 'Drama',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years.',
    posterUrl: 'https://via.placeholder.com/300x450',
    year: 1994,
    director: 'Frank Darabont',
    duration: '142 min',
    location: 'Ohio State Reformatory',
    budget: '$25 million',
    watchedDate: '2024-01-15',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    userId: 'demo-user'
  },
  {
    id: '2',
    title: 'The Godfather',
    type: 'MOVIE',
    genre: 'Crime',
    rating: 9.2,
    description: 'The aging patriarch of an organized crime dynasty.',
    posterUrl: 'https://via.placeholder.com/300x450',
    year: 1972,
    director: 'Francis Ford Coppola',
    duration: '175 min',
    location: 'New York City',
    budget: '$6 million',
    watchedDate: '2024-01-20',
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z',
    userId: 'demo-user'
  }
];

// Helper function to get user ID from token
function getUserIdFromToken(req: VercelRequest): string | null {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token || !token.startsWith('token-')) {
    return null;
  }
  
  return token.replace('token-', '');
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Entries API called with method:', req.method);
    console.log('Request URL:', req.url);

    // Get user ID from token for authenticated requests
    const userId = getUserIdFromToken(req);
    console.log('User ID from token:', userId);

    // Parse URL for specific entry ID
    const urlPath = req.url || '';
    const entryIdMatch = urlPath.match(/\/api\/entries\/(.+)$/);
    const entryId = entryIdMatch ? entryIdMatch[1] : null;

    console.log('Entry ID from URL:', entryId);

    // Handle individual entry operations
    if (entryId) {
      const entryIndex = entries.findIndex(entry => entry.id === entryId);
      const entry = entries[entryIndex];

      if (req.method === 'GET') {
        if (!entry) {
          console.log('Entry not found for ID:', entryId);
          return res.status(404).json({
            success: false,
            error: 'Entry not found'
          });
        }
        
        console.log('Returning single entry:', entry.id);
        return res.status(200).json({
          success: true,
          data: entry
        });
      }

      if (req.method === 'PUT') {
        if (!userId) {
          return res.status(401).json({
            success: false,
            error: 'Authentication required'
          });
        }

        if (!entry) {
          return res.status(404).json({
            success: false,
            error: 'Entry not found'
          });
        }

        // Check if user owns this entry
        if (entry.userId !== userId) {
          return res.status(403).json({
            success: false,
            error: 'You can only edit your own entries'
          });
        }

        const updatedEntry = {
          ...entry,
          ...req.body,
          id: entry.id,
          userId: entry.userId,
          createdAt: entry.createdAt,
          updatedAt: new Date().toISOString()
        };

        entries[entryIndex] = updatedEntry;
        console.log('Updated entry:', updatedEntry.id);

        return res.status(200).json({
          success: true,
          data: updatedEntry
        });
      }

      if (req.method === 'DELETE') {
        if (!userId) {
          return res.status(401).json({
            success: false,
            error: 'Authentication required'
          });
        }

        if (!entry) {
          return res.status(404).json({
            success: false,
            error: 'Entry not found'
          });
        }

        // Check if user owns this entry
        if (entry.userId !== userId) {
          return res.status(403).json({
            success: false,
            error: 'You can only delete your own entries'
          });
        }

        entries.splice(entryIndex, 1);
        console.log('Deleted entry:', entryId);

        return res.status(200).json({
          success: true,
          message: 'Entry deleted successfully'
        });
      }

      return res.status(405).json({
        success: false,
        error: 'Method not allowed for individual entry'
      });
    }

    // Handle collection operations (GET all, POST new)
    if (req.method === 'GET') {
      // Return all entries (could be filtered by user if needed)
      console.log('Returning all entries, count:', entries.length);
      return res.status(200).json({
        success: true,
        data: {
          entries: entries,
          pagination: {
            total: entries.length,
            totalEntries: entries.length,
            page: 1,
            limit: 10,
            pages: 1,
            hasMore: false,
            currentPage: 1
          }
        }
      });
    }

    if (req.method === 'POST') {
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required to create entries'
        });
      }

      console.log('Creating new entry with data:', req.body);
      console.log('Creating entry for user:', userId);
      
      const now = new Date().toISOString();
      const newEntry = {
        id: Date.now().toString(),
        ...req.body,
        // Add default values for missing fields
        genre: req.body?.genre || 'Unknown',
        rating: req.body?.rating || 0,
        // Ensure proper field names
        posterUrl: req.body?.posterUrl || req.body?.poster || '',
        watchedDate: req.body?.watchedDate || now.split('T')[0],
        createdAt: now,
        updatedAt: now,
        userId: userId // Associate entry with the logged-in user
      };
      
      entries.push(newEntry);
      console.log('Created new entry:', newEntry.id, 'for user:', userId);
      
      return res.status(201).json({
        success: true,
        data: newEntry
      });
    }

    console.log('Method not allowed:', req.method);
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('Entries API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

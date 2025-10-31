// Shared data store for all serverless functions
// In production, this would be replaced with a real database

// Users storage
export let users: Array<{
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}> = [
  {
    id: 'demo-user',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Entries storage
export let entries: Array<{
  id: string;
  title: string;
  type: string;
  genre: string;
  rating: number;
  description: string;
  posterUrl: string;
  year: number;
  director: string;
  duration: string;
  location: string;
  budget: string;
  watchedDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}> = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    type: 'MOVIE',
    genre: 'Drama',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years.',
    posterUrl: 'https://via.placeholder.com/300x450/666666/ffffff?text=Shawshank',
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
    posterUrl: 'https://via.placeholder.com/300x450/666666/ffffff?text=Godfather',
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
export function getUserIdFromToken(authHeader?: string): string | null {
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  
  if (!token || !token.startsWith('token-')) {
    return null;
  }
  
  return token.replace('token-', '');
}

// Helper function to find user by ID
export function findUserById(userId: string) {
  return users.find(user => user.id === userId);
}

// Helper function to find user by email
export function findUserByEmail(email: string) {
  return users.find(user => user.email === email);
}

// Helper function to add new user
export function addUser(userData: Omit<typeof users[0], 'id' | 'createdAt'>) {
  const newUser = {
    id: `user-${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  return newUser;
}

// Helper function to add new entry
export function addEntry(entryData: Omit<typeof entries[0], 'id' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  const newEntry = {
    id: Date.now().toString(),
    ...entryData,
    createdAt: now,
    updatedAt: now
  };
  
  entries.push(newEntry);
  return newEntry;
}

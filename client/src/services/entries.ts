import api from '../lib/api';
import { Entry, EntriesResponse, ApiResponse } from '../types';
import { EntryFormData } from '../lib/validation';

export interface GetEntriesParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'MOVIE' | 'TV_SHOW';
}

export const entriesApi = {
  // Get all entries with pagination and filtering
  getEntries: async (params: GetEntriesParams = {}): Promise<EntriesResponse> => {
    const { data } = await api.get<ApiResponse<EntriesResponse>>('/entries', { params });
    return data.data;
  },

  // Get single entry by ID
  getEntry: async (id: string): Promise<Entry> => {
    const { data } = await api.get<ApiResponse<Entry>>(`/entries/${id}`);
    return data.data;
  },

  // Create new entry
  createEntry: async (entryData: EntryFormData, posterFile?: File): Promise<Entry> => {
    const formData = new FormData();
    
    // Append entry data
    Object.entries(entryData).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formData.append(key, String(value));
      }
    });

    // Append poster file if provided
    if (posterFile) {
      formData.append('poster', posterFile);
    }

    const { data } = await api.post<ApiResponse<Entry>>('/entries', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  // Update entry
  updateEntry: async (id: string, entryData: Partial<EntryFormData>, posterFile?: File): Promise<Entry> => {
    const formData = new FormData();
    
    // Append entry data
    Object.entries(entryData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Append poster file if provided
    if (posterFile) {
      formData.append('poster', posterFile);
    }

    const { data } = await api.put<ApiResponse<Entry>>(`/entries/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  // Delete entry
  deleteEntry: async (id: string): Promise<void> => {
    await api.delete(`/entries/${id}`);
  },
};

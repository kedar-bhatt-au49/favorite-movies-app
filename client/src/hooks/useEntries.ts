import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { entriesApi, GetEntriesParams } from '../services/entries';
import { EntryFormData } from '../lib/validation';
import toast from 'react-hot-toast';

// Query keys
export const entryKeys = {
  all: ['entries'] as const,
  lists: () => [...entryKeys.all, 'list'] as const,
  list: (params: GetEntriesParams) => [...entryKeys.lists(), params] as const,
  details: () => [...entryKeys.all, 'detail'] as const,
  detail: (id: string) => [...entryKeys.details(), id] as const,
};

// Get entries with infinite scroll
export const useInfiniteEntries = (params: Omit<GetEntriesParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: entryKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      entriesApi.getEntries({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.currentPage + 1 : undefined,
    initialPageParam: 1,
  });
};

// Get single entry
export const useEntry = (id: string) => {
  return useQuery({
    queryKey: entryKeys.detail(id),
    queryFn: () => entriesApi.getEntry(id),
    enabled: !!id,
  });
};

// Create entry mutation
export const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entryData, posterFile }: { entryData: EntryFormData; posterFile?: File }) =>
      entriesApi.createEntry(entryData, posterFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entryKeys.lists() });
      toast.success('Entry created successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create entry';
      toast.error(message);
    },
  });
};

// Update entry mutation
export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      entryData, 
      posterFile 
    }: { 
      id: string; 
      entryData: Partial<EntryFormData>; 
      posterFile?: File 
    }) => entriesApi.updateEntry(id, entryData, posterFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: entryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: entryKeys.detail(data.id) });
      toast.success('Entry updated successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update entry';
      toast.error(message);
    },
  });
};

// Delete entry mutation
export const useDeleteEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: entriesApi.deleteEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entryKeys.lists() });
      toast.success('Entry deleted successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to delete entry';
      toast.error(message);
    },
  });
};

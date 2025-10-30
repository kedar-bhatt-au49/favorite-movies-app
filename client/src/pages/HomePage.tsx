import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Loader2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInfiniteEntries } from '../hooks/useEntries';
import { debounce } from '../lib/utils';
import { ENTRY_TYPES } from '../config/constants';
import EntryCard from '../components/EntryCard';
import EntryModal from '../components/EntryModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { Entry } from '../types';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'MOVIE' | 'TV_SHOW' | ''>('');
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<Entry | null>(null);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  // Debounced search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debouncedSearchUpdate = useCallback(
    debounce((value: string) => setDebouncedSearch(value), 300),
    []
  );

  useEffect(() => {
    debouncedSearchUpdate(search);
  }, [search, debouncedSearchUpdate]);

  // Fetch entries with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteEntries({
    search: debouncedSearch || undefined,
    type: typeFilter || undefined,
  });

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allEntries = data?.pages.flatMap(page => page.entries) ?? [];
  const totalEntries = data?.pages[0]?.pagination.totalEntries ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Media Collection</h1>
          <p className="mt-2 text-gray-600">
            {totalEntries} {totalEntries === 1 ? 'entry' : 'entries'} in your collection
          </p>
        </div>
        <Link
          to="/add"
          className="btn-primary px-6 py-3 mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Entry
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or director..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'MOVIE' | 'TV_SHOW' | '')}
            className="input pl-10 pr-4 appearance-none bg-white"
          >
            <option value="">All Types</option>
            {ENTRY_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            Error loading entries: {(error as any)?.response?.data?.message || 'Something went wrong'}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && allEntries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {search || typeFilter
              ? 'No entries found matching your search criteria'
              : 'No entries in your collection yet'}
          </div>
          <Link to="/add" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Entry
          </Link>
        </div>
      )}

      {/* Entries Grid */}
      {allEntries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onView={() => setSelectedEntry(entry)}
              onEdit={() => setEditingEntry(entry)}
              onDelete={() => setEntryToDelete(entry)}
            />
          ))}
        </div>
      )}

      {/* Infinite Scroll Loading */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
        </div>
      )}

      {/* End of List Indicator */}
      {!hasNextPage && allEntries.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          You've reached the end of your collection
        </div>
      )}

      {/* Modals */}
      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onEdit={() => {
            setEditingEntry(selectedEntry);
            setSelectedEntry(null);
          }}
          onDelete={() => {
            setEntryToDelete(selectedEntry);
            setSelectedEntry(null);
          }}
        />
      )}

      {editingEntry && (
        <EntryModal
          entry={editingEntry}
          isOpen={!!editingEntry}
          onClose={() => setEditingEntry(null)}
          isEditing
        />
      )}

      {entryToDelete && (
        <DeleteConfirmModal
          entry={entryToDelete}
          isOpen={!!entryToDelete}
          onClose={() => setEntryToDelete(null)}
        />
      )}
    </div>
  );
}

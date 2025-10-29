import { Edit, Trash2, Eye, Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { Entry } from '../types';
import { formatDate, capitalize } from '../lib/utils';

interface EntryCardProps {
  entry: Entry;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EntryCard({ entry, onView, onEdit, onDelete }: EntryCardProps) {
  const typeColor = entry.type === 'MOVIE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';

  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Poster */}
      <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
        {entry.posterUrl ? (
          <img
            src={entry.posterUrl}
            alt={entry.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <div className="text-gray-400 text-4xl mb-2">🎬</div>
              <div className="text-gray-500 text-sm">{entry.type === 'MOVIE' ? 'Movie' : 'TV Show'}</div>
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColor}`}>
            {entry.type === 'MOVIE' ? 'Movie' : 'TV Show'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2" title={entry.title}>
          {entry.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-2 flex-shrink-0" />
            <span>{entry.year}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-2 flex-shrink-0" />
            <span className="truncate" title={entry.location}>{entry.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
            <span>{entry.duration}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-3 w-3 mr-2 flex-shrink-0" />
            <span className="truncate" title={entry.budget}>{entry.budget}</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          Director: <span className="font-medium">{entry.director}</span>
        </div>

        {entry.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3" title={entry.description}>
            {entry.description}
          </p>
        )}

        <div className="text-xs text-gray-400 mb-4">
          Added {formatDate(entry.createdAt)}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={onView}
            className="btn-outline px-3 py-2 text-xs flex-1"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </button>
          <button
            onClick={onEdit}
            className="btn-outline px-3 py-2 text-xs flex-1"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="btn-outline text-red-600 hover:bg-red-50 px-3 py-2 text-xs"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

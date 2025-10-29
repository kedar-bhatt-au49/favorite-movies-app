import { useState } from 'react';
import { X, Edit, Trash2, Calendar, MapPin, Clock, DollarSign, User, Image } from 'lucide-react';
import { Entry } from '../types';
import { formatDate } from '../lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { entryFormSchema, EntryFormData } from '../lib/validation';
import { useUpdateEntry } from '../hooks/useEntries';
import { ENTRY_TYPES } from '../config/constants';

interface EntryModalProps {
  entry: Entry;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
}

export default function EntryModal({ 
  entry, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete, 
  isEditing = false 
}: EntryModalProps) {
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>('');
  const updateEntry = useUpdateEntry();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<EntryFormData>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      title: entry.title,
      type: entry.type,
      director: entry.director,
      budget: entry.budget,
      location: entry.location,
      duration: entry.duration,
      year: entry.year,
      description: entry.description || '',
      posterUrl: entry.posterUrl || '',
    },
  });

  const posterUrl = watch('posterUrl');

  if (!isOpen) return null;

  const handlePosterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setPosterFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EntryFormData) => {
    try {
      await updateEntry.mutateAsync({
        id: entry.id,
        entryData: data,
        posterFile: posterFile || undefined,
      });
      onClose();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleClose = () => {
    reset();
    setPosterFile(null);
    setPosterPreview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Entry' : entry.title}
          </h2>
          <div className="flex items-center space-x-2">
            {!isEditing && onEdit && (
              <button
                onClick={onEdit}
                className="btn-outline p-2"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
            {!isEditing && onDelete && (
              <button
                onClick={onDelete}
                className="btn-outline text-red-600 hover:bg-red-50 p-2"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleClose}
              className="btn-outline p-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isEditing ? (
            // Edit Form
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="label block mb-1">Title *</label>
                <input
                  {...register('title')}
                  className="input w-full"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="label block mb-1">Type *</label>
                <select {...register('type')} className="input w-full">
                  {ENTRY_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
                )}
              </div>

              {/* Director */}
              <div>
                <label className="label block mb-1">Director *</label>
                <input
                  {...register('director')}
                  className="input w-full"
                />
                {errors.director && (
                  <p className="text-red-600 text-sm mt-1">{errors.director.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Budget */}
                <div>
                  <label className="label block mb-1">Budget *</label>
                  <input
                    {...register('budget')}
                    className="input w-full"
                  />
                  {errors.budget && (
                    <p className="text-red-600 text-sm mt-1">{errors.budget.message}</p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="label block mb-1">Year *</label>
                  <input
                    {...register('year')}
                    className="input w-full"
                  />
                  {errors.year && (
                    <p className="text-red-600 text-sm mt-1">{errors.year.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="label block mb-1">Location *</label>
                  <input
                    {...register('location')}
                    className="input w-full"
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="label block mb-1">Duration *</label>
                  <input
                    {...register('duration')}
                    className="input w-full"
                  />
                  {errors.duration && (
                    <p className="text-red-600 text-sm mt-1">{errors.duration.message}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label block mb-1">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="input w-full resize-none"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Poster URL */}
              <div>
                <label className="label block mb-1">Poster URL</label>
                <input
                  {...register('posterUrl')}
                  className="input w-full"
                />
                {errors.posterUrl && (
                  <p className="text-red-600 text-sm mt-1">{errors.posterUrl.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="label block mb-1">Or Upload New Poster</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterFileChange}
                  className="input w-full"
                />
                {posterFile && (
                  <p className="text-sm text-gray-600 mt-1">Selected: {posterFile.name}</p>
                )}
              </div>

              {/* Preview */}
              {(posterPreview || posterUrl) && (
                <div>
                  <label className="label block mb-1">Preview</label>
                  <img
                    src={posterPreview || posterUrl}
                    alt="Preview"
                    className="h-32 w-24 object-cover rounded border"
                  />
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-outline px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || updateEntry.isPending}
                  className="btn-primary px-4 py-2"
                >
                  {isSubmitting || updateEntry.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            // View Mode
            <div className="space-y-6">
              {/* Poster and Basic Info */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <div className="flex-shrink-0">
                  {entry.posterUrl ? (
                    <img
                      src={entry.posterUrl}
                      alt={entry.title}
                      className="w-48 h-64 object-cover rounded-lg border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-48 h-64 bg-gray-100 rounded-lg border flex items-center justify-center">
                      <div className="text-center">
                        <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-500 text-sm">No poster</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      entry.type === 'MOVIE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {entry.type === 'MOVIE' ? 'Movie' : 'TV Show'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Year:</span>
                      <span className="ml-1">{entry.year}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Director:</span>
                      <span className="ml-1">{entry.director}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-1">{entry.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Duration:</span>
                      <span className="ml-1">{entry.duration}</span>
                    </div>
                    <div className="flex items-center md:col-span-2">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">Budget:</span>
                      <span className="ml-1">{entry.budget}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {entry.description && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{entry.description}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t pt-4 text-xs text-gray-500">
                <div>Added: {formatDate(entry.createdAt)}</div>
                {entry.updatedAt !== entry.createdAt && (
                  <div>Updated: {formatDate(entry.updatedAt)}</div>
                )}
                {entry.user && (
                  <div>By: {entry.user.name}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

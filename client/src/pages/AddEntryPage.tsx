import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateEntry } from '../hooks/useEntries';
import { entryFormSchema, EntryFormData } from '../lib/validation';
import { ENTRY_TYPES } from '../config/constants';

export default function AddEntryPage() {
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>('');
  const navigate = useNavigate();
  const createEntry = useCreateEntry();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EntryFormData>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      type: 'MOVIE',
      description: '',
      posterUrl: '',
      genre: '',
      rating: undefined,
    },
  });

  const posterUrl = watch('posterUrl');

  const handlePosterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
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

  const removePosterFile = () => {
    setPosterFile(null);
    setPosterPreview('');
  };

  const onSubmit = async (data: EntryFormData) => {
    try {
      await createEntry.mutateAsync({
        entryData: data,
        posterFile: posterFile || undefined,
      });
      navigate('/');
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          to="/"
          className="btn-outline mr-4 p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Entry</h1>
          <p className="mt-2 text-gray-600">Add a new movie or TV show to your collection</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card p-6">
          {/* Title */}
          <div>
            <label className="label block mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register('title')}
              type="text"
              className="input w-full"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="label block mb-2">
              Type <span className="text-red-500">*</span>
            </label>
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
            <label className="label block mb-2">
              Director <span className="text-red-500">*</span>
            </label>
            <input
              {...register('director')}
              type="text"
              className="input w-full"
              placeholder="Enter director name"
            />
            {errors.director && (
              <p className="text-red-600 text-sm mt-1">{errors.director.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Genre */}
            <div>
              <label className="label block mb-2">
                Genre <span className="text-red-500">*</span>
              </label>
              <input
                {...register('genre')}
                type="text"
                className="input w-full"
                placeholder="e.g., Action, Drama, Comedy"
              />
              {errors.genre && (
                <p className="text-red-600 text-sm mt-1">{errors.genre.message}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="label block mb-2">
                Rating (0-10)
              </label>
              <input
                {...register('rating')}
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="input w-full"
                placeholder="e.g., 8.5"
              />
              {errors.rating && (
                <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget */}
            <div>
              <label className="label block mb-2">
                Budget <span className="text-red-500">*</span>
              </label>
              <input
                {...register('budget')}
                type="text"
                className="input w-full"
                placeholder="e.g., $50 million"
              />
              {errors.budget && (
                <p className="text-red-600 text-sm mt-1">{errors.budget.message}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="label block mb-2">
                Year <span className="text-red-500">*</span>
              </label>
              <input
                {...register('year')}
                type="text"
                className="input w-full"
                placeholder="e.g., 2023"
              />
              {errors.year && (
                <p className="text-red-600 text-sm mt-1">{errors.year.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="label block mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                {...register('location')}
                type="text"
                className="input w-full"
                placeholder="e.g., Los Angeles, CA"
              />
              {errors.location && (
                <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="label block mb-2">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                {...register('duration')}
                type="text"
                className="input w-full"
                placeholder="e.g., 120 minutes"
              />
              {errors.duration && (
                <p className="text-red-600 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label block mb-2">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="input w-full resize-none"
              placeholder="Enter a brief description (optional)"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Poster URL */}
          <div>
            <label className="label block mb-2">Poster URL</label>
            <input
              {...register('posterUrl')}
              type="url"
              className="input w-full"
              placeholder="https://example.com/poster.jpg (optional)"
            />
            {errors.posterUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.posterUrl.message}</p>
            )}
          </div>

          {/* Poster Upload */}
          <div>
            <label className="label block mb-2">Or Upload Poster</label>
            <div className="flex items-center space-x-4">
              <label className="btn-outline cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterFileChange}
                  className="hidden"
                />
              </label>
              {posterFile && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{posterFile.name}</span>
                  <button
                    type="button"
                    onClick={removePosterFile}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Poster Preview */}
          {(posterPreview || posterUrl) && (
            <div>
              <label className="label block mb-2">Preview</label>
              <div className="relative inline-block">
                <img
                  src={posterPreview || posterUrl}
                  alt="Poster preview"
                  className="h-32 w-24 object-cover rounded-md border border-gray-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link to="/" className="btn-outline px-6 py-3">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || createEntry.isPending}
            className="btn-primary px-6 py-3"
          >
            {isSubmitting || createEntry.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Entry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

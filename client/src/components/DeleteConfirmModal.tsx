import { AlertTriangle, Loader2 } from 'lucide-react';
import { Entry } from '../types';
import { useDeleteEntry } from '../hooks/useEntries';

interface DeleteConfirmModalProps {
  entry: Entry;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteConfirmModal({ entry, isOpen, onClose }: DeleteConfirmModalProps) {
  const deleteEntry = useDeleteEntry();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await deleteEntry.mutateAsync(entry.id);
      onClose();
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              Delete Entry
            </h3>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete "{entry.title}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn-outline px-4 py-2"
            disabled={deleteEntry.isPending}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteEntry.isPending}
            className="btn-danger px-4 py-2"
          >
            {deleteEntry.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

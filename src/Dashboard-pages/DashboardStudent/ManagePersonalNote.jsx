import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from './../../Hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ManagePersonalNote = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editNote, setEditNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: notes = [], refetch } = useQuery({
    queryKey: ['notes', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/note/${user?.email}`);
      return response.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this note? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/notes-delete/${id}`);
          refetch();
          Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
        } catch (error) {
          console.error('Failed to delete note:', error);
          Swal.fire('Error!', 'Failed to delete the note.', 'error');
        }
      }
    });
  };
  

  const handleEdit = (note) => {
    setEditNote(note);
    setModalOpen(true);
  };

  const updateNote = async () => {
    if (!editNote) return;

    try {
      await axiosSecure.put(`/update-note/${editNote._id}`, editNote);
      refetch();
      toast.success('Note updated successfully');
      setModalOpen(false);
      setEditNote(null);
    } catch (error) {
      console.error('Failed to update note:', error);
      toast.error('Failed to update note');
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Manage Notes ({notes.length})</h1>
      <div className="w-full space-y-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-white shadow-md rounded-lg p-4 border">
            <h2 className="text-xl font-semibold mb-3">{note.title}</h2>
            <div className="flex justify-between items-start">
              <p className="text-gray-600 flex-grow pr-4">{note.content}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-500 hover:text-blue-700 p-2"
                  aria-label="Edit note"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  aria-label="Delete note"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing Notes */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={editNote?.title || ''}
                onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Content</label>
              <textarea
                value={editNote?.content || ''}
                onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateNote}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePersonalNote;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from './../../Hook/useAxiosSecure';
import useAuth from './../../Hook/UseAuth';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { imageUpload } from './../../Utility/Index';
import Swal from 'sweetalert2';
// Modal.setAppElement('#root');

const ViewAllStudySession = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const { data: sessions = [], isLoading, error, refetch } = useQuery({
        queryKey: ['session', 'all'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/study-session/${user.email}`);
            return response.data;
        }
    });

    

    const handleDelete = async (sessionId) => {
        try {
            // Show a confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
    
            // Proceed if the user confirms
            if (result.isConfirmed) {
                const response = await axiosSecure.delete(`/study-delete/${sessionId}`);
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Session deleted successfully!',
                        'success'
                    );
                    refetch(); // Refetch the data after deletion
                } else {
                    throw new Error('Failed to delete session.');
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error: ${error.message}`
            });
        }
    };
    
    const handleUpdate = (session) => {
        setSelectedSession(session);
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        setSelectedSession(null);
    };

    const handleSaveChanges = async (e, requestReReview = false) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const sessionFee = form.sessionFee.value;
        const status = requestReReview ? 'Pending' : form.status.value;
        const registrationStartDate = form.registrationStartDate.value;
        const registrationEndDate = form.registrationEndDate.value;
        const classStartDate = form.classStartDate.value;
        const classEndDate = form.classEndDate.value;
        let image_url = selectedSession.image;

        try {
            const imageFile = form.image.files[0];
            if (imageFile) {
                image_url = await imageUpload(imageFile);
            }

            const updatedSessionData = {
                title,
                description,
                registrationStartDate,
                registrationEndDate,
                classStartDate,
                classEndDate,
                sessionFee,
                image: image_url,
                status,
            };

            const response = await axiosSecure.put(`/study-session/${selectedSession._id}`, updatedSessionData);
            if (response.status === 200) {
                toast.success('Session updated successfully!');
                refetch();
                handleModalClose();
            } else {
                throw new Error('Failed to update session.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">View All Study Sessions</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="border px-4 py-2">Title</th>
                            <th className="border px-4 py-2">Session Fee</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Registration Dates</th>
                            <th className="border px-4 py-2">Class Dates</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => (
                            <tr key={session._id} className="align-top">
                                <td className="border px-4 py-2 text-center">{session.title}</td>
                                <td className="border px-4 py-2 text-center">${session.sessionFee}</td>
                                <td className="border px-4 py-2 text-center">{session.status}</td>
                                <td className="border px-4 py-2 text-center">
                                    {new Date(session.registrationStartDate).toLocaleDateString()} - {new Date(session.registrationEndDate).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {new Date(session.classStartDate).toLocaleDateString()} - {new Date(session.classEndDate).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2 flex items-center justify-between space-x-4">
                                    <FaEdit
                                        onClick={() => handleUpdate(session)}
                                        className="text-blue-500 cursor-pointer text-3xl"
                                        title="Update Session"
                                    />
                                    <FaTrashAlt
                                        onClick={() => handleDelete(session._id)}
                                        className="text-red-500 cursor-pointer text-3xl"
                                        title="Delete Session"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Update */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleModalClose}
                contentLabel="Update Session"
                className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6 w-full max-w-lg md:max-w-4xl mx-auto overflow-y-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                {selectedSession && (
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold mb-4">Update Session</h2>
                        <form onSubmit={handleSaveChanges}>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                                    <label className="block mb-2">
                                        Title:
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={selectedSession.title}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Description:
                                        <textarea
                                            name="description"
                                            defaultValue={selectedSession.description}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Session Fee:
                                        <input
                                            type="number"
                                            name="sessionFee"
                                            defaultValue={selectedSession.sessionFee}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Registration Start Date:
                                        <input
                                            type="date"
                                            name="registrationStartDate"
                                            defaultValue={new Date(selectedSession.registrationStartDate).toISOString().split('T')[0]}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Registration End Date:
                                        <input
                                            type="date"
                                            name="registrationEndDate"
                                            defaultValue={new Date(selectedSession.registrationEndDate).toISOString().split('T')[0]}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="w-full md:w-1/2 md:pl-4">
                                    <label className="block mb-2">
                                        Class Start Date:
                                        <input
                                            type="date"
                                            name="classStartDate"
                                            defaultValue={new Date(selectedSession.classStartDate).toISOString().split('T')[0]}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Class End Date:
                                        <input
                                            type="date"
                                            name="classEndDate"
                                            defaultValue={new Date(selectedSession.classEndDate).toISOString().split('T')[0]}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Current Image:
                                        {selectedSession.image && (
                                            <img
                                                src={selectedSession.image}
                                                alt="Current Session Image"
                                                className="mb-4 rounded"
                                            />
                                        )}
                                    </label>
                                    <label className="block mb-2">
                                        Upload New Image:
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            className="border border-gray-300 p-2 rounded w-full"
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        Status:
                                        <input
                                            type="text"
                                            name="status"
                                            defaultValue={selectedSession.status}
                                            disabled={!selectedSession.isAdmin}
                                            className="border border-gray-300 p-2 rounded w-full"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-red-500 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                {selectedSession.status === 'Rejected' && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleSaveChanges(e, true)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded"
                                    >
                                        Request Re-review
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewAllStudySession;

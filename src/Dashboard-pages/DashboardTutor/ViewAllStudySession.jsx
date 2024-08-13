import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from './../../Hook/useAxiosSecure';
import useAuth from './../../Hook/UseAuth';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import { imageUpload } from './../../Utility/Index';

Modal.setAppElement('#root');

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
            const response = await axiosSecure.delete(`/study-session/${sessionId}`);
            if (response.status === 200) {
                toast.success('Session deleted successfully!');
                refetch(); // Refetch the data after deletion
            } else {
                throw new Error('Failed to delete session.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
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

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const sessionFee = form.sessionFee.value;
        const status = form.status.value;
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
                <table className="w-full table-auto border-collapse border border-gray-200">
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
                className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                {selectedSession && (
                    <div className="bg-green-100 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl">
                        <h2 className="text-xl font-bold mb-4">Update Session</h2>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2">
                                <form onSubmit={handleSaveChanges}>
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


                                </form>
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <form onSubmit={handleSaveChanges}>
                                 
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
                                        Status:{selectedSession.status}
                                       
                                    </label>
                                    <label className="block mb-2">
                                        Image:
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            className="border border-gray-300 p-2 rounded w-full"
                                        />
                                        {selectedSession.image && (
                                    <img src={selectedSession.image} alt="Session" className="mt-2 w-[200px] h-[200px] object-cover" />
                                )}
                                    </label>
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleModalClose}
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewAllStudySession;

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../Hook/useAxiosSecure';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ViewAllStudySessionAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [updatedFee, setUpdatedFee] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState(null);

    const { data: allSession = [], isLoading, error, refetch } = useQuery({
        queryKey: ['allSession', 'adminView'],
        queryFn: async () => {
            const response = await axiosSecure.get('/session-collection');
            return response.data;
        }
    });

    const handleUpdate = async (sessionId) => {
        const updatedSession = {
            sessionFee: updatedFee,
            status: updatedStatus,
        };

        try {
            const response = await axiosSecure.patch(`/session-fee/${sessionId}`, updatedSession);
            if (response.status === 200) {
                toast.success('Session updated successfully!');
                refetch();
            } else {
                throw new Error('Failed to update session.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">All Sessions: {allSession.length}</h1>
            {allSession.map((session) => (
                <div key={session._id} className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-start">
                    {/* Session Information */}
                    <div className="w-full md:w-1/2 lg:w-2/3 mb-4 md:mb-0">
                        <h2 className="text-lg font-bold mb-2">{session.title}</h2>
                        <p className="mb-2 font-semibold">{session.description}</p>
                        <p className="mb-2 font-semibold"><strong>Tutor:</strong> {session.tutor.name} ({session.tutor.email})</p>
                        <p className="mb-2 font-semibold"><strong>Registration:</strong> {new Date(session.registrationStartDate).toLocaleDateString()} to {new Date(session.registrationEndDate).toLocaleDateString()}</p>
                        <p className="mb-2 font-semibold"><strong>Class:</strong> {new Date(session.classStartDate).toLocaleDateString()} to {new Date(session.classEndDate).toLocaleDateString()}</p>
                        <p className="mb-2 font-semibold"><strong>Current Session Fee:</strong> {session.sessionFee || 'Not Set'}</p>
                        <p className="mb-4 font-semibold"><strong>Status:</strong> {session.status}</p>
                    </div>

                    {/* Session Image */}
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
                        <img src={session.image} alt={session.title} className="w-full h-auto mb-4 rounded-md" />
                    </div>

                    {/* Admin Controls */}
                    <div className="w-full md:w-1/3 flex flex-col">
                        <label className="block mb-2 mt-3">
                            <span className="block text-sm font-bold mb-1">Update Session Fee $:</span>
                            <input
                                type="number"
                                defaultValue={session.sessionFee}
                                onChange={(e) => setUpdatedFee(e.target.value)}
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </label>
                        <label className="block">
                            <span className="block text-sm font-bold mb-1">Update Status:</span>
                            <select
                                defaultValue={session.status}
                                onChange={(e) => setUpdatedStatus(e.target.value)}
                                className="border border-gray-300 p-2 font-bold rounded w-full"
                            >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </label>
                        <button
                            onClick={() => handleUpdate(session._id)}
                            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 w-full"
                        >
                            Update
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewAllStudySessionAdmin;

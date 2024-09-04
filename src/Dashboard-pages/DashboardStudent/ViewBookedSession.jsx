import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ReviewForm from '../../Modal-Form/ReviewForm';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/UseAuth';

const ViewBookedSession = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: booked = [], refetch } = useQuery({
        queryKey: ['bookedSession', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/bookedSession/${user?.email}`);
            return response.data;
        },
        refetchInterval: 600000,
    });

    const handleReviewSubmit = async ({ rating, review }, sessionId) => {
        try {
            console.log('Submitting review for sessionId:', sessionId);
            const response = await axiosSecure.put(`/submit-review/${sessionId}`, {
                rating,
                review,
                userEmail: user?.email,
            });
    
            console.log('Response:', response.data);
    
            if (response.data.modifiedCount > 0) {
                toast.success('Review submitted successfully!');
                refetch(); // Refetch data to update UI
            } else {
                toast.error('Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review.');
        }
    };
    


    const handleProceedToPayment = (session) => {
        navigate(`/payment/${session._id}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">View Booked Sessions</h1>

            {booked.length === 0 ? (
                <p>No booked sessions found.</p>
            ) : (
                <div className="space-y-6">
                    {booked.map((session) => (
                        <div key={session._id} className="bg-base-100 shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold">{session.sessionTitle}</h2>
                            <p><strong>Tutor:</strong> {session.tutorName}</p>
                            <p><strong>Booking Date:</strong> {new Date(session.bookingDate).toLocaleDateString()}</p>
                            <p><strong>Session Fee:</strong> ${parseInt(session.sessionFee)}</p>

                            {session.status === 'paid' ? (
                                <button
                                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                                    disabled
                                >
                                    Paid
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleProceedToPayment(session)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Proceed to Payment
                                </button>
                            )}

                           {/* ... existing session details ... */}
                           <div className="mt-6">
                     <ReviewForm
                onSubmit={(reviewData) => handleReviewSubmit(reviewData, session.sessionId)}
            />
                       </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewBookedSession;

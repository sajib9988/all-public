import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../Hook/useAxiosSecure';
import useAuth from './../Hook/UseAuth';
import CheckoutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { sessionId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: booking, error, isLoading } = useQuery({
        queryKey: ['booking', sessionId, user?.email],
        queryFn: async () => {
            if (!user?.email) throw new Error("User email is not available");
            const response = await axiosSecure.get(`/bookings-payment/${sessionId}`, {
                params: { studentEmail: user.email }
            });
            console.log(response.data);
            return response.data;
        },
        retry: 3,
        onError: (error) => {
            console.error('Error fetching booking:', error);
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!booking) return <p>No booking data available.</p>;

    const handlePaymentComplete = (status) => {
        // Handle payment status update if needed
    };

    return (
        <div className="p-6 mt-3">
            <div className="flex justify-center items-center">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Payment for {booking.sessionTitle}</h1>
                </div>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm
                    sessionId={booking._id} 
                    sessionTitle={booking.sessionTitle}
                    sessionFee={parseInt(booking.sessionFee)}
                    tutorEmail={booking.tutorEmail}
                    onPaymentComplete={handlePaymentComplete}
                    bookingDate={new Date(booking.bookingDate).toLocaleDateString()}
                />
            </Elements>
        </div>
    );
};

export default Payment;

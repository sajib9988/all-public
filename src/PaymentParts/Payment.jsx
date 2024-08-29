import { useLoaderData } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const booking = useLoaderData();
    console.log('Booking data:', booking);

    if (!booking) {
        return <p>Loading booking data...</p>;
    }

    if (booking.error) {
        return <p>Error: {booking.error}</p>;
    }

    const handlePaymentComplete = (status) => {
        console.log('Payment completed with status:', status);
    };

    return (
        <div className="p-6 mt-3">
            <div className="flex justify-center items-center">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Payment for {booking.sessionTitle || 'Unknown Session'}</h1>
                </div>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm
                    sessionId={booking._id}
                    sessionTitle={booking.sessionTitle}
                    sessionFee={parseInt(booking.sessionFee) || 0}
                    tutorEmail={booking.tutorEmail}
                    onPaymentComplete={handlePaymentComplete}
                    bookingDate={booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'Unknown Date'}
                />
            </Elements>
        </div>
    );
};

export default Payment;
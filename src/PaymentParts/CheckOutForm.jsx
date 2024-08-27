import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import useAxiosSecure from './../Hook/useAxiosSecure';
import useAuth from './../Hook/UseAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ sessionId, sessionTitle, sessionFee, tutorEmail, onPaymentComplete, bookingDate }) => {
    console.log('CheckoutForm props:', { sessionId, sessionTitle, sessionFee, tutorEmail });

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        if (parseInt(sessionFee) > 0) {
            axiosSecure.post('/create-payment-intent', { sessionFee: parseInt(sessionFee) })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error fetching client secret:', error);
                    toast.error('Failed to initialize payment.');
                });
        }
    }, [axiosSecure, sessionFee]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            toast.error('Stripe has not loaded yet.');
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email,
                    },
                },
            });

            if (error) {
                console.error('Payment error:', error);
                toast.error(error.message);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent?.status === 'succeeded') {
                toast.success('Payment successful!');
                console.log('Payment successful. Payment details:', {
                    sessionId,
                    sessionTitle,
                    sessionFee,
                    tutorEmail,
                    userEmail: user?.email,
                    transactionId: paymentIntent.id,
                });

                // Save payment information to your database
                try {
                    const response = await axiosSecure.post('/payment-complete', {
                        sessionId,
                        sessionTitle,
                        sessionFee,
                        tutorEmail,
                        userEmail: user?.email,
                        transactionId: paymentIntent.id,
                    });

                    console.log('API Response:', response.data); // Log the entire response

                    if (response.data.message === 'Payment recorded successfully.') {
                        toast.success('Payment has been recorded successfully.');
                        onPaymentComplete(true);
                        navigate('/booked-sessions'); // Redirect on successful payment
                    } else {
                        toast.error('Failed to record payment.');
                    }
                } catch (error) {
                    console.error('Error saving payment data:', error);
                    toast.error('Failed to record payment.');
                }
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment.');
        }

        setIsProcessing(false);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Secure Payment</h2>
            <div className="mb-4">
                <p className="text-gray-700 mb-2"><span className="font-semibold">Session:</span> {sessionTitle}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Tutor Email:</span> {tutorEmail}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Fee:</span> ${sessionFee}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Student Email:</span> {user?.email}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Booking Date:</span> {bookingDate}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        `Pay $${sessionFee}`
                    )}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;

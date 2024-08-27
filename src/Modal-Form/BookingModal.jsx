/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import CheckoutForm from '../PaymentParts/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const BookingModal = ({ isOpen, closeModal, bookingInfo, refetch }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Booking Modal"
            ariaHideApp={false}
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold mb-4">Payment for {bookingInfo.sessionTitle || 'Total Sessions'}</h2>
            <p className="mb-4">Session Fee: ${bookingInfo.sessionFee || bookingInfo.totalFee}</p>

            {/* Wrap CheckoutForm with Elements */}
            <Elements stripe={stripePromise}>
                <CheckoutForm bookingInfo={bookingInfo} refetch={refetch} closeModal={closeModal} />
            </Elements>

            <button
                onClick={closeModal}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Cancel
            </button>
        </Modal>
    );
};

export default BookingModal;

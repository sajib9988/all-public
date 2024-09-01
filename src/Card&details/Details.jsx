import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import Navbar from './../Navbar/Navbar';
import useAuth from '../Hook/UseAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useState } from 'react';
import useRole from '../Hook/UseRole';

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isBooked, setIsBooked] = useState(false);
  const [role] = useRole();

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/all-collection/${id}`);
      return response.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading session details.</div>;
  if (!session) return <div>No session data available.</div>;

  const handleBooking = async () => {
    // Check if the user is eligible to book (only students can book sessions)
    if (role !== 'Student') {
      toast.error('You are not eligible to book this session!');
      return;
    }

    try {
      const existingBookingResponse = await axiosSecure.get(`/bookings/check/${id}`, {
        params: { studentEmail: user?.email }
      });

      const existingBooking = existingBookingResponse.data;

      if (existingBooking) {
        toast.error('You have already booked this session.');
        return;
      }

      // Set bookingDate to current date and time
      const bookingDate = new Date().toISOString();

      const bookingData = {
        studentName: user?.displayName,
        studentEmail: user?.email,
        sessionTitle: session.title,
        bookingDate: bookingDate, // Use current date and time
        sessionId: id,
        tutorId: session.tutorId,
        tutorName: session.tutor?.name,
        tutorEmail: session.tutor?.email,
        sessionFee: session.sessionFee,
      };

      await axiosSecure.post('/booking', bookingData);
      setIsBooked(true); // Update booking status
      toast.success('Booking successful!');
    } catch (error) {
      toast.error('Error booking session!');
    }
  };

  return (
    <div className="bg-gray-50 border">
      <div className="sticky top-0 z-50 border-emerald-400">
        <Navbar />
      </div>

      <div className="mt-[140px] mx-auto max-w-2xl bg-blue-600 p-4 shadow-lg rounded-lg border">
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-center items-center">
              <img src={session.image} alt={session.title} className="w-full h-64 object-cover rounded-md" />
            </div>
            <h2 className="text-xl  mt-4 text-white font-bold">{session.title}</h2>
            <p className="text-white mt-2 font-bold">{session.description}</p>
          </div>

          <div>
            <p className="text-white mt-2 font-bold">Registration End Date: {new Date(session.registrationEndDate).toLocaleDateString()}</p>
            <p className="text-white mt-2 font-bold">Class Start Date: {new Date(session.classStartDate).toLocaleDateString()}</p>
            <p className="text-white mt-2 font-bold">Class End Date: {new Date(session.classEndDate).toLocaleDateString()}</p>
            <p className="text-white mt-2 font-bold">Fee: ${session.sessionFee}</p>
            <p className="text-white mt-2 font-bold">Tutor: {session.tutor?.name} ({session.tutor?.email})</p>
          </div>
        </div>

        <button
          className={`mt-4 py-2 px-4 rounded font-bold ${isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white'}`}
          onClick={handleBooking}
          disabled={isBooked} // Disable button if booked
        >
          {isBooked ? 'Booked' : 'Book Session'}
        </button>
      </div>
    </div>
  );
};

export default Details;

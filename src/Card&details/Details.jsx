import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import Navbar from './../Navbar/Navbar';
import useAuth from '../Hook/UseAuth';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useState } from 'react';

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookingDate, setBookingDate] = useState('');

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/all-collection/${id}`);
      console.log(response);
      return response.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading session details.</div>;
  if (!session) return <div>No session data available.</div>;

  const handleBooking = async () => {
    const bookingData = {
      studentName: user?.displayName,
      studentEmail: user?.email,  // Assuming the user's email is used
      sessionTitle: session.title,  // Using the session title
      bookingDate: bookingDate,  // Using the selected booking date
      sessionId: id,  // Include the session ID
      tutorId: session.tutorId,
      tutorName: session.tutor?.name,
      tutorEmail: session.tutor?.email,
      sessionFee: session.sessionFee,
    };
    
    try {
      const response = await axiosSecure.post('/booking', bookingData);
      toast.success('Booking successful!');
      console.log('Booking successful:', response.data);
      // You can add further actions here, such as redirecting the user
    } catch (error) {
      toast.error('Error booking session!');
      console.error('Error booking session:', error);
    }
  };

  return (
    <div className="absolute inset-0 bg-white p-4 shadow-lg rounded-lg">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <img src={session.image} alt={session.title} className="w-full h-64 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-4">{session.title}</h2>
      <p className="text-gray-700 mt-2">{session.description}</p>
      <p className="text-gray-800 mt-2">Start Date: {new Date(session.classStartDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mt-2">End Date: {new Date(session.classEndDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mt-2">Fee: ${session.sessionFee}</p>
      <p className="text-gray-800 mt-2">Tutor: {session.tutor?.name} ({session.tutor?.email})</p>

      <div className="mt-4">
        <label className="block text-gray-700">Booking Date:</label>
        <input 
          type="date" 
          value={bookingDate} 
          onChange={(e) => setBookingDate(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded" onClick={handleBooking}>
        Book Session
      </button>
    </div>
  );
};

export default Details;

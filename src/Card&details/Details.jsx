import { useParams } from 'react-router-dom';
import useAxiosPublic from './../Hook/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import Navbar from './../Navbar/Navbar';

const Details = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/all-collection/${id}`);
      console.log(response);
      return response.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading session details.</div>;
  if (!session) return <div>No session data available.</div>;

  const handleBooking = () => {
    console.log('Booking session:', session);
    // TODO: Implement booking logic
  };

  return (
    <div className="absolute inset-0 bg-white p-4 shadow-lg rounded-lg">
      <Navbar></Navbar>
       img
      <h2 className="text-xl font-semibold">{session.title}</h2>
      <p className="text-gray-700 mt-2">{session.description}</p>
      <p className="text-gray-800 mt-2">Start Date: {new Date(session.classStartDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mt-2">End Date: {new Date(session.classEndDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mt-2">Fee: ${session.sessionFee}</p>
      <p className="text-gray-800 mt-2">Tutor: {session.tutor?.name} ({session.tutor?.email})</p>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded" onClick={handleBooking}>
        Book
      </button>
    </div>
  );
};

export default Details;
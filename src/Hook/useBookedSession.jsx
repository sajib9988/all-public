import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './UseAuth';


const useBookedSession = () => {
  const { user, loading } = useAuth(); 
  const axiosSecure = useAxiosSecure(); 

  // Use useQuery for fetching booked sessions data
  const { data: bookingsLength = 0, isLoading, isError, error } = useQuery({
    queryKey: ['bookedSessions', user?.email], // Unique query key based on user email
    enabled: !loading && !!user?.email, // Query is enabled only when user email is available
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/bookedSessions?studentEmail=${user?.email}`);
        return data.length; // Assuming API returns an array of booked sessions
      } catch (err) {
        throw new Error('Failed to fetch booked sessions');
      }
    },
  });

  // You might want to handle the error state here
  if (isError) {
    console.error(error.message); // Or display a toast notification using react-hot-toast
  }

  return { bookingsLength, isLoading, isError };
};

export default useBookedSession;

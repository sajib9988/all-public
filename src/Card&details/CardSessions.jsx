import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../Hook/axiosPublic';
import { Link } from 'react-router-dom';

const CardSessions = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allSessions = [], isLoading, error } = useQuery({
    queryKey: ['allSessions'], 
    queryFn: async () => {
      try {
        const response = await axiosPublic.get('/all-collection');
        return response.data;
      } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
      }
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1 className='font-bold text-center text-3xl mt-4 border bg-gray-100 p-3 mb-4'>All Study Sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allSessions.length === 0 ? (
          <div>No sessions available</div>
        ) : (
          allSessions.map(session => (
            <div 
              key={session._id} // Adjust this if _id is not a string or number
              className="relative bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <img 
                  src={session.image} 
                  alt={session.title} 
                  className="w-full h-60 object-cover rounded-t-lg" 
                />
                <h2 className="text-lg font-semibold mt-2">{session.title}</h2>
                <p className="text-gray-600">{session.description}</p>
                <p className="text-gray-800 mt-2 mb-2">Fee: ${session.sessionFee}</p>
                <p className="text-gray-800 mt-2 mb-2">
                  Tutor: {session.tutor.name}
                </p>
                <p>
                  Registration: {new Date(session.registrationStartDate).toLocaleDateString()} - {new Date(session.registrationEndDate).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/details/${session._id}`}
                className="mt-4 text-center font-bold bg-black p-2 text-white rounded-lg hover:text-blue-700"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardSessions;

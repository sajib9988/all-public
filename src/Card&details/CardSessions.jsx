import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from './../Hook/axiosPublic';
import { Link } from 'react-router-dom';

const CardSessions = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);

  // Query to fetch paginated sessions
  const { data: paginatedSessions = [], isLoading, error } = useQuery({
    queryKey: ['paginatedSessions'],
    queryFn: async () => {
      const response = await axiosPublic.get('/all-collection?page=1&limit=6');
      return response.data;
    }
  });

  // Query to fetch all sessions
  const { data: allSessions = [] } = useQuery({
    queryKey: ['allSessions'],
    queryFn: async () => {
      const response = await axiosPublic.get('/all-collection-all');
      return response.data;
    },
    enabled: showAll, // Fetch all sessions only if showAll is true
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }

  const sessionsToDisplay = showAll ? allSessions : paginatedSessions;

  return (
    <div>
      <h1 className='font-bold text-center text-3xl mt-4 border bg-gray-100 p-3 mb-4'>All Study Sessions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sessionsToDisplay.length === 0 ? (
          <div>No sessions available</div>
        ) : (
          sessionsToDisplay.map(session => (
            <div
              key={session._id}
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

                {/* Reviews Section */}
                <div className="mt-4">
                  <h3 className="font-semibold">Reviews:</h3>
                  {session.reviews && session.reviews.length > 0 ? (
                    session.reviews.map((review, index) => (
                      <div key={index} className="bg-yellow-700 font-bold p-2 mt-2 rounded">
                        <p>Rating: {review.rating}/5</p>
                        <p>{review.review}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>
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

      {/* "See All" button to show all sessions */}
      {!showAll && paginatedSessions.length > 0 && (
        <button
          onClick={() => {
            setShowAll(true);
            queryClient.refetchQueries(['allSessions']); // Trigger fetch for all sessions
          }}
          className="block mx-auto mt-6 px-5 py-3 bg-black border font-bold text-white rounded-lg hover:bg-green-600"
        >
          See All
        </button>
      )}
    </div>
  );
};

export default CardSessions;

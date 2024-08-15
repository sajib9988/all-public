import { useState, useEffect } from 'react';
import useAuth from './../../Hook/UseAuth';
import useRole from './../../Hook/UseRole';
import LoadingSpinner from './../../LoadingSpinner/LoadingSpinner';

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-rose-100 shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL || 'https://via.placeholder.com/150'} // Fallback image if none is available
              className='mx-auto object-cover rounded-full h-24 w-24 border-2 border-white'
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs text-white bg-blue-500 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800'>
            Username: {user?.displayName || 'N/A'}
          </p>
          <p className='text-sm text-gray-600'>
            Email: {user?.email || 'N/A'}
          </p>
          <p className='text-sm text-gray-600'>
            User ID: {user?.uid || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

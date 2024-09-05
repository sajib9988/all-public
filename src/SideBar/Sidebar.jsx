import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineBars } from 'react-icons/ai';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../Hook/UseAuth';
import StudentMenu from './../MenuItems/StudentMenu';
import TutorMenu from './../MenuItems/TutorMenu';
import AdminMenu from './../MenuItems/AdminMenu';
import useRole from './../Hook/UseRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxiosSecure';



const Sidebar = () => {
  const { logOut } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [isActive, setActive] = useState(false);
  const {user}=useAuth()
  const axiosSecure=useAxiosSecure()
  const { data: status = '', isLoading, error } = useQuery({
    queryKey: ['status', user?.email],
    // enabled: !loading && !!user?.email, // Fetch only if user email is available and loading is false

    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data.status; // Return only the status
    },
  });




  

  const handleToggle = () => {
    setActive(!isActive);
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-green-100  text-gray-300 flex justify-between md:hidden '>
        <div>
          <div className='block  cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                src='https://i.ibb.co/XSf9TxV/6258786184795404367-removebg-preview.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5 text-base-300'  />
        </button>
      </div>

      {/* Sidebar */}
      <div
         className={`z-10 md:fixed flex flex-col justify-between border overflow-x-hidden bg-base-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } mt-[128px] md:translate-x-0 md:mt-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div className='w-[100px] font-bold hidden md:flex px-4 py-2 shadow-lg bg-base-300 text-success rounded-lg justify-center items-center mx-auto'>
            <Link to='/'>
            Home
              <img
                src='https://i.ibb.co/ZBFrKXT/6258786184795404367.png'
                alt='logo'
                width='50'
                height='50'
              />
            </Link>
          </div>

          {/* Nav Items for dashboard*/}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
            {!isRoleLoading && role.toLowerCase() === 'student' && <StudentMenu />}
    {!isRoleLoading && role.toLowerCase() === 'tutor'  && status.toLowerCase() === 'accepted' && <TutorMenu />}
    {!isRoleLoading && role.toLowerCase() === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-500'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />
            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar; 
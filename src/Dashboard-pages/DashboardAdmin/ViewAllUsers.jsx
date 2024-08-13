import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai'; // Importing icons

const ViewAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');


  // Fetching all users data using useQuery
  const { data: users = [], isLoading, isError,  } = useQuery({
    queryKey: ['users', searchInput],
      queryFn: async () => {
      const response = await axiosSecure.get(`/search?search=${searchInput}`);
      // console.log(response.data)
      console.log(searchInput);
      return response.data;
      
    },

  });















  // Mutation for updating user role
  const updateUserRole = useMutation({
    mutationFn: async ({ userId, role }) => {
      await axiosSecure.patch(`/users/${userId}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  // Mutation for updating user status
  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, status }) => {
      await axiosSecure.patch(`/users/${userId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  // Handler for changing user role
  const handleRoleChange = (userId, event) => {
    updateUserRole.mutate({ userId, role: event.target.value });
  };

  // Handler for changing user status
  const handleStatusChange = (userId, status) => {
    updateUserStatus.mutate({ userId, status });
  };

  // Handler for searching users
  const handleSearch = () => {
    setSearchTerm(searchInput);
    // setLoading(true)
    // // refetch()
    // setLoading(false)
   
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error state if there is an error fetching data
  if (isError) {
    return <div>Error loading users.</div>;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">All Users</h1>
      <div className="mb-4 flex justify-center mr-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" w-[500px] mr-2 bg-gray-100 border border-gray-300 rounded py-2 px-2 text-gray-700 mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-2 w-[90px] py-2 rounded-md"
          style={{ height: '42px' }}
        >
          Search
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              User Email
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user._id}>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                {user.status}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                {/* Dropdown for changing user role */}
                <select
                  defaultValue={user.role}
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleRoleChange(user._id, e)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Student">Student</option>
                </select>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 flex justify-center space-x-2">
                {/* Update button with icon */}
                <button
                  onClick={() => handleStatusChange(user._id, 'Accepted')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <AiOutlineEdit className="mr-2" />
                  Update
                </button>
                {/* Reject button with icon */}
                <button
                  onClick={() => handleStatusChange(user._id, 'Rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <AiOutlineClose className="mr-2" />
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllUsers;

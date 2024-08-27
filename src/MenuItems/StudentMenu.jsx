import { BsFillCalendarFill, BsFillFileEarmarkPlusFill, BsFillFileEarmarkFill, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import MenuItems from './MenuItems';

import useAuth from '../Hook/UseAuth';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const StudentMenu = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const { sessionId } = useParams();
  
  const { data: booked = [], isLoading, isError } = useQuery({
    queryKey: ['bookedSession', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/bookedSession/${user?.email}`);
      return response.data;
    },
    refetchInterval: 600000, // Refetch every 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading booked sessions.</div>;

  const bookedCount = booked.length;

  return (
    <>
      <MenuItems
        label={`Booked Sessions (${bookedCount})`}
        address='/dashboard/booked-sessions'
        icon={BsFillCalendarFill}
      />
      <MenuItems
        label='Create Note'
        address='/dashboard/create-note'
        icon={BsFillFileEarmarkPlusFill}
      />
      <MenuItems
        label='Manage Notes'
        address='/dashboard/manage-notes'
        icon={BsFillFileEarmarkFill}
      />
      <MenuItems
  label='Study Materials'
  address='study-materials/:email' // Ensure sessionId and user.email are properly provided
  icon={BsFillFileEarmarkTextFill}
/>

    </>
  );
};

export default StudentMenu;

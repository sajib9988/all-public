import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hook/UseAuth';
import useAxiosSecure  from '../Hook/useAxiosSecure';


const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,

    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data.role;
    
    },
    
  });
  console.log(role)
  return [role, isLoading];
}

export default useRole;
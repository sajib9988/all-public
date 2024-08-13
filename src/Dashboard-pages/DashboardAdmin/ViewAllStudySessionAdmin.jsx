import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../Hook/useAxiosSecure';

const ViewAllStudySessionAdmin = () => {
    const axiosSecure = useAxiosSecure(); // Correctly get the Axios instance here

    const { data: allSession = [], isLoading, error } = useQuery({
        queryKey: ['allSession'],
        queryFn: async () => {
            const response = await axiosSecure.get('/session-collection');
            console.log(response.data);
            return response.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>All Sessions: {allSession.length}</h1>
            {/* Additional code to render session details can go here */}
        </div>
    );
};

export default ViewAllStudySessionAdmin;

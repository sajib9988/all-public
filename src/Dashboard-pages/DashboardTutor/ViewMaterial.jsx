import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../Hook/useAxiosSecure';
import useAuth from '../../Hook/UseAuth';

const ViewMaterial = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [], isError } = useQuery({
    queryKey: ['materials', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/uploadMaterial/${user?.email}`);
      console.log(response.data);
      return response.data;
    },
    enabled: !!user?.email,
    onError: (err) => {
      console.error('Error fetching materials:', err);
    },
  });

  if (isError) {
    return <p className="text-red-600 font-semibold text-center">Error fetching materials</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        View Material
        {data.length > 0 ? `: ${data.length} items found` : ': No materials found'}
      </h1>
      <ul className="space-y-6">
        {data.map((material) => (
          <li key={material._id.$oid} className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{material.title}</h2>
            <p className="text-gray-700 mb-2"><span className="font-medium">Email:</span> {material.email}</p>
            <p className="text-gray-700 mb-2"><span className="font-medium">Study Session ID:</span> {material.studySessionId}</p>
            <p className="text-gray-700 mb-4"><span className="font-medium">Link:</span> 
              <a href={material.link.trim().replace(/"/g, '')} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Material
              </a>
            </p>
            <div className="relative mx-auto w-full h-94 overflow-hidden rounded-lg">
              <img src={material.image} alt={material.title} className="w-[300px] h-[200px]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMaterial;

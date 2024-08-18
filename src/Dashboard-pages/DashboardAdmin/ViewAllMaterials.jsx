import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ViewAllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], isError } = useQuery({
    queryKey: ['allMaterials'],
    queryFn: async () => {
      const response = await axiosSecure.get('/admin-material');
      return response.data;
    },
    onError: (err) => {
      console.error('Error fetching materials:', err);
    },
  });

  if (isError) {
    return <p className="text-red-600 font-semibold text-center">Error fetching materials</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">View All Materials</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 text-center text-gray-600 font-bold">Title</th>
              <th className="py-3 px-4 text-center text-gray-600 font-bold">Email</th>
              <th className="py-3 px-4 text-center text-gray-600 font-bold">Study Session ID</th>
              <th className="py-3 px-4 text-center text-gray-600 font-bold">Link</th>
              <th className="py-3 px-4 text-center text-gray-600 font-bold">Image</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material._id} className="border-b border-gray-200">
                <td className="py-4 px-6 text-center text-gray-800">{material.title}</td>
                <td className="py-4 px-6 text-center text-gray-800">{material.email}</td>
                <td className="py-4 px-6 text-center text-gray-800">{material.studySessionId}</td>
                <td className="py-4 px-6 text-center text-gray-800">
                  <a href={material.link.trim().replace(/"/g, '')} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Material
                  </a>
                </td>
                <td className="py-4 px-6 ml-6">
                  <img src={material.image} alt={material.title} className="w-24 h-24 ml-[32px] object-cover rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllMaterials;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ViewAllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], isError } = useQuery({
    queryKey: ["allMaterials"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin-material");
      return response.data;
    },
    onError: (err) => {
      console.error("Error fetching materials:", err);
    },
  });

  if (isError) {
    return (
      <p className="text-error font-semibold text-center">
        Error fetching materials
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-base-content">
        View All Materials
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-base-100 border border-base-300 rounded-lg shadow-md">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="py-3 px-4 text-center text-base-content font-bold">
                Title
              </th>
              <th className="py-3 px-4 text-center text-base-content font-bold">
                Email
              </th>
              <th className="py-3 px-4 text-center text-base-content font-bold">
                Study Session ID
              </th>
              <th className="py-3 px-4 text-center text-base-content font-bold">
                Link
              </th>
              <th className="py-3 px-4 text-center text-base-content font-bold">
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material._id} className="border-b border-base-300">
                <td className="py-4 px-6 text-center text-base-content">
                  {material.title}
                </td>
                <td className="py-4 px-6 text-center text-base-content">
                  {material.email}
                </td>
                <td className="py-4 px-6 text-center text-base-content">
                  {material.studySessionId}
                </td>
                <td className="py-4 px-6 text-center text-base-content">
                  <a
                    href={material.link.trim().replace(/"/g, "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Material
                  </a>
                </td>
                <td className="py-2 px-2 md:px-4 lg:px-6">
                  <img
                    src={material.image}
                    alt={material.title}
                    className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-md mx-auto"
                  />
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

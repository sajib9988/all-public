import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/UseAuth';
import { FaDownload } from 'react-icons/fa'; // Import the download icon

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosSecure.get(`/study-materials/${user.email}`);
        console.log('API Response:', response.data); // Log the response for debugging
        setMaterials(response.data);
      } catch (err) {
        console.error('Error fetching materials:', err);
        setError('Failed to fetch study materials. ' + (err.response?.data?.message || err.message));
        toast.error('Failed to fetch study materials. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [axiosSecure, user?.email]);

  const downloadImage = async (url, title) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = title || 'material';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Study Materials</h2>
      {materials.length === 0 ? (
        <p>No study materials available for your paid sessions.</p>
      ) : (
        materials.map((material) => (
          <div key={material._id} className="mb-6 p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold">{material.title}</h3>
            <p>Session ID: {material.studySessionId}</p>
            <div className="mt-2 flex justify-between">
              {material.link && (
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 font-bold  text-white px-4 py-2 rounded hover:bg-black"
                >
                  Join Session
                </a>
              )}
              {material.image && (
                <button
                  onClick={() => downloadImage(material.image, material.title)}
                  className="bg-blue-500 text-white px-4 py-2 font-bold rounded  hover:bg-blue-700 flex items-center"
                >
                  <FaDownload className="mr-2" /> Download Image
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudyMaterials;

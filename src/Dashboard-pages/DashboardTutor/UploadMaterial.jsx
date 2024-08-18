import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { imageUpload } from './../../Utility/Index';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from './../../Hook/UseAuth';

const UploadMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const navigate = useNavigate();
  const formRef = useRef();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await axiosSecure.get(`/tutor/studySessions/${user.email}`);
        setSessions(data);
      } catch (error) {
        console.error('Error fetching study sessions:', error);
        toast.error('Failed to load your study sessions');
      }
    };
  
    if (user?.email) {
      fetchSessions();
    }
  }, [axiosSecure, user?.email]);
  

  const { mutateAsync } = useMutation({
    mutationFn: async (materialData) => {
      const { data } = await axiosSecure.post('/uploadMaterial', materialData);
      return data;
    },
    onSuccess: () => {
      toast.success('Material Added Successfully!');
      navigate('/dashboard/my-materials');
      setLoading(false);
      formRef.current.reset();
      setSelectedSessionId('');
    },
    onError: (error) => {
      console.error('Error uploading material:', error);
      toast.error('Failed to upload material');
      setLoading(false);
    },
  });

  const handleTitleChange = (e) => {
    const selectedTitle = e.target.value;
    const selectedSession = sessions.find(session => session.title === selectedTitle);

    if (selectedSession) {
      setSelectedSessionId(selectedSession._id);
    } else {
      setSelectedSessionId('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;
    const title = form.title.value;
    const studySessionId = selectedSessionId;
    const link = form.link.value;
    const image = form.image.files[0];

    if (!image) {
      toast.error('Please select an image to upload');
      setLoading(false);
      return;
    }

    try {
      const image_url = await imageUpload(image);

      const materialData = {
        email: user?.email,
        title,
        studySessionId,
        link,
        image: image_url,
      };

      await mutateAsync(materialData);
    } catch (error) {
      console.error('Error uploading material:', error);
      toast.error('Failed to upload material');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto h-[400px] mt-7 p-4 bg-black bg-opacity-40 border border-green-700 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Material</h2>
      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
          defaultValue={user?.email}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          list="sessionTitles"
          onChange={handleTitleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <datalist id="sessionTitles">
          {sessions.map(session => (
            <option key={session._id} value={session.title} />
          ))}
        </datalist>
        <input
          type="text"
          name="studySessionId"
          value={selectedSessionId}
          placeholder="Study Session ID"
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="link"
          placeholder="Google Drive Link"
          required
          className="w-full p-2 border border-gray-300 rounded mb-5"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Uploading...' : 'Upload Material'}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterial;

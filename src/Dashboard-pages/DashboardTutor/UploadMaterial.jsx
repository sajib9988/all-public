import  { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useAxiosSecure from '../../Hook/useAxiosSecure';
import { imageUpload } from './../../Utility/Index';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';


const UploadMaterial = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();

  const { mutateAsync } = useMutation({
    mutationFn: async (materialData) => {
      const { data } = await useAxiosSecure.post('/uploadMaterial', materialData);
      return data;
    },
    onSuccess: () => {
      toast.success('Material Added Successfully!');
      navigate('/dashboard/my-materials');
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error uploading material:', error);
      toast.error('Failed to upload material');
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;
    const title = form.title.value;
    const studySessionId = form.studySessionId.value;
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
        title,
        studySessionId,
        link,
        image: image_url,
      };

      await mutateAsync(materialData);

      // Reset form fields
      form.reset();
    } catch (error) {
      console.error('Error uploading material:', error);
      toast.error('Failed to upload material');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Material</h2>
      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="studySessionId"
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
          className="w-full p-2 border border-gray-300 rounded"
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

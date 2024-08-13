// AddStudySession.js
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from './../../Hook/UseAuth';
import useAxiosSecure from './../../Hook/useAxiosSecure';
import { imageUpload } from './../../Utility/Index';
import AddStudySessionForm from './../../Form/AddStudySessionForm';


const AddStudySession = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState('Upload Image');
  const [registrationDates, setRegistrationDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [classDates, setClassDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleRegistrationDates = (item) => {
    setRegistrationDates(item);
  };

  const handleClassDates = (item) => {
    setClassDates(item);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (sessionData) => {
      const { data } = await axiosSecure.post('/study-session', sessionData);
      return data;
    },
    onSuccess: () => {
      toast.success('Study Session Proposal Submitted Successfully!');
      navigate('/dashboard/my-sessions');
      setLoading(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const sessionFee = form.sessionFee.value;
    const image = form.image.files[0];

    const tutor = {
      name: user?.displayName,
      email: user?.email,
    };

    try {
      const image_url = await imageUpload(image);
      const sessionData = {
        title,
        description,
        registrationStartDate: registrationDates.startDate,
        registrationEndDate: registrationDates.endDate,
        classStartDate: classDates.startDate,
        classEndDate: classDates.endDate,
        sessionFee,
        tutor,
        image: image_url,
        status: 'pending',
      };

      await mutateAsync(sessionData);
      if(data?.insertedId>0){ toast.success('Successfully Added New Session')}
     
    } catch (err) {
      toast.error(err.message);
      // setLoading(false);
    }
  };

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Study Session | Dashboard</title>
      </Helmet>
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold mb-4 border p-3'>Create Your Study Session</h1>
      </div>
      {/* Form */}
      <AddStudySessionForm
        registrationDates={registrationDates}
        handleRegistrationDates={handleRegistrationDates}
        classDates={classDates}
        handleClassDates={handleClassDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
        isTutor={user?.role === 'tutor'} // Pass role to the form
      />
    </>
  );
};

export default AddStudySession;

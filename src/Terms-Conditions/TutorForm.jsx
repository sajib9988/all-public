import { useState } from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


import { imageUpload } from './../Utility/Index';
import useAuth from './../Hook/UseAuth';



const TutorForm = () => {
// Get the current user's data
  const {user} =useAuth()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.elements;

    // Initialize imageUrl variable
    let uploadedImageUrl = '';

    // Check if a file is selected and upload the image
    if (form.profilePicture.files[0]) {
      try {
        uploadedImageUrl = await imageUpload(form.profilePicture.files[0]);
        setImageUrl(uploadedImageUrl); // Update state with the image URL
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
        return; // Exit the function if image upload fails
      }
    }

    // Construct form data with or without imageUrl
    const formData = {
      education: form.education.value,
      experience: form.experience.value,
      skills: form.skills.value,
      role: 'Tutor',
      status: 'requested',
      acceptTerms: form.acceptTerms.checked,
      ratings: form.ratings.value,
      image: uploadedImageUrl, // Include imageUrl in formData
    };

    try {
      const response = await axiosSecure.put(`/tutors/${user.email}`, formData); // Use user's email in the PUT request
      if (response.data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation');
      } else {
        toast.success('Please wait for admin approval');
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit data. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="mt-16">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mt-4 mx-auto p-6 bg-green-500 rounded shadow-md"
      >
        <h2 className="text-2xl text-center font-bold mb-4">Become a Tutor</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4">
            <div className="mb-4">
              <label className="block text-gray-700">Education</label>
              <input
                type="text"
                name="education"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your education"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your experience"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your skills"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <div className="mb-4">
              <label className="block text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Ratings</label>
              <input
                type="number"
                name="ratings"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter your ratings"
                step="0.1"
                min="0"
                max="5"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  className="mr-2"
                  required
                />
                I agree to the terms and conditions
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mr-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorForm;

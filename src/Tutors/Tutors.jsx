import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAxiosSecure from '../Hook/useAxiosSecure';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosSecure.get('/tutors');
        setTutors(response.data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i < rating ? '#facc15' : '#d1d5db'}
          className="star text-xl"
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-6 bg-green-900 bg-opacity-30 rounded-lg shadow-lg mt-5">
      <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-12">Meet Our Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tutors.map((tutor) => (
          <motion.div
            key={tutor.email}
            className="bg-white border p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex justify-center mb-6 ">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-54 h-34 rounded-full object-cover border-4 border-green-400"
                style={{ objectPosition: 'top' }} 
              />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-3">{tutor.name}</h2>
            <p className="text-gray-600 text-center mb-2">Email: <span className="font-medium">{tutor.email}</span></p>
            <p className="text-gray-600 text-center mb-2">Education: <span className="font-medium">{tutor.education}</span></p>
            <p className="text-gray-600 text-center mb-2">Experience: <span className="font-medium">{tutor.experience}</span></p>
            <p className="text-gray-600 text-center mb-4">Skills: <span className="font-medium">{tutor.skills}</span></p>
            <div className="flex justify-center items-center">
              <div className="flex">{renderStars(parseFloat(tutor.ratings))}</div>
              <span className="ml-2 text-gray-800 font-semibold">{tutor.ratings}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;

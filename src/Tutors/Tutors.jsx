import  { useEffect, useState } from 'react';

import { FaStar } from 'react-icons/fa'; // FontAwesome Star Icon for ratings
import { motion } from 'framer-motion'; // Framer Motion for animations
import useAxiosSecure from '../Hook/useAxiosSecure';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosSecure.get('/tutors');
        console.log(response.data)
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
          color={i < rating ? '#ffc107' : '#e4e5e9'}
          className="star"
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-8">Our Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tutors.map((tutor) => (
          <motion.div
            key={tutor.email}
            className="bg-white p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex justify-center mb-4">
              <img
                src={tutor.image}
                alt={tutor.name}
                className=" rounded-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold text-center mb-2">{tutor.name}</h2>
            <p className="text-gray-700 font-bold text-center mb-2">Email: {tutor.email}</p>
            <p className="text-gray-700 font-bold text-center mb-2">Education: {tutor.education}</p>
            <p className="text-gray-700 font-bold text-center mb-2">Experience: {tutor.experience}</p>
            <p className="text-gray-700 font-bold text-center mb-2">Skills: {tutor.skills}</p>
            <div className="flex justify-center items-center mb-2">
              <div className="flex">{renderStars(parseFloat(tutor.ratings))}</div>
              <span className="ml-2 font-bold text-gray-700">{tutor.ratings}</span>
            </div>
            <p className="text-gray-700 font-bold text-center">Status: {tutor.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bannerData = [
  {
    id: 1,
    title: "Empower Your Learning",
    description: "Join a community of learners and grow together.",
    imageUrl: "https://i.ibb.co/ysjS1Z4/technology.jpg",
    ctaText: "Get Started",
    ctaLink: "/login",
  },
  {
    id: 2,
    title: "Learn from the Best Tutors",
    description: "Access quality education with expert guidance.",
    imageUrl: "https://i.ibb.co/vJKzcJK/tutor-girl-home-writing-new-information.jpg",
    ctaText: "Explore Tutors",
    ctaLink: "/login",
  },
  {
    id: 3,
    title: "Collaborative Study Sessions",
    description: "Engage with peers and excel in your studies.",
    imageUrl: "https://i.ibb.co/25bRPgf/creative-students-working-together.jpg",
    ctaText: "Join Sessions",
    ctaLink: "/login",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-[528px] mt-12 rounded-md shadow-md overflow-hidden md:px-auto mx-2">
      <motion.div
        className="flex h-full"
        animate={{ x: `-${currentIndex * 100}%` }} // Slide animation based on current index
        transition={{
          duration: 1, // Smooth transition
          ease: "easeInOut", // Smooth animation
        }}
      >
        {bannerData.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full flex items-center justify-center text-center relative md:mx-3"
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
            }}
          >
            <div className="bg-black bg-opacity-50 p-8 md:p-16 text-white flex flex-col items-center justify-center h-full w-full">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {banner.title}
              </h2>
              <p className="mb-6">{banner.description}</p>
              <a
                href={banner.ctaLink}
                className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
              >
                {banner.ctaText}
              </a>
            </div>
          </div>
        ))}
      </motion.div>
      {/* Left Icon */}
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer select-none"
        onClick={prevSlide}
      >
        &lt;
      </div>
      {/* Right Icon */}
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer select-none"
        onClick={nextSlide}
      >
        &gt;
      </div>
    </div>
  );
};

export default Banner;

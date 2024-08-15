import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Importing React Icons

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <img
              src="https://i.ibb.co/XSf9TxV/6258786184795404367-removebg-preview.png"
              alt="logo"
              width="100"
              height="100"
              className="mb-4"
            />
            <p className="text-gray-400">
              Online Study Center - Connecting students with top tutors and providing admin support.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row mb-6 md:mb-0">
            <div className="md:mr-8">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul>
                <li><a href="/" className="hover:text-gray-400">Home</a></li>
                <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                <li><a href="/services" className="hover:text-gray-400">Services</a></li>
                <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul>
                <li><a href="/faqs" className="hover:text-gray-400">FAQs</a></li>
                <li><a href="/blog" className="hover:text-gray-400">Blog</a></li>
                <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-gray-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

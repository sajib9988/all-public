import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null; // Return nothing if the modal is not open or user data is not available

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-base-100 rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-base-content hover:text-accent"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl text-center font-bold mb-4 text-base-content">User Details</h2>

        {/* User details displayed dynamically based on the role */}
        <div className="space-y-2 text-base-content">
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {user.status}
          </div>

          {/* Conditionally display tutor-specific details */}
          {user.role === 'Tutor' && (
            <>
              <div>
                <span className="font-semibold text-secondary">Education:</span> {user.education}
              </div>
              <div>
                <span className="font-semibold">Experience:</span> {user.experience}
              </div>
              <div>
                <span className="font-semibold">Skills:</span> {user.skills}
              </div>
              <div>
                <span className="font-semibold">Ratings:</span> {user.ratings}
              </div>
              <div>
                <span className="font-semibold">Accepted Terms:</span> {user.acceptTerms ? 'Yes' : 'No'}
              </div>
              <div className="mt-4">
                <img
                  src={user.image}
                  alt="User"
                  className="w-34 h-24 rounded-full object-cover mx-auto"
                />
              </div>
            </>
          )}

          {/* Display additional student-specific details (if any) */}
          {user.role === 'Student' && (
            <>
              {/* Add any student-specific fields if needed */}
              {/* Currently, no additional fields are present for students */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
UserDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['Tutor', 'Student']).isRequired,
    status: PropTypes.string.isRequired,
    education: PropTypes.string,
    experience: PropTypes.string,
    skills: PropTypes.string,
    ratings: PropTypes.number,
    acceptTerms: PropTypes.bool,
    image: PropTypes.string,
  }),
};

export default UserDetailsModal;

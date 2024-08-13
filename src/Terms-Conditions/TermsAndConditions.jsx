import { useNavigate } from 'react-router-dom';
import useAuth from './../Hook/UseAuth';

import toast from 'react-hot-toast';
import useAxiosSecure from '../Hook/useAxiosSecure'
const TermsAndConditions = () => {
  const { user, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAgree = async () => {
    try {
      const currentUser = {
        email: user?.email,
        role: 'tutor',
        status: 'requested',
      };
      console.log(currentUser);
      setLoading(true);
      const { data } = await axiosSecure.put(`/users`, currentUser);
          console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation');
      } else {
        toast.success('Please wait for admin approval');
      }
      navigate('/'); // Redirect to dashboard after the request
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to home or previous page
  };

  return (
    <div className='p-4 container mx-auto mt-6'>
      <h1 className='text-2xl font-bold text-center'>Terms and Conditions for Tutors</h1>
      <div className='mt-4'>
        <p className='text-sm text-center text-gray-500'>
          Welcome to our tutoring platform. By becoming a tutor, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2 className='text-lg font-semibold mt-6'>1. Tutor Responsibilities</h2>
        <ul className='list-disc list-inside'>
          <li>Provide accurate and truthful information during registration and profile setup.</li>
          <li>Conduct tutoring sessions in a professional and respectful manner.</li>
          <li>Prepare adequately for each tutoring session.</li>
          <li>Respect the privacy and confidentiality of students.</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>

        <h2 className='text-lg font-semibold mt-6'>2. Session Conduct</h2>
        <ul className='list-disc list-inside'>
          <li>Start and end sessions on time.</li>
          <li>Provide a conducive learning environment for students.</li>
          <li>Refrain from any form of harassment, discrimination, or inappropriate behavior.</li>
        </ul>

        <h2 className='text-lg font-semibold mt-6'>3. Payment and Fees</h2>
        <ul className='list-disc list-inside'>
          <li>Tutors will be compensated as per the agreed rates for each session.</li>
          <li>Payments will be made on a [weekly/monthly] basis to the bank account provided during registration.</li>
          <li>Any disputes regarding payment should be reported within 30 days.</li>
        </ul>

        <h2 className='text-lg font-semibold mt-6'>4. Termination</h2>
        <ul className='list-disc list-inside'>
          <li>We reserve the right to terminate your tutor account for any breach of these terms and conditions.</li>
          <li>You may terminate your tutor account at any time by notifying us in writing.</li>
        </ul>

        <h2 className='text-lg font-semibold mt-6'>5. Changes to Terms</h2>
        <ul className='list-disc list-inside'>
          <li>We may update these terms and conditions from time to time. We will notify you of any changes via email or through our platform.</li>
          <li>Your continued use of the platform after any changes indicates your acceptance of the new terms.</li>
        </ul>

        <h2 className='text-lg font-semibold mt-6'>6. Miscellaneous</h2>
        <ul className='list-disc list-inside'>
          <li>These terms constitute the entire agreement between you and our platform regarding your role as a tutor.</li>
          <li>If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.</li>
        </ul>
      </div>
      <div className='flex justify-center mt-6 space-x-4'>
        <button
          onClick={handleCancel}
          className='btn btn-outline py-4 px-4 text-white font-bold bg-red-700 rounded-3xl hover:bg-red-300'
        >
          Cancel
        </button>
        <button
          onClick={handleAgree}
          className='btn btn-outline py-4 px-4 text-white font-bold bg-green-700 rounded-3xl hover:bg-green-300'
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;

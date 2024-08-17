import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAuth from './../Hook/UseAuth';
import useAxiosPublic from './../Hook/axiosPublic';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const { signInWithGoogle, signInUser, loading, setLoading } = useAuth();
  const [email, setEmail] = useState('');
  const axiosPublic = useAxiosPublic(); // Get axios instance

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
        setLoading(true);
        await signInUser(email, password);

        // Delay to ensure token is set properly
        setTimeout(() => {
            const token = localStorage.getItem('access-token');
            if (token) {
                toast.success('Login Successful');
                navigate(from, { replace: true });
            } else {
                toast.error('Token not found');
            }
        }, 500); // Adjust delay as needed
    } catch (error) {
        toast.error('Login Failed: ' + error.message);
    } finally {
        setLoading(false);
    }
};




  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;

      // Create the currentUser object
      const currentUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        role: 'Student',
        status: 'Verified',
      };

      // Save user information to the database
      const response = await axiosPublic.post('/users', currentUser);

      if (response.data.insertedId) {
        toast.success('Signup Successful');
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Google Sign-In failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-green-300 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                {...register('email', { required: true })}
                onBlur={e => setEmail(e.target.value)}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {errors.email && <span className='text-red-500'>Email is required</span>}
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                {...register('password', { required: true })}
                autoComplete='current-password'
                id='password'
                required
                placeholder='***'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {errors.password && <span className='text-red-500'>Password is required</span>}
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border-2 m-3 p-2 border-black rounded cursor-pointer'
        >
          <FcGoogle size={32} />
          <p className='font-bold'>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center font-bold text-black'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-rose-500 text-gray-600 font-bold'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;

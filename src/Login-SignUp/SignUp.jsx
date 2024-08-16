import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { imageUpload } from './../Utility/Index';
import useAuth from './../Hook/UseAuth';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from './../Hook/axiosPublic';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    setLoading(true);

    try {
      const image_url = await imageUpload(image[0]);
      const result = await createUser(email, password);
      const loggedUser = result.user;
      await updateUserProfile(name, image_url);

      const currentUser = {
        name: loggedUser.displayName || name,
        email: loggedUser.email || email,
        role: 'Student',
        status: 'Verified',
      };

      const response = await axiosPublic.post('/users', currentUser);

      if (response.data.insertedId) {
        console.log('User added to the database');
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User created successfully.',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;

      const currentUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        role: 'Student',
        status: 'Verified',
      };

      const response = await axiosPublic.post('/users', currentUser);

      if (response.data.insertedId) {
        console.log('User added to the database');
        toast.success('Signup Successful');
      }
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Google Sign-In failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center mt-6 mb-3 min-h-screen'>
      <div className='flex flex-col w-[700px] p-4 fixed rounded-md sm:p-10 bg-green-500 bg-opacity-60 mt-3 mb-3 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to Study Center</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register('name', { required: 'Name is required' })}
                placeholder='Enter Your Name Here'
                className='w-full px-4 py-2 h-12 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </div>
            <div>
              <label htmlFor='image' className='block mb-1 text-sm'>
                Select Image
              </label>
              <input
                type='file'
                id='image'
                {...register('image', { required: 'Image is required' })}
                accept='image/*'
                className='w-full px-4 py-2 mb-1 h-12 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {errors.image && <span className='text-red-500'>{errors.image.message}</span>}
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                {...register('email', { required: 'Email is required' })}
                placeholder='Enter Your Email Here'
                className='w-full px-4 py-2 h-12 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor='password' className='text-sm mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                  }
                })}
                autoComplete='new-password'
                placeholder='***'
                className='w-full px-4 py-2 h-12 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </div>
          </div>
          <div className='col-span-1 sm:col-span-2'>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer w-full'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default SignUp;

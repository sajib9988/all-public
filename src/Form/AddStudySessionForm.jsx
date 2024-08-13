// AddStudySessionForm.js
import { DateRange } from 'react-date-range';
import { TbFidgetSpinner } from 'react-icons/tb';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const AddStudySessionForm = ({
  registrationDates,
  handleRegistrationDates,
  classDates,
  handleClassDates,
  handleSubmit,
  setImagePreview,
  imagePreview,
  imageText,
  handleImage,
  loading,
  isTutor,
}) => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <div className='w-full'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='space-y-6'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='title' className='block text-gray-600'>
                  Session Title
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                  name='title'
                  id='title'
                  type='text'
                  placeholder='Title'
                  required
                />
              </div>

              <div className='space-y-1'>
                <label htmlFor='description' className='block text-gray-600'>
                  Session Description
                </label>
                <textarea
                  id='description'
                  className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500'
                  name='description'
                  required
                ></textarea>
              </div>
            <div className='ml-[500px] flex justify-center'>
            <div className='space-y-1 border border-red-500 mr-3 '>
                <label htmlFor='registrationDates' className=' ml-3  text-center block font-bold text-black'>
                  Registration Dates
                </label>
                <DateRange
                  rangeColors={['#F43F5E']}
                  editableDateInputs={true}
                  onChange={item => handleRegistrationDates(item.selection)}
                  moveRangeOnFirstSelection={false}
                  ranges={[registrationDates]}
                  className='p-4 text-3xl font-bold bg-slate-600'
                />
              </div>

              {/* Class Date Range */}
              <div className='space-y-1 border border-red-500'>
                <label htmlFor='classDates' className='ml-3  text-center block font-bold text-black'>
                  Class Dates
                </label>
                <DateRange
                  rangeColors={['#F43F5E']}
                  editableDateInputs={true}
                  onChange={item => handleClassDates(item.selection)}
                  moveRangeOnFirstSelection={false}
                  ranges={[classDates]}
                  className='p-4 text-3xl font-bold'
                />
              </div>


            </div>
         
        
            </div>

            <div className='space-y-6'>
              <div className='p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center'>
                <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                  <div className='flex flex-col w-max mx-auto text-center'>
                    <label>
                      <input
                        className='text-sm cursor-pointer w-36 hidden'
                        type='file'
                        onChange={e => handleImage(e.target.files[0])}
                        name='image'
                        id='image'
                        accept='image/*'
                        hidden
                      />
                      <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                        {imageText.length > 20
                          ? imageText.split('.')[0].slice(0, 15) + '....' + imageText.split('.')[1]
                          : imageText}
                      </div>
                    </label>
                  </div>
                </div>
                <div className='h-16 w-16 object-cover overflow-hidden flex items-center'>
                  {imagePreview && <img src={imagePreview} alt='Preview' />}
                </div>
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='sessionFee' className='block text-gray-600'>
                  Session Fee ($)
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                  name='sessionFee'
                  id='sessionFee'
                  type='number'
                  placeholder='Fee in USD'
                  disabled // Disable input for Tutor
                  required
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type='submit'
            className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
          >
            {loading ? (
              <TbFidgetSpinner className='animate-spin m-auto' />
            ) : (
              'Submit Proposal'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudySessionForm;

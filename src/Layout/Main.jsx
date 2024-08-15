import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from './../Home-Footer/Footer';
import image from '../bg-image/image.jpg'; // Import the image correctly

const Main = () => {
  return (
    <div 
      className="bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${image})` }} // Use template literal to reference the image variable
    >
      <div className=" mx-auto"> {/* Container for centering content */}
        <Navbar />
        <div className='pt-24 min-h-[calc(100vh-68px)]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Main;

import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar/Navbar';
import Footer from './../Home-Footer/Footer';

const Main = () => {
  return (
    <div className='mx-auto '>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Main
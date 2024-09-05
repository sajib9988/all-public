import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";


const Dashboard = () => {
    return (
        <div className='relative min-h-screen md:flex'>
        {/* Sidebar */}
        <Sidebar className=''/>
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 md:ml-64'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
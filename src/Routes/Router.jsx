import { createBrowserRouter } from "react-router-dom";
import Main from './../Layout/Main';
import ErrorPage from './ErrorPage';
import Home from './../Home-Footer/Home';
import Login from './../Login-SignUp/Login';
import SignUp from './../Login-SignUp/SignUp';
import Dashboard from './../Layout/Dashboard';
import Shared from './../Dashboard-pages/Shared/Shared';
import ViewAllMaterials from './../Dashboard-pages/DashboardAdmin/ViewAllMaterials';
import ViewAllUsers from './../Dashboard-pages/DashboardAdmin/ViewAllUsers';
import ViewAllStudySessionAdmin from './../Dashboard-pages/DashboardAdmin/ViewAllStudySessionAdmin';
import TermsAndConditions from "../Terms-Conditions/TermsAndConditions";
import AddStudySession from './../Dashboard-pages/DashboardTutor/AddStudySession';
import ViewAllStudySession from './../Dashboard-pages/DashboardTutor/ViewAllStudySession';
import UploadMaterial from './../Dashboard-pages/DashboardTutor/UploadMaterial';
import ViewMaterial from './../Dashboard-pages/DashboardTutor/ViewMaterial';
import ViewBookedSession from './../Dashboard-pages/DashboardStudent/ViewBookedSession';
import CreateNote from './../Dashboard-pages/DashboardStudent/CreateNote';
import ManagePersonalNote from './../Dashboard-pages/DashboardStudent/ManagePersonalNote';
import Profile from './../Dashboard-pages/Shared/Profile';
import Details from './../Card&details/Details';




export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/details/:id', element: <Details></Details> },
  { path: '/terms-and-conditions', element:<TermsAndConditions></TermsAndConditions>  },



  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      // Shared Part
      {
        index: true,
        element: <Shared />,
      },
      // Tutor Part
      {
        path: 'create-session',
        element: <AddStudySession />,
      },
      {
        path: 'my-sessions',
        element: <ViewAllStudySession />,
      },
      {
        path: 'upload-materials',
        element: <UploadMaterial />,
      },
      {
        path: 'view-materials',
        element: <ViewMaterial />,
      },
      // Admin Part
      {
        path: 'view-materials-admin',
        element: <ViewAllMaterials />,
      },
      {
        path: 'manage-users',
        element: <ViewAllUsers/>,
      },
      {
        path: 'manage-sessions',
        element: <ViewAllStudySessionAdmin/>,
      },
      // Student Part
      {
        path: 'booked-sessions',
        element: <ViewBookedSession />,
      },
      {
        path: 'create-note',
        element: <CreateNote />,
      },
      {
        path: 'manage-notes',
        element: <ManagePersonalNote />,
      },
      {
        path: 'profile',
        element: <Profile></Profile>,
      },
    ],
  },
]);

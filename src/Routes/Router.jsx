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
import AddStudySession from './../Dashboard-pages/DashboardTutor/AddStudySession';
import ViewAllStudySession from './../Dashboard-pages/DashboardTutor/ViewAllStudySession';
import UploadMaterial from './../Dashboard-pages/DashboardTutor/UploadMaterial';
import ViewMaterial from './../Dashboard-pages/DashboardTutor/ViewMaterial';
import ViewBookedSession from './../Dashboard-pages/DashboardStudent/ViewBookedSession';
import CreateNote from './../Dashboard-pages/DashboardStudent/CreateNote';
import ManagePersonalNote from './../Dashboard-pages/DashboardStudent/ManagePersonalNote';
import Profile from './../Dashboard-pages/Shared/Profile';
import Details from './../Card&details/Details';
import TutorForm from './../Terms-Conditions/TutorForm';
import StudyMaterials from "../Dashboard-pages/DashboardStudent/StudyMaterials";
import PrivateRoute from './../PrivateRoutes/PrivateRoute';
import TutorRoute from "../PrivateRoutes/TutorRoute";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import Payment from "../PaymentParts/Payment";

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
  { path: '/details/:id/:slug', element: <PrivateRoute><Details /></PrivateRoute> },
  { path: '/tutor-form', element: <PrivateRoute><TutorForm /></PrivateRoute> },
  {
    path: '/payment/:sessionId',
    element: <PrivateRoute><Payment /></PrivateRoute>,
    loader: ({ params }) => fetch(`http://localhost:5000/bookings-payment/${params?.sessionId}`)
    
},


  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // Shared Part (Guarded by PrivateRoute)
      {
        index: true,
        element: <Shared />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },

      // Tutor Part (Guarded by TutorRoute)
      {
        path: 'create-session',
        element: <TutorRoute><AddStudySession /></TutorRoute>,
      },
      {
        path: 'my-sessions',
        element: <TutorRoute><ViewAllStudySession /></TutorRoute>,
      },
      {
        path: 'upload-materials',
        element: <TutorRoute><UploadMaterial /></TutorRoute>,
      },
      {
        path: 'view-materials',
        element: <TutorRoute><ViewMaterial /></TutorRoute>,
      },

      // Admin Part (Guarded by AdminRoute)
      {
        path: 'view-materials-admin',
        element: <AdminRoute><ViewAllMaterials /></AdminRoute>,
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ViewAllUsers /></AdminRoute>,
      },
      {
        path: 'manage-sessions',
        element: <AdminRoute><ViewAllStudySessionAdmin /></AdminRoute>,
      },

      // Student Part (Guarded by PrivateRoute)
      {
        path: 'booked-sessions',
        element: <PrivateRoute><ViewBookedSession /></PrivateRoute>,
      },
      {
        path: 'create-note',
        element: <PrivateRoute><CreateNote /></PrivateRoute>,
      },
      {
        path: 'manage-notes',
        element: <PrivateRoute><ManagePersonalNote /></PrivateRoute>,
      },
      {
        path: 'study-materials/:email',
        element: <PrivateRoute><StudyMaterials /></PrivateRoute>,
      },
    ],
  },
]);

import PropTypes from 'prop-types';
import  { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import useAuth from '../Hook/UseAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // console.log('user', user, loading)
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      setRedirectPath('/login');
    }
  }, [loading, user]);

  if (loading) return <LoadingSpinner />;

  if (redirectPath) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;

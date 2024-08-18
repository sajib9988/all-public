/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/UseAuth";
import useRole from "../Hook/UseRole";
 // Assuming useRole is a custom hook to check user roles

const TutorRoute = ({ children }) => {
    const { user, loading } = useAuth(); 
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user && role === 'tutor') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default TutorRoute;

import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ isAuthenticated }) {
    console.log(isAuthenticated)
    if (!isAuthenticated) return <Navigate to="/" replace />;

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
};

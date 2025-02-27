import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ isAuthenticated }) {
    if (!isAuthenticated) return <Navigate to="/log-in" replace />;

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
};

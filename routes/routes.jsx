import { createBrowserRouter } from "react-router-dom";
import LogIn from "../src/components/logIn/logIn";
import SignUp from "../src/components/signUp/signUp";
import ProtectedRoute from "../src/components/protectedRoute";
import Index from "../src/components";
import LogOut from "../src/components/logOut";

function isAuthenticated() {
    return localStorage.getItem("token");
}

const route = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/log-in",
        element: <LogIn />,
    },
    {
        path: "/log-out",
        element: <LogOut />,
    },
    {
        element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
        children: [],
    },
]);

export default route;

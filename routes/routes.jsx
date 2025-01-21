import { createBrowserRouter } from "react-router-dom";
import LogIn from "../src/components/logIn/logIn";
import SignUp from "../src/components/signUp/signUp";
import ProtectedRoute from "../src/components/protectedRoute";

function isAuthenticated() {
    return localStorage.getItem("token");
}

const route = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
        children: [
            {
                path: "/sign-up",
                element: <SignUp />,
            },
        ],
    },
]);

export default route;

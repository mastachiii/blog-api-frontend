import { createBrowserRouter } from "react-router-dom";
import LogIn from "../src/components/logIn/logIn";
import SignUp from "../src/components/signUp/signUp";

const route = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
]);

export default route;

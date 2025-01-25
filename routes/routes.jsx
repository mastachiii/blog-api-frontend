import { createBrowserRouter } from "react-router-dom";
import LogIn from "../src/components/logIn/logIn";
import SignUp from "../src/components/signUp/signUp";
import ProtectedRoute from "../src/components/protectedRoute";
import Index from "../src/components";
import LogOut from "../src/components/logOut";
import BlogPage from "../src/components/blog";
import Error from "../src/components/error";
import Editor from "../src/components/editor";

function isAuthenticated({ type }) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return type === "author" ? token && user === "mastachii" : token != false;
}

const route = createBrowserRouter([
    {
        path: "/",
        element: <Index isAuthor={false} />,
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
        element: <ProtectedRoute isAuthenticated={isAuthenticated({ type: "user" })} />,
        children: [
            {
                path: "/posts/:id",
                element: <BlogPage />,
            },
        ],
    },
    {
        element: <ProtectedRoute isAuthenticated={isAuthenticated({ type: "author" })} />,
        children: [
            {
                path: "/author",
                element: <Index isAuthor={true} />,
            },
            {
                path: "/author/edit/:id",
                element: <Editor method={"edit"} />,
            },
            {
                path: "/author/create",
                element: <Editor method={"create"} />,
            },
        ],
    },
    {
        path: "/error",
        element: <Error />,
    },
]);

export default route;

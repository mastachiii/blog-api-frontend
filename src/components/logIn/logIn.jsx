import { useState } from "react";
import { Link } from "react-router-dom";
import User from "../../helpers/userApi";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);
    const user = localStorage.getItem("token");

    function handleSubmit(e) {
        e.preventDefault();

        User.logIn({ username, password, errMessageHandler: setErrMessage });
    }

    if (user) window.location.href = "/";

    return (
        <div className="logInContainer">
            <h4>Log-In</h4>
            <form onSubmit={handleSubmit}>
                {errMessage && <p>{errMessage}</p>}
                <label htmlFor="username" id="username">
                    Username:
                </label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Log In</button>
                <Link to={"/sign-up"}>Don't have an account?</Link>
            </form>
        </div>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import User from "../../helpers/userApi";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errMessages, setErrMessages] = useState([]);
    const user = localStorage.getItem("token");

    function handleSubmit(e) {
        e.preventDefault();

        User.signUp({ username, email, password, passwordConfirm, errMessageHandler: setErrMessages });
    }

    if (user) window.location.href = "/";

    return (
        <div>
            <h4>Sign up</h4>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errMessages.map(err => {
                        return <li key={err.path}>{err.msg}</li>;
                    })}
                </ul>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} id="username" />
                <label htmlFor="email">Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" />
                <label htmlFor="passwordConfirm">Confirm password:</label>
                <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} id="password" />
                <button>Sign-up</button>
                <Link to={"/log-in"}>Already have an account? </Link>
            </form>
        </div>
    );
}

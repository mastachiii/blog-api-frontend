import { useState } from "react";
import { Link } from "react-router-dom";

async function makeSignUpReq({ username, email, password, passwordConfirm, errMessagesHandler }) {
    try {
        await fetch("http://localhost:8080/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, passwordConfirm }),
        })
            .then(response => response.json())
            .then(response => {
                if (response.err) {
                    // console.log(response);
                    errMessagesHandler(response.messages);
                } else {
                    window.location.replace("/log-in");
                }
            });
    } catch (err) {
        console.log(err);

        window.location.replace("/");
    }
}

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errMessages, setErrMessages] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        makeSignUpReq({ username, email, password, passwordConfirm, errMessagesHandler: setErrMessages });
    }

    // console.log(errMessages)

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
                <Link to={"/"}>Already have an account? </Link>
            </form>
        </div>
    );
}

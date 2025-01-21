import { useState } from "react";
import { Link } from "react-router-dom";

async function makeSignUpReq({ username, email, password, passwordConfirm }) {
    try {
        await fetch("http://localhost:8080/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, passwordConfirm }),
        }).then(() => window.location.replace("/"));
        
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

    function handleSubmit(e) {
        e.preventDefault();

        makeSignUpReq({ username, email, password, passwordConfirm });
    }

    return (
        <div>
            <h4>Sign up</h4>
            <form onSubmit={handleSubmit}>
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

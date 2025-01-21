import { useState } from "react";
import { Link } from "react-router-dom";

async function makeLogInReq({ username, password }) {
    try {
        await fetch("http://localhost:8080/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(r => r.json())
            .then(r => {
                localStorage.setItem("token", `Bearer ${r}`);
                window.location.replace("/");
            });
    } catch (err) {
        console.log(err); // TODO: Error page

        window.location.replace("/");
    }
}

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        makeLogInReq({ username, password });
    }

    return (
        <div>
            <h4>Log-In</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" id="username">
                    Username:
                </label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Log in</button>
                <Link to={"/sign-up"}>Dont have an account?</Link>
            </form>
        </div>
    );
}

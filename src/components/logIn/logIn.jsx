import { useState } from "react";
import { Link } from "react-router-dom";

async function makeLogInReq({ username, password, errMessageHandler }) {
    try {
        await fetch("http://localhost:8080/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.err) {
                    errMessageHandler(response.message);
                } else {
                    localStorage.setItem("token", `Bearer ${response}`);
                    window.location.replace("/");
                }
            });
    } catch (err) {
        console.log(err); // TODO: Error page

        window.location.replace("/");
    }
}

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        makeLogInReq({ username, password, errMessageHandler: setErrMessage });
    }

    return (
        <div>
            <h4>Log-In</h4>
            <form onSubmit={handleSubmit}>
                {errMessage && <p>{errMessage}</p>}
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

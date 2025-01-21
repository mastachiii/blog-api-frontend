import { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    function handleSubmit() {}

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
            </form>
        </div>
    );
}

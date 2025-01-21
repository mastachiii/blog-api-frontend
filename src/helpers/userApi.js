// Interface for making API calls related to User model, JSX looks really messy if I include Fetching stuff

class User {
    constructor() {
        this.signUpUrl = "http://localhost:8080/sign-up";
        this.logInUrl = "http://localhost:8080/log-in";
    }

    getOptions({ method, headers, body }) {
        return {
            method,
            headers,
            body: JSON.stringify(body),
        };
    }

    async logIn({ username, password, errMessageHandler }) {
        try {
            fetch(this.logInUrl, this.getOptions({ method: "POST", headers: { "Content-Type": "application/json" }, body: { username, password } }))
                .then(response => response.json())
                .then(data => {
                    if (data.err) {
                        errMessageHandler(data.message); // Rerender log in component and pass error messages..
                    } else {
                        localStorage.setItem("token", `Bearer ${data}`);
                        window.location.href = "/";
                    }
                });
        } catch (err) {
            console.log(err);

            window.location.href = "/";
        }
    }

    async signUp({ username, email, password, passwordConfirm, errMessageHandler }) {
        try {
            fetch(
                this.signUpUrl,
                this.getOptions({
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: {
                        username,
                        email,
                        password,
                        passwordConfirm,
                    },
                })
            )
                .then(response => response.json())
                .then(data => {
                    if (data.err) {
                        errMessageHandler(data.messages);
                    } else {
                        window.location.href = "/log-in";
                    }
                });
        } catch (err) {
            console.log(err);

            window.location.href = "/";
        }
    }
}

export default new User();

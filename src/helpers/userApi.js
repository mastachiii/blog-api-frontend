// Interface for making API calls related to User model, JSX looks really messy if I include Fetching stuff

class User {
    constructor() {
        this.signUpUrl = "https://blog-api-backend-ncee.onrender.com/sign-up";
        this.logInUrl = "https://blog-api-backend-ncee.onrender.com/log-in";
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
                        localStorage.setItem("token", `Bearer ${data.token}`);
                        localStorage.setItem("user", data.user);
                        window.location.href = "/";
                    }
                });
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
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
                .then(response => {
                    if (response.status === 204) {
                        return (window.location.href = "/log-in");
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data.err) errMessageHandler(data.messages);
                });
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }
}

export default new User();

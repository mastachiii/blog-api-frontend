// Interface for making API calls for Blog model.
class Blog {
    constructor() {
        this.postsUrl = "http://localhost:8080/posts";
        this.token = window.localStorage.getItem("token");
    }

    getOptions({ method, headers, body }) {
        return {
            method,
            headers,
            body: JSON.stringify(body),
        };
    }

    async getAllPosts() {
        try {
            const posts = await fetch(this.postsUrl, this.getOptions({ method: "GET", headers: { Authorization: this.token } }))
                .then(response => response.json())
                .then(data => data.posts);

            return posts;
        } catch (err) {
            console.log(err);
            // window.location.href = "/"; // really need an error page... causes infinite loop
        }
    }

    async getPost({ id }) {
        try {
            const post = await fetch(
                `${this.postsUrl}/${id}`,
                this.getOptions({
                    method: "GET",
                    headers: {
                        Authorization: this.token,
                    },
                })
            ).then(response => response.json());

            return post;
        } catch (err) {
            console.log(err);
        }
    }

    async createComment({ id, comment }) {
        try {
            const { data } = await fetch(
                `${this.postsUrl}/${id}`,
                this.getOptions({
                    method: "POST",
                    headers: {
                        Authorization: this.token,
                        "Content-Type": "application/json",
                    },
                    body: { comment },
                })
            ).then(response => response.json());

            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new Blog();

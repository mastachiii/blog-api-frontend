// Interface for making API calls for Blog model.
class Blog {
    constructor() {
        this.postsUrl = "http://localhost:8080/posts";
        this.token = window.localStorage.getItem("token");
    }

    getOptions({ method, body, headers = { Authorization: this.token } }) {
        return {
            method,
            headers,
            body: JSON.stringify(body),
        };
    }

    async createPost({ title, body, isPrivate }) {
        try {
            await fetch(
                this.postsUrl,
                this.getOptions({
                    method: "POST",
                    headers: {
                        Authorization: this.token,
                        "Content-Type": "application/json",
                    },
                    body: { title, body, private: isPrivate },
                })
            );

            window.location.href = "/";
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }

    async getAllPosts() {
        try {
            const posts = await fetch(this.postsUrl, this.getOptions({ method: "GET" }))
                .then(response => response.json())
                .then(data => data.posts);

            return posts;
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }

    async getPost({ id }) {
        try {
            const post = await fetch(
                `${this.postsUrl}/${id}`,
                this.getOptions({
                    method: "GET",
                })
            ).then(response => response.json());

            return post;
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }

    async deletePost({ id }) {
        try {
            await fetch(
                `${this.postsUrl}/${id}`,
                this.getOptions({
                    method: "DELETE",
                })
            );

            location.reload();
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
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

            window.location.href = "/error";
        }
    }
}

export default new Blog();

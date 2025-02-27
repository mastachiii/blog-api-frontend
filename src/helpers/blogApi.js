// Interface for making API calls for Blog model.
class Blog {
    constructor() {
        this.postsUrl = "https://blog-api-backend-ncee.onrender.com/posts";
        this.token = window.localStorage.getItem("token");
    }

    getOptions({ method, body, headers = { Authorization: this.token } }) {
        return {
            method,
            headers,
            body: JSON.stringify(body),
        };
    }

    async createPost({ title, body, isPrivate, backdropUrl }) {
        try {
            await fetch(
                this.postsUrl,
                this.getOptions({
                    method: "POST",
                    headers: {
                        Authorization: this.token,
                        "Content-Type": "application/json",
                    },
                    body: { title, body, backdropUrl, private: isPrivate },
                })
            );

            window.location.href = "/author";
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }

    async updatePost({ title, body, isPrivate, backdropUrl, id }) {
        try {
            await fetch(
                `${this.postsUrl}/${id}`,
                this.getOptions({
                    method: "PUT",
                    headers: {
                        Authorization: this.token,
                        "Content-Type": "application/json",
                    },
                    body: { title, body, private: isPrivate, backdropUrl },
                })
            );

            window.location.href = "/author";
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }

    async getAllPosts() {
        try {
            const posts = await fetch(
                `${this.postsUrl}/author`,
                this.getOptions({
                    method: "GET",
                })
            )
                .then(response => response.json())
                .then(data => data.posts);

            return posts;
        } catch (err) {
            console.log(err);

            window.location.href = "/error";
        }
    }

    async getAllPublicPosts() {
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

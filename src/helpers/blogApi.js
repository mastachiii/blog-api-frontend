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
            const posts = await fetch(this.postsUrl, this.getOptions({ method: "GET", headers: { Authorization: `Bearer ${this.token}` } }))
                .then(response => response.json())
                .then(data => data.posts);

            return posts;
        } catch (err) {
            console.log(err);
            window.location.href = "/";
        }
    }
}

export default new Blog();

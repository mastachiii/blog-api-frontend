import { Link } from "react-router-dom";
import Blog from "../../src/helpers/blogApi";
import { useState, useEffect } from "react";

export default function Index() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const posts = await Blog.getAllPosts();
            console.log(posts);
            setPosts(posts);
        })();
    }, []);

    if (posts) {
        return (
            <div>
                <ul>
                    {posts.map(p => {
                        return (
                            <li key={p.id}>
                                <Link to={`/posts/${p.id}`}>{p.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return <p>Hello world</p>;
    }
}

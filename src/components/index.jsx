import { Link } from "react-router-dom";
import Blog from "../../src/helpers/blogApi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Index({ isAuthor }) {
    const [posts, setPosts] = useState([]);

    function handleDelete() {
        alert('DELETED')
    }

    useEffect(() => {
        (async () => {
            const posts = await Blog.getAllPosts();

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
                                {isAuthor && (
                                    <div>
                                        <button onClick={handleDelete}>DELETE</button>
                                    </div>
                                )}
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

Index.propTypes = {
    isAuthor: PropTypes.bool,
};

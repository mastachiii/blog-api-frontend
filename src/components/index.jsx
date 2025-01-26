import { Link } from "react-router-dom";
import Blog from "../../src/helpers/blogApi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Index({ isAuthor }) {
    const [posts, setPosts] = useState([]);

    function handleDelete({ id }) {
        const UserConfirmation = confirm("Are you sure you want to delete this post forever?");

        if (UserConfirmation) Blog.deletePost({ id });
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
                <div className="h-96 overflow-hidden mb-44">
                    <img src="https://image.tmdb.org/t/p/original/8xuLnoLM8zJ5BgUjMPQ81Wi4u6k.jpg" alt="" className="object-contain" />
                </div>
                <ul>
                    {posts.map(p => {
                        return (
                            <li key={p.id}>
                                <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                {isAuthor && (
                                    <div>
                                        <a href={`/author/edit/${p.id}`}>EDIT</a>
                                        <button onClick={() => handleDelete({ id: p.id })}>DELETE</button>
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

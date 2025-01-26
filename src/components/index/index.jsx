import { Link } from "react-router-dom";
import Blog from "../../helpers/blogApi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import { format } from "date-fns";

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
                <div className={styles.imgContainer}></div>
                <div className={styles.postsContainer}>
                    <h3>Komorebi</h3>
                    <h3>Posts</h3>
                    <ul>
                        {posts.map(p => {
                            return (
                                <li key={p.id}>
                                    <img src={p.backdropUrl} alt="" />

                                    <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                    <p>{format(new Date(p.createdAt), "PPP")}</p>
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
            </div>
        );
    } else {
        return <p>Hello world</p>;
    }
}

Index.propTypes = {
    isAuthor: PropTypes.bool,
};

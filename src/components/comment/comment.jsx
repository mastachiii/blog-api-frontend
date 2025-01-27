import { useState } from "react";
import Blog from "../../helpers/blogApi";
import { Link, useParams } from "react-router-dom";
import styles from "./comment.module.css";

export default function Comment() {
    const [comment, setComment] = useState("");
    const { id } = useParams();

    async function handleSubmit(e) {
        e.preventDefault();

        await Blog.createComment({ id, comment });

        setComment(""); // Force rerender after API call
    }

    return (
        <div className={styles.commentContainer}>
            {Blog.token ? (
                <form onSubmit={handleSubmit}>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="......"/>
                    <button>Comment</button>
                </form>
            ) : (
                <div>
                    <p>Log in to join the conversation!</p>
                    <span>
                        <Link to="/log-in">Log in</Link>
                        <Link to="/sign-up">Sign up</Link>
                    </span>
                </div>
            )}
        </div>
    );
}

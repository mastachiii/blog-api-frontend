import { useEffect, useState } from "react";
import Blog from "../helpers/blogApi";
import { useParams } from "react-router-dom";

export default function Comment({ post, postHandler }) {
    const [comment, setComment] = useState("");
    const { id } = useParams();

    async function handleSubmit(e) {
        e.preventDefault();

        await Blog.createComment({ id, comment });

        setComment(""); // Force rerender after API call
        postHandler();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea value={comment} onChange={e => setComment(e.target.value)} />
                <button>Comment</button>
            </form>
        </div>
    );
}

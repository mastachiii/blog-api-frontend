import { useEffect, useState } from "react";
import Blog from "../helpers/blogApi";
import { useParams } from "react-router-dom";

export default function BlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        (async () => {
            const post = await Blog.getPost({ id });

            setPost(post.data);
        })();
    }, [id]);

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.createdAt}</p>
            <p>{post.body}</p>
        </div>
    );
}

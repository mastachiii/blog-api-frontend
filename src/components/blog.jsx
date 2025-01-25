import { useEffect, useState } from "react";
import Blog from "../helpers/blogApi";
import Comment from "./comment";
import { useParams } from "react-router-dom";

export default function BlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        (async () => {
            const post = await Blog.getPost({ id });

            setPost(post.data);
        })();
    }, [id]);

    if (post) {
        return (
            <div>
                <h2>{post.title}</h2>
                <p>{post.createdAt}</p>
                <div dangerouslySetInnerHTML={{__html:post.body}}></div>
                <div>
                    <h4>Comments</h4>
                    <Comment />
                    {post.comments.map(c => {
                        return (
                            <span key={c.id}>
                                <p>{c.User.username}</p>
                                <p>{c.createdAt}</p>
                                <p>{c.body}</p>
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    }
}

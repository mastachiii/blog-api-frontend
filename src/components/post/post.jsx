import { useEffect, useState } from "react";
import Blog from "../../helpers/blogApi";
import Comment from "../comment/comment";
import { useParams } from "react-router-dom";
import styles from "./post.module.css";
import { format } from "date-fns";
import Loading from "../loading/loading";

export default function BlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        (async () => {
            const post = await Blog.getPost({ id });

            setTimeout(() => {
                setPost(post.data);
            }, 1000);
        })();
    }, [id]);

    if (post) {
        return (
            <div className={styles.postContainer}>
                <img src={post.backdropUrl} alt="Article image" />
                <h2>{post.title}</h2>
                <p>{format(new Date(post.createdAt), "PPP").toUpperCase()}</p>
                <div dangerouslySetInnerHTML={{ __html: post.body }} className={styles.bodyContainer}></div>
                <div className={styles.commentContainer}>
                    <h4>Comments</h4>
                    <Comment />
                    <div>
                        {post.comments.map(c => {
                            return (
                                <span key={c.id}>
                                    <p>{c.User.username}</p>
                                    <p>{format(new Date(c.createdAt), "PPP").toUpperCase()}</p>
                                    <p>{c.body}</p>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loading message={"Loading post..."} />;
    }
}

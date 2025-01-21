import Blog from "../../src/helpers/blogApi";
import { useState, useEffect } from "react";

export default function Index() {
    const [posts, setPosts] = useState([]);

    Blog.getAllPosts();
    return <p>Hello world</p>;
}

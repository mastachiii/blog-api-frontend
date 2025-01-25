import { useState } from "react";
import Blog from "../helpers/blogApi";
import PropTypes from "prop-types";

export default function Editor({ method }) {
    const [title, setTitle] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    function handleCreate(e) {
        e.preventDefault();
        const body = tinymce.get("editor").getContent(); // Tinymce === textarea, linter throwing error because tinymce is defined elsewhere.. code will still work

        Blog.createPost({ title, body, isPrivate });
    }

    return (
        <form onSubmit={method === "create" ? handleCreate : null}>
            <label htmlFor="title">Title: </label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} id="title" required />
            <label htmlFor="editor"></label>
            <textarea id="editor"></textarea>
            <label htmlFor="private">Make private?</label>
            <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} id="private" />
            <button type="submit">{method === "create" ? "Post" : "Update"}</button>
        </form>
    );
}

Editor.propTypes = {
    method: PropTypes.string,
};

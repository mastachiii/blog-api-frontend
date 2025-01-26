import { useEffect, useState } from "react";
import Blog from "../helpers/blogApi";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function Editor({ method }) {
    const [title, setTitle] = useState("");
    const [backdropUrl, setBackdropUrl] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            if (method !== "edit") return;

            const details = await Blog.getPost({ id });
            const { title, body, backdropUrl, isPrivate } = details.data;
            tinymce.get("editor").setContent(body);

            setTitle(title);
            setBackdropUrl(backdropUrl);
            setIsPrivate(isPrivate);
        })();
    }, [id, method]);

    function handleCreate(e) {
        e.preventDefault();

        const body = tinymce.get("editor").getContent(); // Tinymce === textarea, linter throwing error because tinymce is defined elsewhere.. code will still work

        Blog.createPost({ title, body, isPrivate, backdropUrl });
    }

    function handleUpdate(e) {
        e.preventDefault();

        const body = tinymce.get("editor").getContent();

        Blog.updatePost({ title, body, isPrivate, backdropUrl, id });
    }

    return (
        <form onSubmit={method === "create" ? handleCreate : handleUpdate}>
            <label htmlFor="title">Title: </label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} id="title" required />
            <label htmlFor="backdrop">Artice Image: </label>
            <input type="text" value={backdropUrl} onChange={e => setBackdropUrl(e.target.value)} id="backdrop" required />
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

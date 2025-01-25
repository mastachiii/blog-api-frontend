import { useState } from "react";

export default function Editor() {
    const [title, setTitle] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [bruh, setBruh] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        const body = tinymce.get("editor").getContent();
        setBruh(body);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} id="title" required />
            <label htmlFor="editor"></label>
            <textarea id="editor"></textarea>
            <label htmlFor="private">Make private?</label>
            <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} id="private" />
            <button type="submit">Post</button>
            <div dangerouslySetInnerHTML={{ __html: bruh }}></div>
        </form>
    );
}

export default function Editor() {
    return (
        <form action="">
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" id="title" required />
            <label htmlFor="editor"></label>
            <textarea id="editor" name="body"></textarea>
            <label htmlFor="private">Make private?</label>
            <input type="checkbox" name="private" id="private" />
            <button type="button">Post</button>
        </form>
    );
}

import { Link } from "react-router-dom";
import styles from "./error.module.css"

export default function Error() {
    return (
        <div className={styles.errorContainer}>
            <h1>Something went wrong...</h1>
            <Link to="/">Go back to main page?</Link>
        </div>
    );
}

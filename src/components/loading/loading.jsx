import PropTypes from "prop-types";
import spinner from "../../assets/loading.gif";
import styles from "./loading.module.css";

export default function Loading({ message }) {
    return (
        <div className={styles.loadingContainer}>
            <img src={spinner} alt="loading bar" />
            <p>{message}</p>
        </div>
    );
}

Loading.propTypes = {
    message: PropTypes.string,
};


import styles from '../styles/Switch.module.css'; // Optional: for styling

const Switch = ({ isActive, onToggle }) => {

    return (
        <div className={styles.switchContainer
        }>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={onToggle}
                />
                <span className={styles.slider}></span>
            </label>
        </div >
    );
};

export default Switch;
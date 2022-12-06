import styles from "./Spinner.module.css";

export default function Spinner(props:any) {
    const {loading , isplaying}= props;
  return (
    <div
      style={{ display: (loading) ? "block" : "none" }}
      className={styles.spinner}
    >
      <div className={styles.spinnerContainer}>
        <div className={styles.spinnerRotator}>
          <div className={styles.spinnerLeft}>
            <div className={styles.spinnerCircle}></div>
          </div>

          <div className={styles.spinnerRight}>
            <div className={styles.spinnerCircle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

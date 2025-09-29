import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1>Converter App</h1>
        </header>
        <main className={styles.content}>{children}</main>
        <footer className={styles.footer}>
          <p>Developed by Mobina With ❤</p>
        </footer>
      </div>
    </div>
  );
}

export default Layout;

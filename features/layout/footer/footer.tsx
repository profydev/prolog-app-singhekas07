import styles from "./footer.module.scss";
import { FooterLink } from "./footer-link";

const footerItems = [
  { text: "Docs" },
  { text: "API" },
  { text: "Help" },
  { text: "Community" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.version}>Version: {process.env.appVersion}</p>

      <nav>
        <ul data-cy={"nav-links"} className={styles.footerLinks}>
          {footerItems.map((item, index) => (
            <FooterLink key={index} {...item} />
          ))}
        </ul>
      </nav>

      <div data-cy={"small-logo"} className={styles.smallLogo}>
        <img src={"/icons/logo-small.svg"} alt="logo" />
      </div>
    </footer>
  );
}

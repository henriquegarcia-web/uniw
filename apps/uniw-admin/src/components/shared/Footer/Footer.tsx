// ─── Imports ────────────────────────────────────────────────────────────────

import styles from './Footer.module.scss'

// ─── Componente Footer ──────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Rodapé da aplicação">
      <span className={styles.footer__text}>
        {new Date().getFullYear()} UNIW. Desenvolvido por{' '}
        <a
          href="https://www.linkedin.com/in/henrique-garcia-dev/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__link}
        >
          Henrique Garcia
        </a>
      </span>
    </footer>
  )
}

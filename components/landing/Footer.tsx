'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <path d="M6 4C6 4 6 14 6 24M6 14L20 6M6 14L20 22" stroke="#E8503A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.logoText}>kyuc<sup>°</sup></span>
          </Link>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        {/* Center */}
        <p className={styles.center}>
          {t.footer.bilingual}
        </p>

        {/* Right */}
        <p className={styles.right}>
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}

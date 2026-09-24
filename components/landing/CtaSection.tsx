'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.label}>{t.cta.label}</p>
          <h2 className={styles.title}>
            {t.cta.titlePart1}{' '}
            <span className={styles.accent}>{t.cta.titlePart2}</span>
          </h2>
          <Link href="/signup" className={`btn btn-primary btn-lg ${styles.cta}`}>
            {t.cta.button}
            <svg className="arrow-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 15L15 3M15 3H7M15 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

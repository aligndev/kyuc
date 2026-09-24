'use client';

import Link from 'next/link';
import { categoryMeta } from '@/lib/questions';
import { useLanguage } from '@/lib/LanguageContext';
import styles from './StoryCategories.module.css';

export default function StoryCategories() {
  const { lang, t } = useLanguage();

  const categories = Object.entries(categoryMeta) as [
    keyof typeof categoryMeta,
    (typeof categoryMeta)[keyof typeof categoryMeta]
  ][];

  return (
    <section id="stories" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">{t.categories.eyebrow}</p>
          <h2 className={styles.title}>
            {t.categories.titlePart1}{' '}
            <span className={styles.accent}>{t.categories.titlePart2}</span>
          </h2>
          <p className={styles.subtitle}>
            {t.categories.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map(([key, meta]) => (
            <Link
              href={`/story/new?category=${key}`}
              key={key}
              className={styles.card}
              style={{ background: meta.color }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{meta.number}</span>
                <span className={styles.cardLabel}>— {meta.label[lang]}</span>
              </div>

              <h3 className={styles.cardTitle}>{meta.tagline[lang]}</h3>

              <p className={styles.cardQuestion}>{meta.sampleQuestion[lang]}</p>

              <div className={styles.cardFooter}>
                <span className={styles.cardExplore}>
                  {t.categories.explore} {meta.label[lang].toLowerCase()}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

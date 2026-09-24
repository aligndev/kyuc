'use client';

import { useLanguage } from '@/lib/LanguageContext';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: '01',
      label: t.howItWorks.step1Label,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 8C6 6.895 6.895 6 8 6h16c1.105 0 2 .895 2 2v14c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2V8z" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M11 13h10M11 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      number: '02',
      label: t.howItWorks.step2Label,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="13" y="6" width="6" height="13" rx="3" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 18c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M16 26v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      number: '03',
      label: t.howItWorks.step3Label,
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M11 16l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className="section-label">{t.howItWorks.eyebrow}</p>
            <h2 className={styles.title}>
              {t.howItWorks.titleMain}<br />
              {t.howItWorks.titleSub}
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.subtitle}>
              {t.howItWorks.subtitle}
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <p className={styles.stepNumber}>{step.number} / {step.label}</p>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

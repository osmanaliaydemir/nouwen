// Hero section — Server Component (static markup, no interactivity)
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`${styles.hero} container`}>
      <h1 className={styles.heroTitle}>
        <span className={styles.heroLine}>BURADA PLAN YOK</span>
        <span className={styles.heroLine}>SADECE TEK BİR SORU VAR:</span>
        <span className={`${styles.heroLine} ${styles.heroLineSerif}`}>
          ŞİMDİ DEĞİLSE NE ZAMAN?
        </span>
      </h1>
      <p className={styles.heroSubtitle}>
        NOUWEN&apos;İ KEŞFETMEYE
        <br />
        HAZIR MISIN?
      </p>
    </section>
  );
}

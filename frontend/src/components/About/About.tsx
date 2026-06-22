// About section — Server Component
import styles from './About.module.css';

export default function About() {
  return (
    <section className={`${styles.about} container`} id="about">
      <svg className={styles.aboutSpark} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#spark" />
      </svg>
      <h2 className={styles.aboutTitle}>Nouwen Nedir?</h2>
      <p className={styles.aboutText}>
        Seul&apos;den gelen deneyim dünyası seni bekliyor.
        <br />
        Burada eğlence adım attığın anda başlar. Cevaplaman gereken tek soru ise;
        <br />
        Hangisinden başlıyoruz?
      </p>
    </section>
  );
}

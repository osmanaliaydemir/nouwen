// About section — Server Component
import styles from './About.module.css';

export default function About() {
  return (
    <section className={`${styles.about} container`} id="about">
      {/* Sol Yıldız */}
      <div className={styles.aboutStarLeft}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <use href="#burst" />
        </svg>
      </div>

      {/* Sağ Yıldız */}
      <div className={styles.aboutStarRight}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <use href="#burst" />
        </svg>
      </div>

      <svg className={styles.aboutSpark} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#spark" />
      </svg>
      <h2 className={styles.aboutTitle}>Nouwen Nedir?</h2>

      <div className={styles.aboutContent}>
        <p className={styles.aboutText}>
          Seul&apos;den gelen deneyim dünyası seni bekliyor. Burada eğlence adım attığın anda başlar. Cevaplaman gereken tek soru ise; hangisinden başlıyoruz?
        </p>

        <div className={styles.aboutLinksGroup}>
          <a
            href="https://maps.app.goo.gl/QJKv3arf7C5iXfnt7"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aboutSocial}
            aria-label="Konum sayfamızı ziyaret edin"
          >
            <img src="/images/pin.png" alt="Konum" className={styles.socialIcon} />
            <h3 className={`${styles.aboutLocation} ${styles.animatedSweep}`} style={{ animationDelay: '0s' }}>
              <b>AKASYA</b> AVM 3. Katta!
            </h3>
          </a>

          <a
            href="https://instagram.com/nouwenofficial"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aboutSocial}
            aria-label="Instagram sayfamızı ziyaret edin"
          >
            <img src="/images/instagram.png" alt="Instagram" className={styles.socialIcon} />
            <span className={styles.animatedSweep} style={{ animationDelay: '3s' }}>@NouwenOfficial</span>
          </a>
        </div>
      </div>
    </section>
  );
}

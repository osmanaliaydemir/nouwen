'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { COUNTDOWN_TARGET } from '@/lib/constants';
import styles from './Countdown.module.css';

/** Kalan gün sayısını hesaplar (en az 0) */
function calcDays(): number {
  return Math.max(0, Math.ceil((COUNTDOWN_TARGET.getTime() - Date.now()) / 86_400_000));
}

export default function Countdown() {
  const clockRef = useRef<HTMLDivElement>(null);
  // Başlangıç değeri: SSR'da 0, client'ta gerçek gün (hydration flash engellenir)
  const [days, setDays] = useState(0);

  /* ---------- alignRails ----------
     Measures the two nav-dividers and pins the flip-clock columns
     to match them, so the strings read as one continuous vertical line. */
  const alignRails = useCallback(() => {
    const clock = clockRef.current;
    if (!clock) return;

    const header = document.querySelector<HTMLElement>('.site-header, [class*="siteHeader"]');
    const dividers = Array.from(
      document.querySelectorAll<HTMLElement>('[class*="navDivider"]')
    );

    if (!header || dividers.length < 2) {
      ['--pin-left', '--pin-right', '--card-w', '--string-h'].forEach((p) =>
        clock.style.removeProperty(p)
      );
      return;
    }

    const visible =
      dividers[0].offsetParent !== null &&
      getComputedStyle(dividers[0]).display !== 'none';

    if (!visible) {
      ['--pin-left', '--pin-right', '--card-w', '--string-h'].forEach((p) =>
        clock.style.removeProperty(p)
      );
      return;
    }

    const clockRect = clock.getBoundingClientRect();
    const xs = dividers
      .map((d) => {
        const b = d.getBoundingClientRect();
        return b.left + b.width / 2 - clockRect.left;
      })
      .sort((a, b) => a - b);

    const [xL, xR] = xs;
    const gap = xR - xL;
    const cardW = Math.max(70, gap - 14);
    const stringH = Math.max(40, clockRect.top - header.getBoundingClientRect().bottom);

    clock.style.setProperty('--pin-left', `${xL}px`);
    clock.style.setProperty('--pin-right', `${xR}px`);
    clock.style.setProperty('--card-w', `${cardW}px`);
    clock.style.setProperty('--string-h', `${stringH}px`);
  }, []);

  /* ---------- Live countdown ---------- */
  useEffect(() => {
    // İlk yüklemede anında hesapla
    setDays(calcDays());
    // Her dakika güncelle
    const id = setInterval(() => setDays(calcDays()), 60_000);
    return () => clearInterval(id);
  }, []);

  /* ---------- Rail alignment ---------- */
  useEffect(() => {
    alignRails();
    window.addEventListener('resize', alignRails);
    document.fonts?.ready?.then(alignRails);
    return () => window.removeEventListener('resize', alignRails);
  }, [alignRails]);

  return (
    <section className={styles.countdown} id="countdown">
      {/* Decorations */}
      <svg className={`${styles.deco} ${styles.decoBurst} ${styles.decoBurstLeft}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#burst" />
      </svg>
      <svg className={`${styles.deco} ${styles.decoBurst} ${styles.decoBurstRight}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#burst" />
      </svg>
      <svg className={`${styles.deco} ${styles.decoSpark} ${styles.decoSpark1}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#spark" />
      </svg>
      <svg className={`${styles.deco} ${styles.decoSpark} ${styles.decoSpark2}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#spark" />
      </svg>
      <svg className={`${styles.deco} ${styles.decoStar} ${styles.decoStar1}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#star6" />
      </svg>
      <svg className={`${styles.deco} ${styles.decoStar} ${styles.decoStar2}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#star6" />
      </svg>

      {/* Flip clock */}
      <div
        ref={clockRef}
        className={styles.flipClock}
        aria-label={`Geri sayım: ${String(days).padStart(2, '0')} gün`}
      >
        <div className={styles.flipClockCards}>
          <div className={`${styles.flipClockCol} ${styles.flipClockColLeft}`}>
            <span className={styles.flipClockString} aria-hidden="true" />
            <span className={styles.flipClockPin} aria-hidden="true" />
            <span className={`${styles.flipClockCard} ${styles.flipClockCardTop}`} />
            <span className={`${styles.flipClockCard} ${styles.flipClockCardBottom}`} />
          </div>
          <div className={`${styles.flipClockCol} ${styles.flipClockColRight}`}>
            <span className={styles.flipClockString} aria-hidden="true" />
            <span className={styles.flipClockPin} aria-hidden="true" />
            <span className={`${styles.flipClockCard} ${styles.flipClockCardTop}`} />
            <span className={`${styles.flipClockCard} ${styles.flipClockCardBottom}`} />
          </div>
        </div>
        <div className={styles.flipClockDigits} id="countdown-value">
          {String(days).padStart(2, '0')}
        </div>
      </div>

      <h2 className={styles.countdownHeading}>GERİ SAYIM BAŞLADI!</h2>
      <p className={styles.countdownText}>
        UNUTAMAYACAĞIN
        <br />
        BİR DENEYİM
        <br />
        ÇOK YAKINDA SENİNLE.
      </p>
    </section>
  );
}

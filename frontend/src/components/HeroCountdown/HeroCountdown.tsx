'use client';

import { useEffect, useState } from 'react';
import { COUNTDOWN_TARGET } from '@/lib/constants';
import styles from './HeroCountdown.module.css';

function calcDays(): number {
  return Math.max(0, Math.ceil((COUNTDOWN_TARGET.getTime() - Date.now()) / 86_400_000));
}

export default function HeroCountdown() {
  const [days, setDays] = useState(0);
  const [displayDays, setDisplayDays] = useState(0);

  // Gerçek gün hesabı
  useEffect(() => {
    setDays(calcDays());
    const id = setInterval(() => setDays(calcDays()), 60_000);
    return () => clearInterval(id);
  }, []);

  // 1'den days'e sayma animasyonu
  useEffect(() => {
    if (days === 0) return;
    setDisplayDays(1);
    let current = 1;
    const steps = days - 1;
    if (steps <= 0) { setDisplayDays(days); return; }
    const stepMs = Math.max(40, Math.round(1200 / steps));
    const id = setInterval(() => {
      current += 1;
      setDisplayDays(current);
      if (current >= days) clearInterval(id);
    }, stepMs);
    return () => clearInterval(id);
  }, [days]);

  return (
    <section className={styles.root}>

      {/* ── SOL: Hero metni ── */}
      <div className={styles.heroSide}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.line}>BURADA PLAN YOK</span>
            <span className={styles.line}>SADECE TEK BİR SORU VAR:</span>
            <span className={`${styles.line} ${styles.lineSerif}`}>
              ŞİMDİ DEĞİLSE NE ZAMAN?
            </span>
          </h1>
          <p className={styles.subtitle}>
            NOUWEN&apos;İ KEŞFETMEYE
            <br />
            HAZIR MISIN?
          </p>
        </div>
      </div>

      {/* ── Dikey ayırıcı ── */}
      <span className={styles.divider} aria-hidden="true" />

      {/* ── SAĞ: Countdown ── */}
      <div className={styles.cdSide}>
        {/* Dekorasyonlar */}
        <svg className={`${styles.deco} ${styles.decoSpark1}`} viewBox="0 0 100 100" aria-hidden="true">
          <use href="#spark" />
        </svg>
        <svg className={`${styles.deco} ${styles.decoSpark2}`} viewBox="0 0 100 100" aria-hidden="true">
          <use href="#spark" />
        </svg>
        <svg className={`${styles.deco} ${styles.decoStar1}`} viewBox="0 0 100 100" aria-hidden="true">
          <use href="#star6" />
        </svg>
        <svg className={`${styles.deco} ${styles.decoStar2}`} viewBox="0 0 100 100" aria-hidden="true">
          <use href="#star6" />
        </svg>
        <svg className={`${styles.deco} ${styles.decoBurst}`} viewBox="0 0 100 100" aria-hidden="true">
          <use href="#burst" />
        </svg>

        <div className={styles.cdContent}>
          <p className={styles.eyebrow}>GERİ SAYIM BAŞLADI</p>

          <div
            className={styles.numberBlock}
            aria-label={`${days} gün kaldı`}
          >
            <span className={styles.number} aria-live="polite">
              {displayDays}
            </span>
            <span className={styles.unit}>GÜN KALDI</span>
          </div>

          <p className={styles.date}>1 TEMMUZ&apos;A KADAR</p>
        </div>
      </div>

    </section>
  );
}

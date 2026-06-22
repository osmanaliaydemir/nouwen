'use client';

import { useEffect, useState } from 'react';
import { COUNTDOWN_TARGET } from '@/lib/constants';
import styles from './CountdownAlt.module.css';

function calcDays(): number {
  return Math.max(0, Math.ceil((COUNTDOWN_TARGET.getTime() - Date.now()) / 86_400_000));
}

export default function CountdownAlt() {
  const [days, setDays] = useState(0);
  const [displayDays, setDisplayDays] = useState(0);

  // Gerçek geri sayım değerini hesapla, dakikada bir güncelle
  useEffect(() => {
    setDays(calcDays());
    const id = setInterval(() => setDays(calcDays()), 60_000);
    return () => clearInterval(id);
  }, []);

  // 1'den days'e kadar sayıcı animasyonu
  useEffect(() => {
    if (days === 0) return;

    setDisplayDays(1);
    let current = 1;

    // Toplam süre ~1.2s, adım sayısı = days - 1
    // Her adım biraz kısalarak easeOut hissi verir
    const totalMs = 1200;
    const steps = days - 1;
    if (steps <= 0) { setDisplayDays(days); return; }

    const stepMs = Math.max(40, Math.round(totalMs / steps));

    const id = setInterval(() => {
      current += 1;
      setDisplayDays(current);
      if (current >= days) clearInterval(id);
    }, stepMs);

    return () => clearInterval(id);
  }, [days]);

  return (
    <section className={styles.root} id="countdown-alt">
      {/* Dekorasyonlar */}
      <svg className={`${styles.deco} ${styles.decoL}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#burst" />
      </svg>
      <svg className={`${styles.deco} ${styles.decoR}`} viewBox="0 0 100 100" aria-hidden="true">
        <use href="#burst" />
      </svg>
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

      {/* Üst etiket */}
      <p className={styles.eyebrow}>GERİ SAYIM BAŞLADI!</p>

      {/* Çizgi + sayı + çizgi */}
      <div className={styles.stage}>
        <span className={styles.rule} aria-hidden="true" />

        <div className={styles.numberBlock} aria-label={`${days} gün kaldı`}>
          <span className={styles.number} aria-live="polite">{displayDays}</span>
          <span className={styles.unit}>GÜN KALDI</span>
        </div>

        <span className={styles.rule} aria-hidden="true" />
      </div>

      {/* Alt metin */}
      <div className={styles.footer}>
        <p className={styles.footerDate}>1 TEMMUZ&apos;A KADAR</p>
        <p className={styles.footerDesc}>
          UNUTAMAYACAĞIN BİR DENEYİM
          <br />
          ÇOK YAKINDA SENİNLE.
        </p>
      </div>
    </section>
  );
}

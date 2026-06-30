'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { SHOWCASE_ITEMS } from '@/lib/constants';
import styles from './Showcase.module.css';

const CENTER = Math.floor(SHOWCASE_ITEMS.length / 2);

export default function Showcase() {
  // order[slotIndex] = itemIndex
  const [order, setOrder] = useState<number[]>(SHOWCASE_ITEMS.map((_, i) => i));
  const [popKey, setPopKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeItem = SHOWCASE_ITEMS[order[CENTER]];

  const rotate = useCallback((dir: 1 | -1) => {
    setOrder((prev) => {
      const next = [...prev];
      if (dir > 0) next.push(next.shift()!);
      else next.unshift(next.pop()!);
      return next;
    });
    setPopKey((k) => k + 1);
  }, []);

  const bringToCenter = useCallback((slot: number) => {
    if (slot === CENTER) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[slot], next[CENTER]] = [next[CENTER], next[slot]];
      return next;
    });
    setPopKey((k) => k + 1);
  }, []);

  // Center the scroll container on mobile so the active item is visible
  useEffect(() => {
    const centerScroll = (behavior: ScrollBehavior = 'smooth') => {
      if (scrollRef.current && window.innerWidth <= 900) {
        const container = scrollRef.current;
        const centerCard = container.children[CENTER] as HTMLElement;
        if (centerCard) {
          centerCard.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
        }
      }
    };
    
    // Sayfa ilk yüklendiğinde düzenin tam oturması için birkaç deneme
    centerScroll('instant');
    const t1 = setTimeout(() => centerScroll('instant'), 100);
    const t2 = setTimeout(() => centerScroll('smooth'), 500);
    
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Re-center when order changes (e.g. clicking arrows)
  useEffect(() => {
    if (scrollRef.current && window.innerWidth <= 900) {
      const container = scrollRef.current;
      const centerCard = container.children[CENTER] as HTMLElement;
      if (centerCard) {
        // Kart boyutları (transition) değişirken ve bittikten sonra tam merkeze hizala
        centerCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        
        const timeout = setTimeout(() => {
          centerCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }, 450); // CSS transition 0.4s sürüyor, bittikten sonra son düzeltme
        
        return () => clearTimeout(timeout);
      }
    }
  }, [order]);

  useEffect(() => {
    const handleHash = (hashVal?: string) => {
      const hash = typeof hashVal === 'string' ? hashVal : window.location.hash.replace('#', '');
      if (!hash) return;

      const itemIndex = SHOWCASE_ITEMS.findIndex(item => item.id === hash);
      if (itemIndex !== -1) {
        setOrder((prev) => {
          const slot = prev.indexOf(itemIndex);
          if (slot !== -1 && slot !== CENTER) {
            const next = [...prev];
            [next[slot], next[CENTER]] = [next[CENTER], next[slot]];
            return next;
          }
          return prev;
        });
        setPopKey((k) => k + 1);
      }
    };

    const onHashChange = () => handleHash();
    const onCustomNav = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        handleHash(customEvent.detail);
      }
    };

    handleHash();
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('nouwen-nav', onCustomNav);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('nouwen-nav', onCustomNav);
    };
  }, []);

  return (
    <section className={styles.features} id="features">
      <h2 className={`${styles.featuresTitle} container`}>
        NOUWEN&apos;DE SENİ  NELER BEKLİYOR?
      </h2>

      <div className={styles.showcase}>
        {SHOWCASE_ITEMS.map((item) => (
          <div key={item.id} id={item.id} style={{ position: 'absolute', top: '-120px', left: 0, right: 0 }} aria-hidden="true" />
        ))}
        {/* red-carpet beam */}
        <span className={styles.showcaseBeam} aria-hidden="true" />

        {/* gallery cards */}
        <div className={styles.showcaseCards} ref={scrollRef}>
          {order.map((itemIdx, slot) => {
            const item = SHOWCASE_ITEMS[itemIdx];
            const isFeature = slot === CENTER;
            const cardClass = [
              styles.card,
              isFeature ? styles.cardFeature : '',
              slot === 1 ? styles.cardB : '',
              slot === 3 ? styles.cardC : '',
              slot === 0 ? styles.cardA : '',
              slot === 4 ? styles.cardD : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <figure
                key={`slot-${slot}`}
                className={cardClass}
                data-eyebrow={item.eyebrow}
                data-name={item.name}
                tabIndex={0}
                role="button"
                aria-label={`${item.name} öne çıkar`}
                onClick={() => bringToCenter(slot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    bringToCenter(slot);
                  }
                }}
              >
                <span
                  className={`${styles.cardImg} ${isFeature && popKey ? styles.isPop : ''}`}
                  key={isFeature ? popKey : undefined}
                  style={{ '--img': `url(${item.img})` } as React.CSSProperties}
                />
              </figure>
            );
          })}
        </div>

        {/* red hill */}
        <svg
          className={styles.showcaseHill}
          viewBox="0 0 1920 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,280 L0,210 C660,210 850,30 960,30 C1070,30 1260,210 1920,210 L1920,280 Z" />
        </svg>

        {/* caption */}
        <div className={styles.showcaseCaption}>
          <p className={styles.showcaseEyebrow}>{activeItem.eyebrow}</p>
          <p className={styles.showcaseName} id="showcase-name">
            {activeItem.name}
          </p>
          <div className={styles.showcaseViewall}>
            <button
              className={`${styles.showcaseArrow} ${styles.showcaseArrowPrev}`}
              type="button"
              aria-label="Önceki"
              onClick={() => rotate(-1)}
            >
              ←
            </button>
            <span className={styles.showcaseViewallLabel}>VIEW ALL</span>
            <button
              className={`${styles.showcaseArrow} ${styles.showcaseArrowNext}`}
              type="button"
              aria-label="Sonraki"
              onClick={() => rotate(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

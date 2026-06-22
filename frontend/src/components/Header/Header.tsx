'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#seulab', label: 'SEULAB', multiLine: false },
  { href: '#photo-booth', label: 'PHOTO BOOTH', multiLine: true },
  { href: '#glam-area', label: 'GLAM AREA', multiLine: true },
  { href: '#karaoke', label: 'KARAOKE', multiLine: false },
  { href: '#yoort', label: 'YOORT', multiLine: false },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => setIsOpen((v) => !v), []);

  const handleNavClick = useCallback(() => setIsOpen(false), []);

  return (
    <header className={styles.siteHeader}>
      <div className={`container ${styles.inner}`}>
        <Link href="#" className={styles.brand}>
          <span className={styles.brandName}>nouwen</span>
          <span className={styles.brandTagline}>If not now, when?</span>
        </Link>

        <nav
          className={`${styles.mainNav} ${isOpen ? styles.isOpen : ''}`}
          aria-label="Ana menü"
          onClick={handleNavClick}
        >
          <ul className={styles.navList}>
            {NAV_LINKS.flatMap((link, i) => {
              const items = [];

              items.push(
                <li key={link.href}>
                  <Link href={link.href}>
                    {link.multiLine
                      ? link.label.split('\n').map((part, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {part}
                        </span>
                      ))
                      : link.label}
                  </Link>
                </li>
              );
              return items;
            })}
          </ul>
        </nav>

        <button
          className={styles.navToggle}
          aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

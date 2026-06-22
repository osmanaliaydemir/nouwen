// SVG sprite defs — inline, no external file needed (Server Component)
export default function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* 4-point sparkle */}
        <symbol id="spark" viewBox="0 0 100 100">
          <path d="M50 0 C54 32 68 46 100 50 C68 54 54 68 50 100 C46 68 32 54 0 50 C32 46 46 32 50 0 Z" />
        </symbol>
        {/* thin needle firework burst (16-point) */}
        <symbol id="burst" viewBox="0 0 100 100">
          <path d="M50.00 2.00 L50.78 46.08 L68.37 5.65 L52.22 46.67 L83.94 16.06 L53.33 47.78 L94.35 31.63 L53.92 49.22 L98.00 50.00 L53.92 50.78 L94.35 68.37 L53.33 52.22 L83.94 83.94 L52.22 53.33 L68.37 94.35 L50.78 53.92 L50.00 98.00 L49.22 53.92 L31.63 94.35 L47.78 53.33 L16.06 83.94 L46.67 52.22 L5.65 68.37 L46.08 50.78 L2.00 50.00 L46.08 49.22 L5.65 31.63 L46.67 47.78 L16.06 16.06 L47.78 46.67 L31.63 5.65 L49.22 46.08 Z" />
        </symbol>
        {/* 6-point star */}
        <symbol id="star6" viewBox="0 0 100 100">
          <path d="M50 2 L59.5 33.55 L91.57 26 L69 50 L91.57 74 L59.5 66.45 L50 98 L40.5 66.45 L8.43 74 L31 50 L8.43 26 L40.5 33.55 Z" />
        </symbol>
      </defs>
    </svg>
  );
}

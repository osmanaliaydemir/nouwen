import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nouwen — If not now, when?',
  description:
    "Seul'den gelen deneyim dünyası. Kore Beauty, Photo Booth, Glam Area, Karaoke ve Yoort. Şimdi değilse ne zaman?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

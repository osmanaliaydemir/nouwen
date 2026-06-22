import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Countdown from '@/components/Countdown/Countdown';
import CountdownAlt from '@/components/Countdown/CountdownAlt';
import About from '@/components/About/About';
import Showcase from '@/components/Showcase/Showcase';
import SvgSprite from '@/components/SvgSprite/SvgSprite';

export default function Home() {
  return (
    <>
      <SvgSprite />
      <Header />
      <main>
        <Hero />
        {/* <Countdown /> */}
        <CountdownAlt />
        <About />
        <Showcase />
      </main>
    </>
  );
}

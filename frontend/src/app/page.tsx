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
        {/* <CountdownAlt /> */}
        <section className={`container sliderSection`}>
          {/* Sol Yıldız */}
          <div className="sliderStar sliderStarLeft">
            <svg style={{
              fill: 'var(--red)',
              width: 'clamp(60px, 12vw, 190px)',
              animation: 'spinCW 40s linear infinite'
            }} viewBox="0 0 100 100" aria-hidden="true">
              <use href="#burst" />
            </svg>
          </div>
          
          {/* Sağ Yıldız */}
          <div className="sliderStar sliderStarRight">
            <svg style={{
              fill: 'var(--red)',
              width: 'clamp(80px, 15vw, 240px)',
              animation: 'spinCCW 55s linear infinite'
            }} viewBox="0 0 100 100" aria-hidden="true">
              <use href="#burst" />
            </svg>
          </div>

          <div className="sliderImageWrapper">
            <img
              src="/images/slider_ana.jpg"
              alt="Ana Slider"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </section>
        <About />
        <Showcase />
      </main>
    </>
  );
}

import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import Ticker          from './components/Ticker';
import Stats           from './components/Stats';       // ← Stats BEFORE video
import VideoSection    from './components/VideoSection';
import About           from './components/About';
import TherapyAreas    from './components/TherapyAreas';
import Services        from './components/Services';
import Process         from './components/Process';
import IndiaAdvantage  from './components/IndiaAdvantage';
import WhyUs           from './components/WhyUs';
import Team            from './components/Team';
import Contact         from './components/Contact';
import Footer          from './components/Footer';

export default function App() {
  return (
    <div style={{ background: 'var(--bz-black)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Stats />          {/* Proof first, cinematic second */}
        <VideoSection />
        <About />
        <TherapyAreas />   {/* 14 therapy areas — shows breadth */}
        <Services />       {/* Full service depth with images + expandable content */}
        <Process />
        <IndiaAdvantage /> {/* Key USP section */}
        <WhyUs />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

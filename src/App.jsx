import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Ticker       from './components/Ticker';
import VideoSection from './components/VideoSection';
import Stats        from './components/Stats';
import About        from './components/About';
import Services     from './components/Services';
import Process      from './components/Process';
import WhyUs        from './components/WhyUs';
import Team         from './components/Team';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

export default function App() {
  return (
    <div style={{ background: 'var(--bz-black)', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <VideoSection />
        <Stats />
        <About />
        <Services />
        <Process />
        <WhyUs />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

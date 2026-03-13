import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SubHero from './sections/SubHero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import Team from './sections/Team';
import DesignConstruct from './sections/DesignConstruct';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { siteConfig } from './config';

function App() {
  return (
    <div className="min-h-screen bg-white" lang={siteConfig.language || undefined}>
      <Navigation />
      <main>
        <Hero />
        <SubHero />
        <Portfolio />
        <Team />
        <About />
        <DesignConstruct />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

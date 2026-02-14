import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import GamesShowcase from '@/components/GamesShowcase';
import RegisterForm from '@/components/RegisterForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CohortStatus from '@/components/ui/CohortStatus';
import Particles from '@/components/Particles';
import Plasma from '@/components/Plasma';

declare global {
  interface Window {
    VANTA: any;
  }
}


const Index = () => {
  const [showPlasma, setShowPlasma] = useState(true);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlasma(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load Three.js
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    threeScript.async = true;
    document.body.appendChild(threeScript);

    threeScript.onload = () => {
      // Load Vanta Birds
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
      vantaScript.async = true;
      document.body.appendChild(vantaScript);

      vantaScript.onload = () => {
        if (vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: '#ffffff', 
            color1: 0x5227FF,
            color2: 0xFF9FFC, 
            quantity: 3.00 
          });
        }
      };
    };

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Vanta Birds background */}
      <div ref={vantaRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Plasma background layer with smooth fade out */}
      <div 
        className={`fixed inset-0 z-[1] pointer-events-none overflow-hidden transition-opacity duration-[2000ms] ease-out ${
          showPlasma ? 'opacity-100' : 'opacity-0'
        }`}
      >
        
      </div>

      ==

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Benefits />
        <CohortStatus />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

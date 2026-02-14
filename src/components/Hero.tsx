// components/Hero.tsx
import { ArrowRight, Gamepad2, Gift, Rocket, Target, Sparkles } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
      });

      // 🎬 Clean entrance - zoom in
      tl.from('.hero-wrap', {
        opacity: 0,
        scale: 1.2,
        duration: 1.2,
        ease: 'power3.out',
      });

      // 🔥 "Gamification" - TYPEWRITER + SLIDE UP effect (clean)
      const chars1 = gsap.utils.toArray('.hero-line-1 .char') as HTMLElement[];
      tl.from(
        chars1,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: '50% 50%',
          ease: 'back.out(1.2)',
          stagger: {
            each: 0.03,
            from: 'start',
          },
          duration: 0.8,
        },
        '-=0.8'
      );

      // 🌊 "Built for Scale" - Simple slide up with blur
      tl.from(
        '.hero-line-2',
        {
          opacity: 0,
          y: 60,
          filter: 'blur(10px)',
          ease: 'power3.out',
          duration: 1,
        },
        '-=0.4'
      );

      // Remove blur
      tl.to(
        '.hero-line-2',
        {
          filter: 'blur(0px)',
          duration: 0.6,
        },
        '-=0.6'
      );

      // 🎯 Description - Simple fade in
      tl.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');

      // 🌟 CTA - Scale in
      tl.from('.hero-cta', {
        opacity: 0,
        scale: 0.9,
        y: 20,
        ease: 'back.out(1.5)',
        duration: 0.8,
      }, '-=0.6');

      // ✨ Subtle sparkle animation
      gsap.to('.sparkle', {
        y: -30,
        x: 'random(-20, 20)',
        opacity: 0,
        scale: 0,
        duration: 1.2,
        stagger: 0.15,
        repeat: -1,
        ease: 'power2.out',
      });

      // 🎪 Subtle title float (reduced movement)
      gsap.to('.hero-line-1', {
        y: -5,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // 💨 Continuous floating icons - each with unique pattern
      gsap.utils.toArray('.float-icon').forEach((icon: any, index) => {
        // Horizontal floating
        gsap.to(icon, {
          x: 'random(-60, 60)',
          duration: `random(6, 9)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
        });

        // Vertical floating
        gsap.to(icon, {
          y: 'random(-40, 40)',
          duration: `random(5, 8)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });

        // Rotation
        gsap.to(icon, {
          rotation: `random(-20, 20)`,
          duration: `random(7, 10)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.4,
        });

        // Scale breathing
        gsap.to(icon, {
          scale: `random(0.95, 1.05)`,
          duration: `random(4, 7)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      });

    }, containerRef);

    // 🎯 Mouse tracking with boundaries
    let rafId: number | null = null;
    const iconOriginalPositions = new Map<HTMLElement, { x: number; y: number }>();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isScrollingRef.current || rafId) return;

      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        setMousePos({ x: e.clientX, y: e.clientY });

        // Subtle 3D tilt
        gsap.to('.hero-title', {
          rotationY: x * 8,
          rotationX: -y * 8,
          transformPerspective: 1000,
          duration: 0.8,
          ease: 'power2.out',
        });

        // Gentle parallax on description
        gsap.to('.hero-description', {
          x: x * 8,
          y: y * 8,
          duration: 0.8,
          ease: 'power2.out',
        });

        // CTA magnetic effect
        const ctaButton = document.querySelector('.hero-cta a') as HTMLElement;
        if (ctaButton) {
          const rect = ctaButton.getBoundingClientRect();
          const ctaX = rect.left + rect.width / 2;
          const ctaY = rect.top + rect.height / 2;
          const distance = Math.hypot(e.clientX - ctaX, e.clientY - ctaY);
          
          if (distance < 200) {
            const pullX = (e.clientX - ctaX) * 0.15;
            const pullY = (e.clientY - ctaY) * 0.15;
            gsap.to(ctaButton, {
              x: pullX,
              y: pullY,
              scale: 1.05,
              duration: 0.3,
            });
          } else {
            gsap.to(ctaButton, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
            });
          }
        }

        // Icons repel from cursor - WITH BOUNDARIES
        const icons = gsap.utils.toArray('.float-icon') as HTMLElement[];
        const heroSection = document.querySelector('section');
        
        if (heroSection) {
          const sectionRect = heroSection.getBoundingClientRect();
          
          icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            const iconX = rect.left + rect.width / 2;
            const iconY = rect.top + rect.height / 2;
            const distance = Math.hypot(e.clientX - iconX, e.clientY - iconY);
            
            // Store original position if not stored
            if (!iconOriginalPositions.has(icon)) {
              const computedStyle = window.getComputedStyle(icon);
              const transform = new DOMMatrix(computedStyle.transform);
              iconOriginalPositions.set(icon, {
                x: transform.m41,
                y: transform.m42,
              });
            }

            const original = iconOriginalPositions.get(icon)!;
            
            if (distance < 250) { // Reduced detection radius
              const angle = Math.atan2(iconY - e.clientY, iconX - e.clientX);
              const force = Math.min((250 - distance) / 4, 40); // Cap maximum force
              const pushX = Math.cos(angle) * force;
              const pushY = Math.sin(angle) * force;
              
              // Calculate new position
              const newX = original.x + pushX;
              const newY = original.y + pushY;
              
              // Boundary checking - keep icons inside section
              const maxX = 80; // Maximum horizontal displacement
              const maxY = 60; // Maximum vertical displacement
              
              const boundedX = Math.max(-maxX, Math.min(maxX, newX));
              const boundedY = Math.max(-maxY, Math.min(maxY, newY));
              
              gsap.to(icon, {
                x: boundedX,
                y: boundedY,
                rotation: pushX * 0.3,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            } else {
              // Smoothly return to floating animation position
              gsap.to(icon, {
                // Don't reset to 0, let floating animations continue
                duration: 1,
                ease: 'power2.out',
                overwrite: false, // Don't interrupt floating animations
              });
            }
          });
        }

        rafId = null;
      });
    };

    const handleScroll = () => {
      isScrollingRef.current = true;
      gsap.globalTimeline.pause();

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        gsap.globalTimeline.resume();
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Split text for character animation
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="char inline-block" 
        style={{ 
          display: 'inline-block',
          transformStyle: 'preserve-3d',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-[85vh] flex items-center overflow-hidden"
      style={{ 
        willChange: 'transform', 
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Subtle gradient orbs - reduced opacity */}
      <div 
        className="pointer-events-none absolute w-96 h-96 rounded-full bg-gradient-radial from-gami-violet/15 to-transparent blur-3xl transition-all duration-700 ease-out z-[1]"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />
      <div 
        className="pointer-events-none absolute w-64 h-64 rounded-full bg-gradient-radial from-gami-coral/10 to-transparent blur-2xl transition-all duration-1000 ease-out z-[1]"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          transitionDelay: '100ms',
        }}
      />

      {/* FloatingParticles */}
      <div className="absolute inset-0 z-[1]">
        {/* <FloatingParticles /> */}
      </div>

      {/* Decorative icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block z-[2]">
        <Gamepad2
          className="float-icon absolute w-16 h-16 md:w-32 md:h-32 text-gami-primary/10"
          style={{ 
            transformStyle: 'preserve-3d', 
            willChange: 'transform',
            left: '25%',
            top: '10%',
          }}
        />
        <Rocket
          className="float-icon absolute w-40 h-40 text-gami-purple/10"
          style={{ 
            transformStyle: 'preserve-3d', 
            willChange: 'transform',
            right: '12%',
            bottom: '20%',
          }}
        />
        <Target
          className="float-icon absolute w-20 h-20 md:w-40 md:h-40 text-gami-purple/10"
          style={{ 
            transformStyle: 'preserve-3d', 
            willChange: 'transform',
            right: '8%',
            top: '15%',
          }}
        />
        <Gift
          className="float-icon absolute w-40 h-40 text-gami-purple/10"
          style={{ 
            transformStyle: 'preserve-3d', 
            willChange: 'transform',
            left: '5%',
            bottom: '5%',
          }}
        />
      </div>

      {/* Content */}
      <div ref={containerRef} className="container mx-auto px-6 md:px-8 lg:px-12 pt-24 pb-12 relative z-10 hero-wrap">
        <div className="flex justify-center w-full">
          <div className="max-w-4xl text-center space-y-6 md:space-y-8">
            <h1 
              ref={titleRef}
              className="hero-title font-display text-3xl md:text-5xl lg:text-7xl font-bold leading-tight"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="hero-line hero-line-1 block">
                {splitText('Gamification')}
              </span>
              <span 
                className="hero-line hero-line-2 block text-gradient-animated relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                Built for Scale
              </span>
            </h1>

            {/* Description */}
            <div className="hero-description text-base md:text-lg lg:text-xl text-muted-foreground mx-auto max-w-2xl">
              <p>
                Gami5 is a Gamification-as-a-Service platform for agencies and solution partners to run repeatable, brand safe engagement campaigns without building technology
              </p>
            </div>

            <div className="hero-cta flex flex-wrap justify-center gap-3 md:gap-4 relative">
              {/* Sparkles */}
              {[...Array(8)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="sparkle absolute w-4 h-4 text-gami-purple"
                  style={{
                    left: '50%',
                    top: '50%',
                    rotate: `${i * 45}deg`,
                  }}
                />
              ))}

              <a 
                href="#register" 
                className="btn-primary flex items-center gap-2 px-6 py-3 text-sm md:text-base group relative overflow-hidden z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="relative z-10">Request Early Access</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                
                {/* Simple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gami-violet via-gami-purple to-gami-coral bg-[length:200%_100%] animate-gradient-x" />
              </a>
            </div>

            <p className="text-sm md:text-base text-muted-foreground animate-pulse">
              Launching soon • Onboarding early partners.
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;

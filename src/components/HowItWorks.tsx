// components/HowItWorks.tsx
'use client';

import { Megaphone, Layers, ShoppingBag } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    icon: Megaphone,
    title: 'Digital & Marketing agencies',
    highlights: ['Quick approval', 'Dedicated portal'],
  },
  {
    icon: Layers,
    title: 'Loyalty & CRM solution providers',
    highlights: ['White-label ready', 'Easy setup'],
  },
  {
    icon: ShoppingBag,
    title: 'Mall & Retail engagement teams',
    highlights: ['Real-time analytics', 'Recurring revenue'],
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D FLIP REVEAL animation for cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Card flip in from flat state
        gsap.fromTo(
          card,
          {
            rotationX: -90,
            y: 50,
            opacity: 0,
            transformOrigin: '50% 100%',
          },
          {
            rotationX: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.2,
          }
        );

        // Icon scale and spin
        const icon = card.querySelector('.card-icon');
        if (icon) {
          gsap.fromTo(
            icon,
            {
              scale: 0,
              rotation: 360,
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
              },
              delay: 0.4 + index * 0.2,
            }
          );
        }

        // Text reveal with slide up
        const title = card.querySelector('.card-title');
        if (title) {
          gsap.fromTo(
            title,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
              },
              delay: 0.6 + index * 0.2,
            }
          );
        }

        // Highlights fade in
        const highlights = card.querySelectorAll('.highlight-item');
        highlights.forEach((highlight, idx) => {
          gsap.fromTo(
            highlight,
            {
              x: -20,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
              },
              delay: 0.8 + index * 0.2 + idx * 0.1,
            }
          );
        });

        // Continuous subtle tilt animation
        gsap.to(card, {
          rotationY: 2,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2 + index * 0.5,
        });

        // Breathing scale
        gsap.to(card, {
          scale: 1.02,
          duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2.5 + index * 0.3,
        });
      });

      // Connecting line with wave effect
      const line = document.querySelector('.connecting-line');
      if (line) {
        gsap.fromTo(
          line,
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            opacity: 0.3,
            duration: 1.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Shimmer effect along the line
        gsap.to(line, {
          backgroundPosition: '200% center',
          duration: 3,
          ease: 'linear',
          repeat: -1,
          delay: 1.8,
        });
      }

      // Header with character split animation
      const header = document.querySelector('.section-header h2');
      if (header) {
        const chars = header.textContent?.split('') || [];
        const spans = chars.map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          return span;
        });
        
        header.textContent = '';
        spans.forEach(span => header.appendChild(span));

        gsap.fromTo(
          spans,
          {
            y: -30,
            opacity: 0,
            rotationX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
            stagger: 0.03,
            scrollTrigger: {
              trigger: header,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Footer text with wave effect
      const footer = document.querySelector('.section-footer p');
      if (footer) {
        const words = footer.textContent?.split(' ') || [];
        const spans = words.map((word) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.marginRight = '0.25em';
          return span;
        });
        
        footer.textContent = '';
        spans.forEach(span => footer.appendChild(span));

        gsap.fromTo(
          spans,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: footer,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden scroll-mt-24"
    >
      {/* Base */}
      <div className="absolute inset-0 z-[1]" />

      {/* Grid */}
      <div className="absolute inset-0 pattern-grid opacity-50 mix-blend-soft-light z-[1] animate-pulse-slow" />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent z-[1]" />

      {/* Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gami-violet/8 via-gami-purple/4 to-transparent rounded-full blur-3xl z-[1] animate-float" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-gami-coral/8 to-transparent rounded-full blur-3xl z-[1] animate-float-delayed" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="section-header text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-foreground">Who It's </span>
            <span className="text-gradient-primary">For</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line with shimmer */}
          <div 
            className="connecting-line hidden lg:block absolute top-24 left-[10%] right-[10%] h-1 rounded-full origin-left"
            style={{
              background: 'linear-gradient(90deg, var(--gami-violet), var(--gami-purple), var(--gami-coral))',
              backgroundSize: '200% 100%',
            }}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="relative group h-full"
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1200px',
                }}
              >
                <div className="relative h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl md:rounded-3xl blur-xl" />
                  
                  <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 h-full game-card relative overflow-hidden transition-all duration-500 ease-out backdrop-blur-md bg-background/60 hover:translate-y-[-4px] hover:shadow-2xl">
                    {/* Animated border gradient */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="
                          absolute inset-0 rounded-2xl md:rounded-3xl
                          bg-gradient-to-br from-white/40 via-transparent to-white/40
                          [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                          [mask-composite:exclude]
                          p-[1px]
                          animate-border-spin
                        "
                      />
                      <div
                        className="
                          absolute -inset-[1px] rounded-2xl md:rounded-3xl
                          bg-gradient-to-br from-white/20 via-transparent to-white/20
                          blur-md
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                        "
                      />
                    </div>

                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                      {/* Animated icon container */}
                      <div className="card-icon w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <step.icon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>

                      <h3 className="card-title font-display text-base md:text-lg font-semibold text-foreground leading-snug group-hover:text-gradient-primary transition-all duration-300">
                        {step.title}
                      </h3>
                    </div>

                    {/* Animated highlights */}
                    <div className="space-y-2">
                      {step.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="highlight-item text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-primary animate-pulse" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-footer text-center max-w-3xl mx-auto mb-12 md:mb-16 mt-12 md:mt-16">
          <p className="text-base md:text-lg text-muted-foreground">
            If you manage multiple brands and want to turn gamification into a recurring revenue stream – this is for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

'use client';

import { Check, DollarSign, Users, Shield, Headphones, Zap, BarChart3, ArrowRight, TrendingUp, Sparkles, MessagesSquare, Layers, Gamepad2, Package, Palette, Puzzle, Joystick, Target } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const benefits = [
  {
    icon: Layers,
    title: 'One platform Multiple brands',
    description: 'Manage all your clients from a single dashboard. No switching between accounts.',
    highlight: 'Unlimited merchants',
  },
  {
    icon: Gamepad2,
    title: 'Ready to Use Game Templates',
    description: 'Launch proven game templates instantly—no custom development required.',
    highlight: 'Plug & play',
  },
  {
    icon: Palette,
    title: 'Brand Game Kits',
    description: 'Pre-built brand kits ensure visual consistency and faster game creation.',
    highlight: 'Design once',
  },
  {
    icon: Users,
    title: 'Community & Competition',
    description: 'Drive engagement with leaderboards, challenges, and social gameplay.',
    highlight: 'Higher retention',
  },
  {
    icon: TrendingUp,
    title: 'Build to Scale across Markets',
    description:
      'Games keep customers interacting with your brand longer than traditional ads, both in-store and online.',
    highlight: 'Higher engagement',
  },
  {
    icon: Joystick,
    title: 'Live Game Control',
    description: 'Update rules, rewards, and mechanics in real time—no redeployments needed.',
    highlight: 'Always live',
  }
];

const earlyAccessReasons = [
  {
    icon: Check,
    text: 'Validate real-world use cases',
  },
  {
    icon: MessagesSquare,
    text: 'Build with feedback from agencies',
  },
  {
    icon: Shield,
    text: 'Ensure performance, compliance & scale',
  },
];

const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const benefitCardsRef = useRef<HTMLDivElement[]>([]);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header - more subtle
      gsap.fromTo(
        '.benefits-header',
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
            trigger: '.benefits-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Staggered benefit cards animation - reduced movement
      benefitCardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.05,
          }
        );

        // Icon subtle fade in
        const icon = card.querySelector('.benefit-icon');
        if (icon) {
          gsap.fromTo(
            icon,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
              delay: 0.1 + index * 0.05,
            }
          );
        }
      });

      // Middle text animation - subtle
      gsap.fromTo(
        '.benefits-middle-text',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.benefits-middle-text',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Left card - subtle slide from left
      if (leftCardRef.current) {
        gsap.fromTo(
          leftCardRef.current,
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate reasons list items - subtle
        const reasons = leftCardRef.current.querySelectorAll('.reason-item');
        reasons.forEach((reason, index) => {
          gsap.fromTo(
            reason,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: leftCardRef.current,
                start: 'top 75%',
              },
              delay: 0.2 + index * 0.08,
            }
          );
        });
      }

      // Right card - subtle slide from right
      if (rightCardRef.current) {
        gsap.fromTo(
          rightCardRef.current,
          {
            x: 30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate grid items - subtle fade
        const gridItems = rightCardRef.current.querySelectorAll('.grid-item');
        gridItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rightCardRef.current,
                start: 'top 75%',
              },
              delay: 0.3 + index * 0.08,
            }
          );
        });

        // Very subtle floating icons animation
        const floatingIcons = rightCardRef.current.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
          gsap.to(icon, {
            y: -8,
            duration: 4 + index,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: index * 0.5,
          });
        });
      }

      // Footer text animation - subtle
      gsap.fromTo(
        '.benefits-footer',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.benefits-footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="benefits" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-9 relative z-10">
        {/* Section Header */}
        <div className="benefits-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What Makes <span className="text-gradient-primary">Gami5</span> Different
          </h2>
          <p className="text-xl text-muted-foreground">
            Designed for Partners, Not One-Off Campaigns
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              ref={(el) => {
                if (el) benefitCardsRef.current[index] = el;
              }}
              className="glass-card rounded-2xl p-6 game-card hover:translate-y-[-2px] transition-transform duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="benefit-icon w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground leading-tight mb-1">
                    {benefit.title}
                  </h3>

                  <span className="inline-block px-3 py-1 rounded-full bg-gami-purple/10 text-gami-purple text-xs font-medium">
                    {benefit.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="benefits-middle-text text-center max-w-3xl mx-auto mb-16">
          <p className="text-xl text-muted-foreground">
            No custom builds No reinvention every time
          </p>
        </div>

        {/* Early Access Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* LEFT — WHY EARLY ACCESS */}
          <div
            ref={leftCardRef}
            className="relative rounded-2xl shadow-2xl dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
          >
            <div className="relative rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 px-8 py-10 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gami-purple/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              {/* glow */}
              <div className="absolute -top-32 -left-32 w-72 h-72 bg-gami-purple/20 blur-3xl rounded-full" />
              
              {/* floating icons */}
              <Sparkles className="floating-icon absolute top-6 right-6 w-6 h-6 text-cyan-400/50 animate-pulse" />

              <div className="relative z-10 space-y-6">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold">
                  Why We're Starting With{" "}
                  <span className="text-gradient-primary">Early Access</span>
                </h3>

                <p className="text-muted-foreground max-w-md">
                  We're launching with a small group of partners
                </p>

                <div className="space-y-3 pt-2">
                  {earlyAccessReasons.map((item, index) => (
                    <div
                      key={item.text}
                      className="reason-item flex items-center gap-3 rounded-xl bg-gami-purple/10 border border-gami-purple/20 px-5 py-3 text-sm transition-all duration-200 hover:translate-x-1 hover:shadow-md"
                    >
                      <item.icon className="w-4 h-4 text-gami-purple" />
                      {item.text}
                    </div>
                  ))}

                  <div className="pt-4">
                    <p className="text-muted-foreground max-w-md">
                      Early partners will help shape the platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — EARLY PARTNER CTA */}
          <div
            ref={rightCardRef}
            className="relative rounded-2xl shadow-2xl"
          >
            <div className="relative h-full rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 animate-[gradient_6s_ease-in-out_infinite] px-8 py-10 overflow-hidden">
              {/* glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-400/20 blur-3xl animate-pulse dark:bg-purple-500/10" />

              {/* floating icons */}
              <Target className="floating-icon absolute top-6 right-6 w-7 h-7 text-purple-400/40 rotate-12" />
              <Gamepad2 className="floating-icon absolute bottom-6 left-6 w-12 h-12 text-purple-700/40 rotate-12" />

              <div className="relative z-10 space-y-6">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold">
                  Join the Early{" "}
                  <span className="text-gradient-primary">Partner Program</span>
                </h3>

                <p className="text-muted-foreground">
                  We're inviting a limited number of agencies and solution partners to:
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="grid-item rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    <Zap className="w-4 h-4 text-gami-purple mb-1" />
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Early Access to Gami5</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">Launch before competitors</p>
                  </div>

                  <div className="grid-item rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    <TrendingUp className="w-4 h-4 text-gami-purple mb-1" />
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Influence Roadmap and features</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">Shape features you sell</p>
                  </div>

                  <div className="grid-item rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    <Users className="w-4 h-4 text-gami-purple mb-1" />
                    <p className="font-semibold text-slate-900 dark:text-slate-100">Priority Onboarding</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">Faster go-live</p>
                  </div>

                  <div className="grid-item rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                    {/* Empty slot for visual balance */}
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <a href="#register" className="btn-primary flex px-5 py-3 items-center group">
                    Request Early Access
                    <ArrowRight className="w-5 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="benefits-footer text-center text-muted-foreground">
          We'll reach out as the platform becomes ready.
        </p>
      </div>
    </section>
  );
};

export default Benefits;

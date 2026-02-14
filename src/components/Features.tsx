import {
  Users,
  Gamepad2,
  BarChart3,
  Sparkles,
  Gift,
  Shield,
} from "lucide-react";
import { motion ,useMotionValue,animate} from "framer-motion";
import { useState,useLayoutEffect,useRef } from "react";

const features = [
  {
    icon: Users,
    title: "Acquire New Customers",
    description:
      "Games attract users naturally. People engage because they’re fun, not because they feel like ads.",
  },
  {
    icon: Gamepad2,
    title: "Increase Engagement Time",
    description:
      "Interactive games keep users engaged longer than traditional campaigns, online and in-store.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track plays, engagement, conversions, and performance instantly from your dashboard.",
  },
  {
    icon: Sparkles,
    title: "AI Game Creation Studio",
    description:
      "Create game themes, visuals, and campaigns in seconds using AI-powered tools.",
  },
  {
    icon: Gift,
    title: "Boost Retention & Loyalty",
    description:
      "Rewards encourage repeat visits and redemptions, turning players into loyal customers.",
  },
  {
    icon: Shield,
    title: "Smart Reward Management",
    description:
      "Configure coupons, discounts, and prizes with claim tracking and distribution rules.",
  },
];

const Features = () => {
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

useLayoutEffect(() => {
  if (!containerRef.current) return;

  const totalWidth = containerRef.current.scrollWidth / 2;

  if (paused) {
    animationRef.current?.stop();
    return;
  }

  const currentX = x.get();
  const progress = Math.abs(currentX) / totalWidth;
  const remainingDuration = (1 - progress) * 25; // keep speed consistent

  animationRef.current = animate(x, [currentX, -totalWidth], {
    ease: "linear",
    duration: remainingDuration,
    onComplete: () => {
      x.set(0);
      animationRef.current = animate(x, [0, -totalWidth], {
        ease: "linear",
        duration: 25,
        repeat: Infinity,
      });
    },
  });

  return () => animationRef.current?.stop();
}, [paused]);

  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    className="pt-16 pb-32 bg-muted/30 relative overflow-x-hidden overflow-y-visible"

    >
      {/* Background */}
      <div className="absolute inset-0 pattern-dots opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gami-purple/10 border border-gami-purple/20 mb-6">
            <span className="text-sm font-medium text-gami-purple">
              Platform Features
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Win</span>
          </h2>

          <p className="text-xl text-muted-foreground">
            A complete gamification platform designed to help businesses
            engage customers and drive growth.
          </p>
        </div>

        {/* Moving Cards */}
<div className="relative overflow-x-hidden overflow-y-visible pb-6">

  <motion.div
    ref={containerRef}
    className="flex gap-6 w-max py-4"
    style={{ x }}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onTouchStart={() => setPaused(true)}
    onTouchEnd={() => setPaused(false)}
  >
            {[...features, ...features].map((feature, index) => (
<motion.div
  key={`${feature.title}-${index}`}
  whileHover={{ scale: 1.04 }}
  className="
      group
    min-w-[320px] max-w-[320px]
    min-h-[280px]             
    flex flex-col            
    justify-start
    rounded-3xl
    glass-card
    p-8                     
    transition-all duration-300
  "
>
                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="
                      w-10 h-10 rounded-lg
                      bg-muted
                      flex items-center justify-center
                      transition-transform duration-300
                      group-hover:scale-110
                    "
                  >
                    <feature.icon className="w-5 h-5 text-gami-purple" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Features;

import { useEffect, useState } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Zap, 
  Gift, 
  Target, 
  Sparkles, 
  Dice1, 
  Heart,
  Crown,
  Gem,
  Rocket
} from 'lucide-react';

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  size: number;
  icon: number;
  delay: number;
  duration: number;
  opacity: number;
}

const iconComponents = [
  Gamepad2, Trophy, Star, Zap, Gift, Target, Sparkles, Dice1, Heart, Crown, Gem, Rocket
];

const FloatingIcons = () => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const newIcons: FloatingIcon[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 16,
      icon: Math.floor(Math.random() * iconComponents.length),
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8,
      opacity: Math.random() * 0.15 + 0.05,
    }));

    setIcons(newIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item) => {
        const IconComponent = iconComponents[item.icon];
        return (
          <div
            key={item.id}
            className="absolute animate-float-icon"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              opacity: item.opacity,
            }}
          >
            <IconComponent 
              size={item.size} 
              className="text-primary"
              strokeWidth={1.5}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingIcons;
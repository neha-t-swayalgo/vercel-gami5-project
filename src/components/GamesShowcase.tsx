import { useState, useRef } from 'react';
import { Gamepad2, RotateCw, Gift, Zap, Target, Puzzle, Dice5, Trophy } from 'lucide-react';


const games = [
  {
    name: 'Spin & Win',
    category: 'Chance',
    icon: RotateCw,

    players: '45k+',
  },
  {
    name: 'Scratch Card',
    category: 'Chance',
    icon: Gift,

    players: '32k+',
  },
  {
    name: 'Slot Machine',
    category: 'Chance',
    icon: Dice5,

    players: '28k+',
  },
  {
    name: 'Trivia Quiz',
    category: 'Skill',
    icon: Puzzle,
    players: '18k+',
  },
  {
    name: 'Tap Runner',
    category: 'Skill',
    icon: Zap,
    players: '22k+',
  },
  {
    name: 'Target Hit',
    category: 'Skill',
    icon: Target,
    players: '15k+',
  },
];

const GamesShowcase = () => {
  const [activeGame, setActiveGame] = useState(0);
  const previewRef = useRef<HTMLDivElement | null>(null);


  return (
    <section id="games" className="py-14 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gami-purple/5 to-transparent rounded-full" />
      {/* Floating light particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gami-cyan/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-32 right-20 w-56 h-56 bg-gami-purple/10 rounded-full blur-3xl animate-float-slower" />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gami-purple/10 border border-gami-purple/20 mb-6">
            <Gamepad2 className="w-4 h-4 text-gami-purple" />
            <span className="text-sm font-medium text-gami-purple">Game Library</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            20+ Games <span className="text-gradient-primary">Ready to Play</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From classic spin wheels to engaging skill games. All customizable, all mobile-ready.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">

          {games.map((game, index) => (
            <div

              key={game.name}
className={`
  group relative glass-card rounded-2xl p-6 cursor-pointer
  transition-all duration-500 ease-out
  hover:-translate-y-1
  hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
`}

              onClick={() => {
                setActiveGame(index);
                setTimeout(() => {
                  previewRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 50);
              }}
            >
              <div
                className="
        pointer-events-none
        absolute inset-0 rounded-2xl
        bg-gradient-to-br from-white/20 via-transparent to-white/20
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
      "
              />
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <game.icon className="w-7 h-7 text-white" />
              </div>
          <h3 className="font-display text-sm font-semibold text-foreground text-center mb-1">
  {game.name}
</h3>

<div className="text-[11px] uppercase tracking-wide text-muted-foreground text-center">
  {game.category}
</div>

<div className="text-[11px] text-gami-cyan text-center mt-2 font-medium">
  {game.players} plays
</div>
            </div>
          ))}
        </div>

        {/* Active Game Preview */}
        <div

          ref={previewRef}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Game Preview */}
            <div className="relative">
           <div
  className="aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-accent p-8 flex items-center justify-center shadow-2xl"
>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-soft">
                    {(() => {
                      const Icon = games[activeGame].icon;
                      return <Icon className="w-12 h-12 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {games[activeGame].name}
                  </h3>
                  <p className="text-gami-forground/80">Tap to play!</p>
                </div>
              </div>
            <div className="
  absolute -top-4 -right-4
  w-14 h-14 rounded-2xl
  flex items-center justify-center
  border-2 border-gami-primary/50
  bg-transparent
  shadow-lg
  float
">
  <Trophy className="w-6 h-6 text-gami-primary" />
</div>

            </div>

            {/* Game Details */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-gami-cyan/10 text-gami-cyan text-sm font-medium mb-4">
                {games[activeGame].category} Game
              </span>
              <h3 className="font-display text-3xl font-bold mb-4">{games[activeGame].name}</h3>
              <p className="text-muted-foreground mb-6">
                Fully customizable game template with branded visuals, configurable win logic, and real-time analytics. Deploy in minutes to any channel.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Custom branding & themes',
                  'Configurable prize distribution',
                  'Mobile & kiosk optimized',
                  'Instant QR/URL deployment',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gami-cyan flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mb-6">
                <button className="px-4 py-2 rounded-full text-sm bg-muted/60 hover:bg-muted backdrop-blur-md transition">
                  🔗 Share
                </button>
                <span className="text-xs text-muted-foreground">
                  Copy & share game link instantly
                </span>
              </div>

              <a href="#demo" className="btn-primary inline-flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamesShowcase;

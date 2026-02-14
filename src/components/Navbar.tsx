import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
const [isScrolled, setIsScrolled] = useState(false);
const [isVisible, setIsVisible] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 20);

    // Hide navbar when scrolling DOWN
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      setIsVisible(false);
    } 
    // Show navbar when scrolling UP
    else {
      setIsVisible(true);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const navLinks = [
    { name: 'Register', href: '#register' },
    { name: 'Who It\'s For', href: '#how-it-works' },
    { name: 'Benefits', href: '#benefits' },
    // { name: 'Games', href: '#games' },
  ];

  return (
<nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  } ${
isScrolled
  ? 'bg-gami-primarySoft/80 backdrop-blur-2xl border-b border-border/40 shadow-[0_10px_50px_rgba(97,95,255,0.18)]'
  : 'bg-transparent'

  }`}
>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
<div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">

  <span className="text-white font-display font-bold text-lg">G5</span>
</div>

            <span className="font-display font-bold text-2xl text-foreground">
  Gami<span className="text-gami-primary">5</span>
</span>
          </a>

          {/* Desktop Navigation */}
     <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
  {navLinks.map((link) => (
    <a
      key={link.name}
      href={link.href}
      className="text-sm lg:text-base text-muted-foreground hover:text-foreground font-medium transition-all duration-300 relative group hover:-translate-y-[1px]"
    >
      {link.name}
      <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-primary rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
    </a>
  ))}
</div>


          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
{/* <a
  href="#register"
  className="relative overflow-hidden bg-gradient-primary text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl flex items-center gap-2 text-sm lg:text-base shadow-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(97,95,255,0.45)] hover:-translate-y-[1px]"
>
  <Zap className="w-4 h-4" />
  Become a Reseller
</a> */}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl shadow-xl
 border-b border-border/50 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto px-6 py-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-3 text-base text-muted-foreground hover:text-foreground font-medium transition-colors border-b border-border/20 last:border-b-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#register"
            className="btn-primary flex items-center justify-center gap-2 text-base py-3 mt-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Zap className="w-4 h-4" />
            Become a Reseller
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

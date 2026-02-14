import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react';

const Footer = () => {
  return (
<footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Top Section */}
<div className="grid gap-8 md:gap-12 mb-12 items-start md:grid-cols-[2.2fr_1.2fr_1fr]">

  {/* Brand */}
  <div>
    <div className="flex items-center gap-3 md:gap-4 mb-4">
      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
        <span className="text-foreground font-display font-bold text-lg">
          G5
        </span>
      </div>
      <span className="font-display font-bold text-xl md:text-2xl">Gami5</span>
    </div>

    <p className="max-w-md mb-4 md:mb-6 leading-relaxed text-background/70">
      Gami5 is a partner-first gamification platform that helps agencies and
      businesses launch engaging game campaigns that drive customer action
      and measurable growth.
    </p>

    <div className="flex gap-3 md:gap-4">
      <a className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
        <Linkedin className="w-5 h-5" />
      </a>
      <a className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
        <Twitter className="w-5 h-5" />
      </a>
      <a className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  </div>

  {/* Quick Links */}
  <div>
        <h4 className="mb-3 md:mb-4 text-base md:text-lg font-display font-semibold">
      Quick Links
    </h4>
    <ul className="space-y-3">
      {[
        'Features',
        'How It Works',
        'Benefits',
        'Games',
        'Partner Program',
      ].map((link) => (
        <li key={link}>
          <a
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-background/70 hover:text-background transition-colors"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>

  {/* Contact */}
  <div>
        <h4 className="mb-3 md:mb-4 text-base md:text-lg font-display font-semibold">
      Contact
    </h4>
    <ul className="space-y-3">
        <li className="flex items-center gap-3 md:gap-4 text-background/70">
          <Mail className="w-4 md:w-5 h-4 md:h-5" />
          <span>partners@gami5.com</span>
        </li>

              {/* <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>

              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>
                  123 Innovation Way
                  <br />
                  Tech City, TC 12345
                </span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-background/10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm md:text-base text-background/60">
            © {new Date().getFullYear()} Gami5. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm md:text-base text-background/60 hover:text-background transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-sm md:text-base text-background/60 hover:text-background transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

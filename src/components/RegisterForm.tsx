'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, User, Mail, Building2, Phone, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    company: '',
    clients: '',
    services: '',
    message: '',
  });

  const sectionRef = useRef<HTMLElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: 'Who is Gami5 built for?',
      answer: 'Agencies and solution partners managing multiple brand campaigns.',
    },
    {
      question: 'Is this for brands directly?',
      answer: 'Agencies and solution partners managing multiple brand campaigns.',
    },
    {
      question: 'When is the platform launching?',
      answer: 'We\'re rolling out access in phases starting soon',
    },
    {
      question: 'How do I get early access?',
      answer: 'Request early access. We\'ll reach out with next steps.',
    },
  ];

  useEffect(() => {
    if (isSubmitted) return;

    const ctx = gsap.context(() => {
      // Animate FAQ section from left
      if (leftColumnRef.current) {
        gsap.fromTo(
          leftColumnRef.current,
          {
            x: -80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColumnRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate FAQ items
        const faqItems = leftColumnRef.current.querySelectorAll('[data-faq-item]');
        faqItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: leftColumnRef.current,
                start: 'top 75%',
              },
              delay: 0.2 + index * 0.1,
            }
          );
        });
      }

      // Animate form from right
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          {
            x: 80,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate form fields
        const formFields = formRef.current.querySelectorAll('.form-field');
        formFields.forEach((field, index) => {
          gsap.fromTo(
            field,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: formRef.current,
                start: 'top 75%',
              },
              delay: 0.3 + index * 0.08,
            }
          );
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isSubmitted) {
    return (
      <section id="register" className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-3xl p-12 animate-scale-in">
              <div className="w-20 h-20 bg-gami-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-soft">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Thanks for Your Interest!
              </h2>
              <p className="text-muted-foreground text-lg">
                We've received your registration. Our partner team will reach out within 24 hours to discuss the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="register" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gami-cyan/5 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gami-coral/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gami-cyan/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* LEFT: FAQ */}
          <div ref={leftColumnRef} className="space-y-6 md:space-y-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Frequently Asked <span className="text-gradient-primary">Questions</span>
              </h2>

              <p className="text-base md:text-lg text-muted-foreground">
                Everything you need to know about becoming a Gami5 partner
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  data-faq-item
                  className="glass-card rounded-lg md:rounded-xl px-4 md:px-6 border-none"
                >
                  <AccordionTrigger
                    className="
                      text-left text-base md:text-lg font-semibold text-foreground
                      hover:no-underline
                      hover:text-gami-purple
                      data-[state=open]:text-gami-purple
                      transition-colors
                      py-4 md:py-6
                    "
                  >
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-4 md:pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* RIGHT: Form */}
          <div ref={formRef} className="glass-card rounded-xl md:rounded-3xl p-4 md:p-5">
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Become an Early Partner<span className="text-gradient-primary"> and Build with us</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="form-field">
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="form-field grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                      placeholder="Acme Inc"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                      placeholder="e.g. Marketing Director"
                    />
                  </div>
                </div>
              </div>

              <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>
              </div>

              <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Clients Managed
                  </label>
                  <select
                    name="clients"
                    value={formData.clients}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option value="1-5">1–5</option>
                    <option value="6-10">6–10</option>
                    <option value="11-25">11–25</option>
                    <option value="26-50">26–50</option>
                    <option value="51-100">51–100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type of Services Offered
                  </label>
                  <input
                    type="text"
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border border-border bg-background focus:ring-2 focus:ring-gami-purple focus:border-transparent transition-all"
                    placeholder="Marketing, CRM, Loyalty Programs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="form-field btn-primary w-full flex items-center justify-center gap-2 px-4 py-3 text-sm group hover:scale-105 transition-transform"
              >
                <Send className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                Request Early Access
              </button>

              <p className="form-field text-xs text-muted-foreground text-center">
                By registering, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

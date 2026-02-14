import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
 const faqs = [
  {
    question: 'Who is Gami5 built for?',
    answer:
      'Agencies and solution partners managing multiple brand campaigns.',
  },
  {
    question: 'Is this for brands directly?',
    answer:
      'Agencies and solution partners managing multiple brand campaigns.',
  },
  {
    question: 'When is the platform launching?',
    answer:
      'We’re rolling out access in phases starting soon',
  },
  {
    question: 'How do I get early access?',
    answer:
      'Request early access. We’ll reach out with next steps.',
  },
];


  return (
<section id="faq" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gami-purple/10 border border-gami-purple/20 mb-6">
            <span className="text-sm font-medium text-gami-purple">FAQ</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
  Everything you need to know about becoming a Gami5 partner
</p>

        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
            <AccordionTrigger
  className="
    text-left text-lg font-semibold text-foreground
    hover:no-underline
    hover:text-gami-purple
    data-[state=open]:text-gami-purple
    transition-colors
    py-6
  "
>
  {faq.question}
</AccordionTrigger>

            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
  {faq.answer}
</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

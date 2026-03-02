import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much does it cost?",
    answer: "We offer fixed, upfront pricing. No surprises.",
  },
  {
    question: "How long does it take?",
    answer: "Most websites are live within 5 days.",
  },
  {
    question: "Do I need to know anything about tech?",
    answer: "No. We handle the setup from start to finish.",
  },
  {
    question: "What happens after it goes live?",
    answer:
      "We offer ongoing hosting and maintenance from $39.99/month so everything stays running smoothly without you lifting a finger.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-border px-0"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-[15px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

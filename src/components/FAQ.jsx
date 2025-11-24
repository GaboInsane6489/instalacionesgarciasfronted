import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "¿Qué tipo de proyectos realizan?",
    answer:
      "Realizamos instalaciones eléctricas industriales y comerciales, mantenimiento preventivo y correctivo, proyectos institucionales para el sector público y privado, y consultoría técnica especializada.",
  },
  {
    question: "¿Cuentan con certificaciones?",
    answer:
      "Sí, nuestro equipo cuenta con certificaciones vigentes en instalaciones eléctricas, seguridad industrial y normativas nacionales e internacionales. Todos nuestros proyectos cumplen con los estándares de calidad más exigentes.",
  },
  {
    question: "¿Ofrecen garantía en sus trabajos?",
    answer:
      "Absolutamente. Todos nuestros proyectos incluyen garantía de mano de obra y materiales. El período de garantía varía según el tipo de proyecto, pero siempre aseguramos la calidad y durabilidad de nuestro trabajo.",
  },
  {
    question: "¿Cómo puedo solicitar una cotización?",
    answer:
      "Puede contactarnos a través de nuestro formulario de contacto, por teléfono o correo electrónico. Evaluaremos sus necesidades y le proporcionaremos una cotización detallada sin compromiso en un plazo de 24-48 horas.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-secondary border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Respuestas a las consultas más comunes sobre nuestros servicios.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                activeIndex === index
                  ? "bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "bg-primary/50 border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      activeIndex === index
                        ? "bg-blue-500 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                  <span
                    className={`text-lg font-medium transition-colors duration-300 ${
                      activeIndex === index ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  {activeIndex === index ? (
                    <Minus className="text-blue-400" />
                  ) : (
                    <Plus className="text-gray-500" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-[4.5rem] text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

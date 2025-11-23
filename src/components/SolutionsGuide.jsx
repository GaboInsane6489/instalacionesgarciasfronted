import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer,
  Home,
  Building,
  Lightbulb,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

/**
 * Interactive Solutions Guide Component
 * Helps users quickly identify which service they need
 */
const SolutionsGuide = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const solutions = [
    {
      id: "drywall",
      icon: Hammer,
      title: "Drywall",
      subtitle: "Muros y techos modernos",
      image:
        "https://cdn.pixabay.com/photo/2021/03/29/12/16/stairs-6133971_1280.jpg",
      benefits: [
        "Instalación rápida y limpia",
        "Acabados profesionales",
        "Aislamiento térmico y acústico",
      ],
      timeEstimate: "3-7 días",
      description:
        "Transformamos espacios con sistemas de drywall de alta calidad, ideales para divisiones, cielos rasos y remodelaciones modernas.",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "remodeling",
      icon: Home,
      title: "Remodelación",
      subtitle: "Transforma tu hogar u oficina",
      image:
        "https://cdn.pixabay.com/photo/2024/02/16/12/36/business-8577512_1280.jpg",
      benefits: [
        "Diseño personalizado",
        "Materiales de primera calidad",
        "Gestión integral del proyecto",
      ],
      timeEstimate: "2-6 semanas",
      description:
        "Renovamos completamente tus espacios con diseños modernos y funcionales que se adaptan a tu estilo de vida.",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "construction",
      icon: Building,
      title: "Construcción",
      subtitle: "Proyectos desde cero con calidad premium",
      image:
        "https://cdn.pixabay.com/photo/2024/02/16/12/35/business-8577510_1280.jpg",
      benefits: [
        "Planificación detallada",
        "Supervisión constante",
        "Cumplimiento de normativas",
      ],
      timeEstimate: "3-12 meses",
      description:
        "Construimos tus proyectos desde los cimientos con estándares de excelencia y atención al detalle.",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
    },
    {
      id: "consulting",
      icon: Lightbulb,
      title: "Asesorías",
      subtitle: "Expertos que te guían paso a paso",
      image:
        "https://cdn.pixabay.com/photo/2016/11/18/22/44/blueprints-1837238_1280.jpg",
      benefits: [
        "Consultoría especializada",
        "Presupuestos detallados",
        "Soluciones a medida",
      ],
      timeEstimate: "1-3 días",
      description:
        "Te acompañamos en cada etapa de tu proyecto con asesoría técnica profesional y recomendaciones expertas.",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  ];

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Qué necesitas mejorar hoy en tu espacio?
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Descubre la solución perfecta para tu proyecto. Explora nuestras
            opciones y encuentra exactamente lo que necesitas.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isExpanded = expandedCard === solution.id;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                className={`relative group cursor-pointer`}
                onClick={() => handleCardClick(solution.id)}
              >
                <motion.div
                  className={`relative rounded-2xl border ${solution.borderColor} bg-primary/50 backdrop-blur-sm overflow-hidden transition-all duration-300 will-change-transform ${
                    isExpanded
                      ? "shadow-2xl shadow-white/10"
                      : "hover:shadow-xl hover:shadow-white/5"
                  }`}
                  whileHover={{ scale: isExpanded ? 1 : 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  {/* Image background (visible when expanded) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="p-3 bg-white/10 rounded-xl"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {solution.title}
                          </h3>
                          <p className="text-text-muted text-sm">
                            {solution.subtitle}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-6 h-6 text-white/60" />
                      </motion.div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-white/10 mt-4">
                            {/* Description */}
                            <p className="text-gray-300 mb-6 leading-relaxed">
                              {solution.description}
                            </p>

                            {/* Time Estimate */}
                            <div className="flex items-center gap-2 mb-6 text-white/80">
                              <Clock className="w-5 h-5" />
                              <span className="text-sm font-medium">
                                Tiempo estimado:{" "}
                                <span className="text-white">
                                  {solution.timeEstimate}
                                </span>
                              </span>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                                Beneficios principales
                              </h4>
                              <ul className="space-y-2">
                                {solution.benefits.map((benefit, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-3 text-gray-300"
                                  >
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-sm">{benefit}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <motion.a
                                href="/contacto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-6 py-3 bg-white text-black font-bold rounded-full text-center hover:bg-gray-200 transition-colors duration-300"
                              >
                                Solicitar asesoría gratuita
                              </motion.a>
                              <motion.a
                                href="/servicios"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-6 py-3 bg-transparent text-white font-semibold rounded-full text-center border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                              >
                                Ver proyectos similares
                              </motion.a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Collapsed state hint */}
                    {!isExpanded && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-text-muted text-sm mt-4"
                      >
                        Click para ver más detalles →
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-text-muted mb-6">
            ¿No encuentras lo que buscas? Tenemos más soluciones personalizadas
            para ti.
          </p>
          <motion.a
            href="/contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-white/10 text-white font-bold rounded-full border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Hablar con un experto
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsGuide;

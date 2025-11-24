import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import apiClient from "../lib/apiClient";

const HomeCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/proyectos");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  if (projects.length === 0) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-primary z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Nuestros Proyectos
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-light">
            Innovación y excelencia en cada detalle.
          </p>
        </div>

        <div className="relative h-[600px] w-full max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="w-full h-full bg-secondary rounded-[3rem] overflow-hidden relative group shadow-2xl border border-white/5">
                {/* Image */}
                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Preload next image hiddenly */}
                <div className="hidden">
                  <img
                    src={projects[(currentIndex + 1) % projects.length]?.image}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-10 md:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider mb-6 uppercase">
                      {projects[currentIndex].category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      {projects[currentIndex].title}
                    </h3>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl line-clamp-3 mb-8 font-light">
                      {projects[currentIndex].description}
                    </p>

                    <a
                      href="/servicios"
                      className="inline-flex items-center gap-3 text-white font-bold text-lg group/link hover:text-gray-300 transition-colors"
                    >
                      Ver Detalles
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform group-hover/link:rotate-45 transition-transform duration-300">
                        <ArrowRight size={20} />
                      </div>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;

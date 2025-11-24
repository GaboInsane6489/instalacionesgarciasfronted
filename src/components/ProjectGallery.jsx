import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import apiClient from "../lib/apiClient";

const ProjectGallery = ({ projects: initialProjects = [] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    if (initialProjects.length === 0) {
      const fetchProjects = async () => {
        try {
          const response = await apiClient.get("/proyectos");
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, []); // Empty dependency array to run only once on mount

  // Auto-play logic
  useEffect(() => {
    if (projects.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [projects.length, currentIndex]); // Reset timer on slide change

  const nextSlide = () => {
    if (projects.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (projects.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Cargando proyectos...</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null; // Or show a message "No projects found"
  }

  return (
    <section className="relative py-24 overflow-hidden min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2022/07/04/123149-727211195_large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Proyectos Destacados
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Explora nuestra galería de casos de éxito donde la ingeniería y la
            excelencia se encuentran.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Image Slider */}
            <div className="relative h-[400px] lg:h-full overflow-hidden group">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.img
                  key={currentIndex}
                  src={
                    projects[currentIndex].image ||
                    "https://via.placeholder.com/800x600?text=No+Image"
                  } // Fallback image
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={projects[currentIndex].title}
                />
              </AnimatePresence>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden"></div>

              {/* Navigation Buttons (Overlay on image for mobile, hidden on desktop usually but kept for UX) */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Content Panel */}
            <div className="p-8 lg:p-12 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-black bg-white rounded-full uppercase">
                    {projects[currentIndex].category}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {projects[currentIndex].title}
                  </h3>

                  <div className="prose prose-invert">
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed text-justify font-light tracking-wide">
                      {projects[currentIndex].description}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-2">
                      {projects.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? "w-8 bg-white"
                              : "bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-white/40 text-xs font-mono">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;

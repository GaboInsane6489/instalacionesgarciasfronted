import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const projects = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2019/02/25/20/13/site-4020496_1280.jpg",
    title: "Complejo Industrial Norte",
    description:
      "Ejecución integral de instalaciones eléctricas de media tensión para nave industrial de 5,000 m². El proyecto incluyó la instalación de subestación propia, tableros de distribución certificados y sistema de iluminación LED de alta eficiencia. Se cumplieron rigurosamente los plazos de entrega de 4 meses, garantizando la operatividad inmediata del cliente. Implementamos protocolos de seguridad avanzados durante toda la obra, resultando en cero incidentes reportables.",
    category: "Instalación Eléctrica",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2016/04/28/15/50/construction-site-1359136_1280.jpg",
    title: "Torre Corporativa Reforma",
    description:
      "Remodelación estructural y acabados de lujo para oficinas corporativas en planta alta. Se utilizaron sistemas de drywall acústico de última generación para garantizar la privacidad entre salas de juntas. La coordinación logística fue clave para trabajar en horarios nocturnos sin interrumpir las operaciones diurnas del edificio. El resultado final destaca por su diseño moderno, integración de tecnología y acabados premium en cada detalle.",
    category: "Remodelación",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2017/05/15/22/10/tunnel-2316267_1280.jpg",
    title: "Infraestructura Subterránea",
    description:
      "Mantenimiento mayor y modernización de túneles de servicio y canalizaciones eléctricas subterráneas. Este proyecto crítico requirió ingeniería especializada para el reemplazo de cableado de potencia sin cortes prolongados de suministro. Se realizaron pruebas de aislamiento y termografía para certificar la integridad del sistema. La intervención extendió la vida útil de la infraestructura por al menos 20 años más.",
    category: "Mantenimiento",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2014/03/11/23/21/site-285645_1280.jpg",
    title: "Centro Logístico Bajío",
    description:
      "Construcción de obra civil para patio de maniobras y almacén logístico. Se ejecutaron trabajos de nivelación, cimentación reforzada y losas de concreto de alta resistencia para tráfico pesado. El proyecto incluyó también el sistema de drenaje pluvial y alumbrado perimetral autónomo. La supervisión constante aseguró el cumplimiento de las normas de calidad ISO y los requerimientos específicos del sector logístico.",
    category: "Obra Civil",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2021/10/18/17/56/workers-6721726_1280.jpg",
    title: "Planta de Manufactura",
    description:
      "Instalación de líneas de producción y sistemas de fuerza para maquinaria pesada. Nuestro equipo técnico colaboró estrechamente con los ingenieros de planta para realizar las conexiones y pruebas de arranque. Se instalaron sistemas de protección contra sobretensiones y respaldo de energía UPS. La capacitación al personal de mantenimiento del cliente fue parte integral de nuestra entrega.",
    category: "Industrial",
  },
  {
    id: 6,
    image:
      "https://cdn.pixabay.com/photo/2022/06/02/15/52/construction-site-7238371_1280.jpg",
    title: "Desarrollo Residencial Vertical",
    description:
      "Consultoría y ejecución de instalaciones hidrosanitarias y eléctricas para edificio residencial de 15 niveles. Se implementaron sistemas de presión constante y calentamiento solar centralizado. El diseño eficiente permitió reducir el consumo energético proyectado en un 15%. La entrega incluyó planos as-built detallados y manuales de operación para la administración del condominio.",
    category: "Residencial",
  },
];

const ProjectGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
                  src={projects[currentIndex].image}
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

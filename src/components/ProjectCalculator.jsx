import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Clock,
  Hammer,
  Check,
  Send,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const ProjectCalculator = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    area: "",
    serviceType: "drywall",
    finish: "standard",
    painting: false,
  });

  const services = [
    { id: "drywall", name: "Drywall y Tablaroca", rate: 0.12 },
    { id: "remodelacion", name: "Remodelación General", rate: 0.18 },
    { id: "construccion", name: "Construcción Obra Civil", rate: 0.25 },
  ];

  const handleCalculate = () => {
    if (!formData.area || formData.area <= 0) return;

    setLoading(true);

    // Simulate calculation delay for UX
    setTimeout(() => {
      const service = services.find((s) => s.id === formData.serviceType);
      let days = parseFloat(formData.area) * service.rate;

      // Apply modifiers
      if (formData.finish === "premium") days *= 1.3;
      if (formData.painting) days += 1;

      // Round up to nearest 0.5
      days = Math.ceil(days * 2) / 2;
      if (days < 1) days = 1;

      // Material estimation (Simplified logic)
      const materials = calculateMaterials(formData.area, formData.serviceType);

      setResult({
        days,
        materials,
        serviceName: service.name,
      });

      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const calculateMaterials = (area, type) => {
    const m2 = parseFloat(area);
    if (type === "drywall") {
      return [
        { name: "Placas de Yeso", qty: Math.ceil(m2 / 2.88), unit: "pzas" },
        { name: "Postes Metálicos", qty: Math.ceil(m2 * 1.5), unit: "pzas" },
        { name: "Tornillería", qty: Math.ceil(m2 * 30), unit: "pzas" },
        { name: "Compuesto (Masilla)", qty: Math.ceil(m2 * 0.8), unit: "kg" },
      ];
    } else if (type === "remodelacion") {
      return [
        { name: "Recubrimiento", qty: Math.ceil(m2 * 1.1), unit: "m²" },
        { name: "Adhesivo", qty: Math.ceil(m2 * 0.25), unit: "bultos" },
        { name: "Boquilla", qty: Math.ceil(m2 * 0.1), unit: "kg" },
      ];
    } else {
      return [
        { name: "Cemento", qty: Math.ceil(m2 * 0.5), unit: "bultos" },
        { name: "Arena", qty: (m2 * 0.08).toFixed(1), unit: "m³" },
        { name: "Grava", qty: (m2 * 0.09).toFixed(1), unit: "m³" },
      ];
    }
  };

  const getWhatsAppLink = () => {
    const text =
      `Hola, realicé una estimación en su sitio web:\n\n` +
      `📋 Proyecto: ${result.serviceName}\n` +
      `📏 Área: ${formData.area} m²\n` +
      `✨ Acabado: ${formData.finish === "premium" ? "Premium" : "Estándar"}\n` +
      `🎨 Pintura: ${formData.painting ? "Sí" : "No"}\n` +
      `⏱️ Tiempo estimado: ${result.days} días\n\n` +
      `Me gustaría solicitar una visita técnica para confirmar este presupuesto.`;

    return `https://wa.me/525589001234?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="relative py-24 bg-secondary overflow-hidden">
      {/* Video Background for Section */}
      <div className="absolute inset-0 z-0 opacity-20">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2021/03/09/67461-522170649_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-secondary/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text & Info */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/50 border border-white/10 mb-6">
              <Calculator className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-wider uppercase">
                Simulador de Proyectos
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Planifica tu obra con{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                precisión
              </span>
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Utiliza nuestra herramienta inteligente para obtener una
              estimación preliminar de tiempos y materiales necesarios para tu
              próximo proyecto.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="p-3 rounded-lg bg-primary text-white">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    Estimación de Tiempo
                  </h4>
                  <p className="text-sm text-gray-400">
                    Calcula la duración aproximada basada en métricas reales de
                    nuestros proyectos anteriores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="p-3 rounded-lg bg-primary text-white">
                  <Hammer size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    Cálculo de Materiales
                  </h4>
                  <p className="text-sm text-gray-400">
                    Obtén una lista preliminar de los insumos principales
                    requeridos para tu obra.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Calculator */}
          <div className="bg-primary border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="relative z-10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Datos del Proyecto
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Área del proyecto (m²)
                      </label>
                      <input
                        type="number"
                        value={formData.area}
                        onChange={(e) =>
                          setFormData({ ...formData, area: e.target.value })
                        }
                        placeholder="Ej. 50"
                        className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Tipo de Servicio
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
                        }
                        className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Nivel de Acabado
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() =>
                            setFormData({ ...formData, finish: "standard" })
                          }
                          className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            formData.finish === "standard"
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                          }`}
                        >
                          Estándar
                        </button>
                        <button
                          onClick={() =>
                            setFormData({ ...formData, finish: "premium" })
                          }
                          className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                            formData.finish === "premium"
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                          }`}
                        >
                          Premium
                        </button>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-white/5 cursor-pointer"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          painting: !formData.painting,
                        })
                      }
                    >
                      <div
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${formData.painting ? "bg-white border-white" : "border-white/30"}`}
                      >
                        {formData.painting && (
                          <Check size={16} className="text-black" />
                        )}
                      </div>
                      <span className="text-sm text-gray-300">
                        Incluir trabajos de pintura
                      </span>
                    </div>

                    <button
                      onClick={handleCalculate}
                      disabled={!formData.area || loading}
                      className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="animate-spin" size={20} />
                          Calculando...
                        </>
                      ) : (
                        "Calcular Estimación"
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Resultado</h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                    >
                      <RefreshCw size={12} /> Recalcular
                    </button>
                  </div>

                  <div className="bg-secondary/50 rounded-2xl p-6 border border-white/10 mb-6 text-center">
                    <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
                      Tiempo Estimado
                    </p>
                    <div className="text-5xl font-bold text-white mb-2">
                      {result.days}{" "}
                      <span className="text-xl text-gray-400 font-normal">
                        Días
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      *Estimación aproximada sujeta a evaluación técnica.
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Hammer size={16} /> Materiales Sugeridos
                    </h4>
                    <div className="space-y-3">
                      {result.materials.map((mat, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5"
                        >
                          <span className="text-sm text-gray-300">
                            {mat.name}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {mat.qty} {mat.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                    >
                      <Send size={20} />
                      Solicitar Visita Técnica
                    </a>
                    <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                      <AlertCircle size={12} />
                      Se abrirá WhatsApp con los detalles precargados
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCalculator;

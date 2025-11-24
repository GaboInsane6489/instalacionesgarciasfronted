import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Wrench,
  Building2,
  Hammer,
  Paintbrush,
  Lightbulb,
} from "lucide-react";

const iconMap = {
  Zap: Zap,
  Wrench: Wrench,
  Building2: Building2,
  Hammer: Hammer,
  Paintbrush: Paintbrush,
  Lightbulb: Lightbulb,
};

const ServicesGrid = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = iconMap[service.icon] || Zap; // Fallback to Zap if not found

        // Determine direction for animation based on index
        let initialX = 0;
        let initialY = 0;

        if (index % 3 === 0)
          initialX = -50; // Left
        else if (index % 3 === 2)
          initialX = 50; // Right
        else initialY = 50; // Bottom (Center items)

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: initialX, y: initialY }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-full"
          >
            <div className="group relative bg-secondary/30 border border-white/10 rounded-2xl p-8 hover:bg-secondary/50 transition-colors duration-300 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ServicesGrid;

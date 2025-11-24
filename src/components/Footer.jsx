import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 relative overflow-hidden group/footer">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none group-hover/footer:bg-blue-500/10 transition-colors duration-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-lg font-black text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                IG
              </div>
              <span className="text-xl font-bold text-white">
                Instalaciones García's
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Líderes en soluciones electromecánicas y construcción industrial.
              Comprometidos con la excelencia y la seguridad en cada proyecto.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                href="#"
                Icon={Facebook}
                color="#1877F2"
                shadowColor="rgba(24,119,242,0.6)"
              />
              <SocialIcon
                href="#"
                Icon={Instagram}
                color="#E1306C"
                gradient="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
                shadowColor="rgba(220,39,67,0.6)"
              />
              <SocialIcon
                href="#"
                Icon={Linkedin}
                color="#0A66C2"
                shadowColor="rgba(10,102,194,0.6)"
              />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/servicios">Nuestros Servicios</FooterLink>
              <FooterLink href="/proyectos">Portafolio</FooterLink>
              <FooterLink href="/contacto">Contacto</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Servicios
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink href="/servicios">
                Instalaciones Eléctricas
              </FooterLink>
              <FooterLink href="/servicios">
                Mantenimiento Industrial
              </FooterLink>
              <FooterLink href="/servicios">Obra Civil</FooterLink>
              <FooterLink href="/servicios">Consultoría</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Contacto
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <MapPin
                  size={16}
                  className="mt-1 text-white/50 group-hover:text-blue-400 transition-colors"
                />
                <span className="group-hover:text-gray-300 transition-colors">
                  Av. Tecnológico 2405, CDMX
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone
                  size={16}
                  className="text-white/50 group-hover:text-purple-400 transition-colors"
                />
                <span className="group-hover:text-gray-300 transition-colors">
                  +52 (55) 8900-1234
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail
                  size={16}
                  className="text-white/50 group-hover:text-pink-400 transition-colors"
                />
                <span className="group-hover:text-gray-300 transition-colors">
                  contacto@igarcias.com
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500"
        >
          <p>
            &copy; 2025 Instalaciones García's. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors hover:underline"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors hover:underline"
            >
              Términos
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, Icon, color, shadowColor, gradient }) => {
  return (
    <motion.a
      href={href}
      whileHover={{
        y: -5,
        scale: 1.1,
      }}
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
      style={{
        transition:
          "background-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = color;
        e.currentTarget.style.backgroundImage = gradient || "none";
        e.currentTarget.style.boxShadow = `0 0 20px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "";
        e.currentTarget.style.backgroundImage = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <Icon size={18} />
    </motion.a>
  );
};

const FooterLink = ({ href, children }) => {
  return (
    <li>
      <motion.a
        href={href}
        className="inline-block text-gray-400 hover:text-white transition-colors"
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="flex items-center gap-2">
          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100" />
          {children}
        </span>
      </motion.a>
    </li>
  );
};

export default Footer;

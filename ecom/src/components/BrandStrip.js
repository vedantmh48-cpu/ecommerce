/**
 * BrandStrip Component — Vibrant Redesign
 * 
 * Animated horizontal scrolling strip of brand names that appear just above the footer.
 * Each brand name links to its official website.
 * Features auto-scrolling marquee effect with just brand names.
 */

import React from "react";
import { motion } from "framer-motion";

const brands = [
  { name: "Louis Vuitton", url: "https://www.louisvuitton.com" },
  { name: "Adidas", url: "https://www.adidas.com" },
  { name: "Nike", url: "https://www.nike.com" },
  { name: "Zara", url: "https://www.zara.com" },
  { name: "H&M", url: "https://www.hm.com" },
  { name: "Gucci", url: "https://www.gucci.com" },
  { name: "Prada", url: "https://www.prada.com" },
  { name: "Versace", url: "https://www.versace.com" },
  { name: "Chanel", url: "https://www.chanel.com" },
  { name: "Dior", url: "https://www.dior.com" },
  { name: "Balenciaga", url: "https://www.balenciaga.com" },
  { name: "Burberry", url: "https://www.burberry.com" },
  { name: "Fendi", url: "https://www.fendi.com" },
  { name: "Armani", url: "https://www.armani.com" },
  { name: "Calvin Klein", url: "https://www.calvinklein.com" },
  { name: "Tommy Hilfiger", url: "https://www.tommy.com" },
  { name: "Ralph Lauren", url: "https://www.ralphlauren.com" },
  { name: "Levi's", url: "https://www.levi.com" },
];

// Duplicate for seamless scrolling
const duplicatedBrands = [...brands, ...brands, ...brands];

const BrandStrip = () => {
  return (
    <div className="bg-dark border-t border-white/5 py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
        <p className="text-white/30 text-xs uppercase tracking-widest text-center font-medium">
          Featured Brands
        </p>
      </div>
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedBrands.map((brand, idx) => (
            <a
              key={`${brand.name}-${idx}`}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-teal text-sm sm:text-base font-medium whitespace-nowrap transition-colors flex-shrink-0 hover:scale-105 transform transition-all"
            >
              {brand.name}
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandStrip;
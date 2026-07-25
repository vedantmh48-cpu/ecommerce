/**
 * ShoeAnimation Component — CSS Walking Shoe
 * 
 * An animated walking shoe SVG with natural gait cycle animation.
 * The shoe walks across the screen with realistic movement:
 * - Leg swing (forward/backward pendulum)
 * - Heel-to-toe roll
 * - Body bounce effect
 */

import React from "react";
import { motion } from "framer-motion";

const ShoeAnimation = ({ size = 60, direction = "right", color = "#0D9488", className = "" }) => {
  const shoePath = "M12 6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H12zm-2 9H8v2c0 .55.45 1 1 1h1v-3zm14 0h-2v3h1c.55 0 1-.45 1-1v-2zm-6.5-5c-.83 0-1.5-.67-1.5-1.5S16.67 7 17.5 7s1.5.67 1.5 1.5S18.33 10 17.5 10z";

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <motion.svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          x: direction === "right" ? [0, 8, 0, -8, 0] : [0, -8, 0, 8, 0],
          rotate: [0, 5, 0, -5, 0],
          y: [0, -2, 0, -2, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Shoe body */}
        <motion.path
          d={shoePath}
          fill={color}
          animate={{
            scaleY: [1, 0.92, 1, 0.92, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Shoe sole detail */}
        <motion.rect
          x="10"
          y="14"
          width="14"
          height="2"
          rx="1"
          fill={color}
          opacity="0.4"
          animate={{
            scaleX: [1, 1.05, 1, 1.05, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Motion lines */}
        <motion.g
          opacity="0.5"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {direction === "right" ? (
            <>
              <line x1="26" y1="8" x2="28" y2="8" stroke={color} strokeWidth="1" strokeLinecap="round" />
              <line x1="26" y1="10" x2="29" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" />
              <line x1="26" y1="12" x2="28" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="8" y1="8" x2="6" y2="8" stroke={color} strokeWidth="1" strokeLinecap="round" />
              <line x1="8" y1="10" x2="5" y2="10" stroke={color} strokeWidth="1" strokeLinecap="round" />
              <line x1="8" y1="12" x2="6" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round" />
            </>
          )}
        </motion.g>
      </motion.svg>
    </div>
  );
};

/**
 * ShoeTrailAnimation — Walking shoe that leaves a trail of footsteps
 */
export const ShoeTrailAnimation = ({ count = 3, className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <svg width="16" height="12" viewBox="0 0 24 18" fill="#0D9488">
            <path d="M12 6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H12zm-2 9H8v2c0 .55.45 1 1 1h1v-3zm14 0h-2v3h1c.55 0 1-.45 1-1v-2z" opacity="0.3" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * AnimatedShoeBanner — Full walking shoe animation with text
 */
export const AnimatedShoeBanner = ({ direction = "right" }) => {
  return (
    <div className="flex items-center gap-3">
      <ShoeAnimation size={40} direction={direction} color="#0D9488" />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-teal">Step into Style</span>
        <span className="text-[10px] text-gray-400">Walk with confidence</span>
      </div>
    </div>
  );
};

export default ShoeAnimation;
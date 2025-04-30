import { Variants } from 'framer-motion';

// Fade up animation for sections
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Staggered fade in for list items
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    },
  },
};

// Animation for cards
export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};

// Button hover animation
export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Hero background animation
export const heroBackground: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5
    }
  }
};

// Navigation item hover animation
export const navItemHover: Variants = {
  initial: { 
    color: "rgba(255, 255, 255, 0.7)",
  },
  hover: { 
    color: "rgba(255, 255, 255, 1)",
    transition: { duration: 0.2 }
  }
};
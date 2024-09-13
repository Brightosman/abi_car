// variants.ts
import { Variants } from 'framer-motion';

// Fade in animation
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delay,
        ease: 'easeOut',
        duration: 0.6,
      },
    },
  };
};

// Slide in animation
export const slideIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
      y: direction === 'up' ? 200 : direction === 'down' ? -200 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delay,
        ease: 'easeOut',
        duration: 0.6,
      },
    },
  };
};

// Zoom in animation
export const zoomIn = (delay: number = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay,
        ease: 'easeOut',
        duration: 0.6,
      },
    },
  };
};

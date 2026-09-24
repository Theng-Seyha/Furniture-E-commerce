import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport using Intersection Observer.
 * Provides high-performance, non-polling triggers with automatic cleanup and reduced-motion support.
 *
 * @param {Object} options
 * @param {number|number[]} [options.threshold=0.15] - Threshold(s) at which to trigger (0.0 to 1.0)
 * @param {string} [options.rootMargin='0px 0px -50px 0px'] - Viewport margin offset
 * @param {boolean} [options.triggerOnce=true] - Whether to unobserve after first reveal
 * @param {boolean} [options.disabled=false] - Disable observer and make element immediately visible
 * @returns {[import('react').RefObject<HTMLElement | null>, boolean, boolean]} [ref, isIntersecting, hasAnimated]
 */
export const useIntersectionObserver = ({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  disabled = false,
} = {}) => {
  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // If disabled or running in SSR without window, mark immediately as visible
    if (disabled || typeof window === 'undefined') {
      setIsIntersecting(true);
      setHasAnimated(true);
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsIntersecting(true);
      setHasAnimated(true);
      return;
    }

    // Fallback if browser does not support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      setHasAnimated(true);
      return;
    }

    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            setHasAnimated(true);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsIntersecting(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled]);

  return [elementRef, isIntersecting, hasAnimated];
};

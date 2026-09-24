import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/**
 * ScrollReveal Component
 * Wraps content and applies smooth, scroll-triggered fade-in animations
 * driven by the native Intersection Observer API.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {'fade-up'|'fade-down'|'fade-left'|'fade-right'|'fade'|'zoom-in'} [props.animation='fade-up'] - Animation variant
 * @param {number} [props.delay=0] - Delay in milliseconds
 * @param {number} [props.duration=0.7] - Duration in seconds
 * @param {number} [props.threshold=0.12] - Observer trigger threshold
 * @param {string} [props.rootMargin='0px 0px -40px 0px'] - Observer root margin
 * @param {boolean} [props.triggerOnce=true] - Trigger animation once or toggle
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {React.CSSProperties} [props.style={}] - Inline styles
 */
export const ScrollReveal = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.7,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  className = '',
  as: Component = 'div',
  style = {},
  ...rest
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  // Calculate transform styles based on animation variant
  const getTransformStyle = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 32px, 0) scale(0.99)',
        };
      case 'fade-down':
        return {
          opacity: 0,
          transform: 'translate3d(0, -32px, 0) scale(0.99)',
        };
      case 'fade-left':
        return {
          opacity: 0,
          transform: 'translate3d(32px, 0, 0) scale(0.99)',
        };
      case 'fade-right':
        return {
          opacity: 0,
          transform: 'translate3d(-32px, 0, 0) scale(0.99)',
        };
      case 'zoom-in':
        return {
          opacity: 0,
          transform: 'translate3d(0, 16px, 0) scale(0.95)',
        };
      case 'fade':
      default:
        return {
          opacity: 0,
          transform: 'none',
        };
    }
  };

  const animStyle = getTransformStyle();

  return (
    <Component
      ref={ref}
      className={`scroll-reveal-item ${className}`}
      style={{
        ...style,
        ...animStyle,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;

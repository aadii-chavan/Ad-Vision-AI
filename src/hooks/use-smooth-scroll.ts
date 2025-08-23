import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the navbar height to account for fixed positioning
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar?.offsetHeight || 0;
      
      // Calculate the target position with offset
      const targetPosition = element.offsetTop - navbarHeight - 20; // 20px additional padding
      
      // Add a subtle highlight effect to the target section
      element.style.transition = 'all 0.3s ease';
      element.style.transform = 'scale(1.02)';
      element.style.boxShadow = '0 0 30px rgba(var(--primary), 0.1)';
      
      // Remove the highlight effect after animation
      setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.boxShadow = 'none';
      }, 600);
      
      // Smooth scroll to the target position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
};

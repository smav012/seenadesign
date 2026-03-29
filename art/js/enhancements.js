// Modern enhancements for Seena's portfolio - Non-invasive improvements

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Smooth scrolling for anchor links (only if they exist)
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // 2. Add loading state to images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
      
      // Add loading class if image hasn't loaded yet
      if (!img.complete) {
        img.classList.add('img-loading');
        img.addEventListener('load', function() {
          this.classList.remove('img-loading');
        });
        img.addEventListener('error', function() {
          this.classList.remove('img-loading');
          this.alt = 'Image failed to load';
        });
      }
    });
    
    // 3. Improve focus visibility for keyboard users
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
      }
    });
    
    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-user');
    });
    
    // 4. Add subtle hover effects to project items
    const projectItems = document.querySelectorAll('[class*="project"], gallery-item, media-item');
    projectItems.forEach(item => {
      item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
    
    // 5. Print-friendly improvements
    window.addEventListener('beforeprint', function() {
      document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
      document.body.classList.remove('printing');
    });
    
    // 6. Touch device detection for hover adjustments
    function detectTouch() {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
      } else {
        document.body.classList.add('no-touch-device');
      }
    }
    detectTouch();
    
    // 7. Responsive image handling
    function handleResponsiveImages() {
      const viewportWidth = window.innerWidth;
      const images = document.querySelectorAll('img[data-src]');
      
      images.forEach(img => {
        if (viewportWidth < 768) {
          // Use mobile-optimized image if available
          const mobileSrc = img.getAttribute('data-src-mobile');
          if (mobileSrc && !img.src.includes(mobileSrc)) {
            img.src = mobileSrc;
          }
        }
      });
    }
    
    // Initial check and on resize
    handleResponsiveImages();
    window.addEventListener('resize', handleResponsiveImages);
    
    // 8. Improve form accessibility if forms exist
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Add aria-labels if missing
        if (!input.id && !input.getAttribute('aria-label')) {
          const label = form.querySelector(`label[for="${input.name}"]`);
          if (label) {
            input.setAttribute('aria-label', label.textContent);
          }
        }
        
        // Improve focus styles
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
        });
      });
    });
    
    // 9. Console greeting (subtle and professional)
    console.log(
      '%c✨ Seena Mavaddat Portfolio' + 
      '%c\nModern, responsive design portfolio\n',
      'color: #FFF800; font-size: 14px; font-weight: bold;',
      'color: #666; font-size: 11px;'
    );
    
    // 10. Performance monitoring (non-invasive)
    let lastScrollTime = Date.now();
    window.addEventListener('scroll', function() {
      const now = Date.now();
      if (now - lastScrollTime > 100) { // Throttle to 100ms
        // Could add performance logging here if needed
        lastScrollTime = now;
      }
    });
    
  });
  
  // Utility function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Debounce utility for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Make utilities available globally if needed
  window.portfolioUtils = {
    isInViewport,
    debounce
  };
  
})();
// Modern enhancements for Seena's portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
  }

  // Add loading animation for images
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.classList.add('img-loading');
      img.addEventListener('load', function() {
        this.classList.remove('img-loading');
      });
    }
  });

  // Modern hover effects for project cards
  document.querySelectorAll('.project-item, .gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Responsive menu toggle (if you have a mobile menu)
  const menuToggle = document.querySelector('.navbar-toggler');
  const mobileMenu = document.querySelector('.navbar-collapse');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('show');
    });
  }

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    // Tab key navigation focus styling
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });

  // Print styles enhancement
  window.addEventListener('beforeprint', function() {
    document.body.classList.add('print-mode');
  });

  window.addEventListener('afterprint', function() {
    document.body.classList.remove('print-mode');
  });

  // Touch device detection for hover effects
  if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.body.classList.add('touch-device');
  } else {
    document.body.classList.add('no-touch-device');
  }

  // Performance optimization: debounce scroll events
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      // Handle scroll-based animations here
    }, 100);
  });

  // Accessibility: focus management for modals/slideshows
  document.querySelectorAll('[data-toggle="modal"]').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-target');
      const modal = document.querySelector(modalId);
      if (modal) {
        setTimeout(() => {
          const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (focusable) focusable.focus();
        }, 100);
      }
    });
  });

  // Modern console greeting
  console.log('%c👋 Hello from Seena\'s Portfolio!', 'color: #FFF800; font-size: 16px; font-weight: bold;');
  console.log('%cDesigned with care and attention to detail.', 'color: #666; font-size: 12px;');
});

// Utility function for responsive breakpoints
function getCurrentBreakpoint() {
  const width = window.innerWidth;
  if (width >= 1200) return 'xl';
  if (width >= 992) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 576) return 'sm';
  return 'xs';
}

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export utilities for potential future use
window.portfolioUtils = {
  getCurrentBreakpoint,
  debounce,
  throttle
};
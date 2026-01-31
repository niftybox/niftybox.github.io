/**
 * Legal Pages (Terms & Privacy) JavaScript
 * Handles smooth scrolling and section highlighting
 */

(function() {
  'use strict';

  // Smooth scroll for anchor links and internal links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          const headerOffset = 100; // Account for sticky header
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Add reading progress indicator (optional enhancement)
  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'niftybox-reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
      z-index: 1000;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / documentHeight) * 100;

      progressBar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  // Highlight sections as they come into view
  function initSectionHighlight() {
    const sections = document.querySelectorAll('.niftybox-legal-section');

    if ('IntersectionObserver' in window && sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });

      sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`;
        observer.observe(section);
      });
    }
  }

  // Initialize all features when DOM is ready
  function init() {
    initSmoothScroll();
    initReadingProgress();
    initSectionHighlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

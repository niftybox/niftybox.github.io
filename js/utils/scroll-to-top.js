/**
 * Scroll to Top Utility
 * Handles smooth scrolling back to top with visibility control
 */

class ScrollToTop {
  constructor() {
    this.scrollBtn = null;
    this.scrollThreshold = 300; // Show button after scrolling 300px
    this.init();
  }

  init() {
    // Create scroll to top button if it doesn't exist
    this.createScrollButton();

    // Add scroll event listener
    window.addEventListener('scroll', () => this.handleScroll());

    // Add click event listener
    if (this.scrollBtn) {
      this.scrollBtn.addEventListener('click', () => this.scrollToTop());
    }

    // Initial check
    this.handleScroll();
  }

  createScrollButton() {
    // Check if button already exists in HTML
    this.scrollBtn = document.querySelector('.niftybox-scroll-to-top');

    if (!this.scrollBtn) {
      // Create button dynamically if not in HTML
      this.scrollBtn = document.createElement('button');
      this.scrollBtn.className = 'niftybox-scroll-to-top';
      this.scrollBtn.setAttribute('aria-label', 'Scroll to top');
      this.scrollBtn.setAttribute('title', 'Scroll to top');
      this.scrollBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      document.body.appendChild(this.scrollBtn);
    }
  }

  handleScroll() {
    if (!this.scrollBtn) return;

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > this.scrollThreshold) {
      this.scrollBtn.classList.add('visible');
    } else {
      this.scrollBtn.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Initialize scroll to top when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTop();
  });
} else {
  new ScrollToTop();
}

/**
 * Theme Toggle Utility
 * Handles dark/light mode switching with localStorage persistence
 */

class ThemeToggle {
  constructor() {
    this.themeToggleBtn = null;
    this.currentTheme = this.getStoredTheme() || 'dark';
    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);

    // Create theme toggle button if it doesn't exist
    this.createToggleButton();

    // Add event listener
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Update icon
    this.updateIcon();
  }

  createToggleButton() {
    // Check if button already exists in HTML
    this.themeToggleBtn = document.querySelector('.niftybox-theme-toggle');

    if (!this.themeToggleBtn) {
      // Create button dynamically if not in HTML
      this.themeToggleBtn = document.createElement('button');
      this.themeToggleBtn.className = 'niftybox-theme-toggle';
      this.themeToggleBtn.setAttribute('aria-label', 'Toggle theme');
      this.themeToggleBtn.setAttribute('title', 'Toggle dark/light mode');
      document.body.appendChild(this.themeToggleBtn);
    }
  }

  getStoredTheme() {
    try {
      return localStorage.getItem('niftybox-theme');
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem('niftybox-theme', theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.setStoredTheme(theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    this.updateIcon();
  }

  updateIcon() {
    if (!this.themeToggleBtn) return;

    const isDark = this.currentTheme === 'dark';
    const iconHTML = isDark
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>';

    this.themeToggleBtn.innerHTML = iconHTML;
    this.themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    this.themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Initialize theme toggle when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
  });
} else {
  new ThemeToggle();
}

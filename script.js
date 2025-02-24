// Main JavaScript module
const App = {
  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupNavbarScroll();
    this.setupForms();
    this.setupLazyLoading();
    this.setupScrollReveal();
    this.setupBackToTop();
  },

  setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle menu on button click
    menuBtn?.addEventListener('click', () => {
      this.toggleMobileMenu(navLinks);
    });

    // Close menu when clicking on links
    navLinksItems.forEach((link) => {
      link.addEventListener('click', () => {
        this.toggleMobileMenu(navLinks, false);
      });
    });
  },

  toggleMobileMenu(navLinks, force) {
    const isActive =
      force !== undefined ? force : !navLinks.classList.contains('active');
    navLinks.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  },

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },

  setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      navbar.style.background =
        currentScroll > 50 ? 'rgba(26,26,26,0.9)' : 'var(--dark)';
      navbar.style.transform =
        currentScroll > lastScroll ? 'translateY(-100%)' : 'translateY(0)';
      lastScroll = currentScroll;
    });
  },

  setupForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach((input) => {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
          input.parentElement.classList.remove('focused');
        });
      });

      form.addEventListener('submit', this.handleFormSubmit.bind(this));
    });
  },

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    form.classList.add('loading');

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.reset();
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      form.classList.remove('loading');
    }
  },

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  },

  setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((element) => observer.observe(element));
  },

  setupBackToTop() {
    const backToTop = document.createElement('div');
    backToTop.classList.add('back-to-top');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  },
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get element by selector with error handling
 */
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
};

/**
 * Get all elements by selector
 */
const getElements = (selector) => {
  return document.querySelectorAll(selector);
};

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

const navToggle = getElement('.nav-toggle');
const navMenu = getElement('.nav-menu');
const navLinks = getElements('.nav-links a');

if (navToggle && navMenu) {
  // Toggle menu on button click
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('.nav');
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ============================================
// AUTO-UPDATE CURRENT YEAR IN FOOTER
// ============================================

const yearElement = getElement('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }

    const targetElement = getElement(href);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe skill cards and project cards for animation
const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
animateElements.forEach((element, index) => {
  element.style.opacity = '0';
  element.style.animationDelay = `${index * 0.1}s`;
  observer.observe(element);
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHT
// ============================================

const highlightActiveNavLink = () => {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });
};

highlightActiveNavLink();

// Add some basic styles for active nav link
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--color-primary);
  }
`;
document.head.appendChild(style);

// ============================================
// LAZY LOADING IMAGES (OPTIONAL)
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach((img) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
  });
}

// ============================================
// HANDLE CONTACT BUTTON CLICK
// ============================================

const contactButtons = document.querySelectorAll('a[href="mailto:hello@alexmorgan.dev"]');
contactButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // Email links work natively, so we just ensure they open
    console.log('Contact email clicked');
  });
});

// ============================================
// INITIALIZE ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio site loaded successfully');
  
  // Add any initialization code here
  // Currently everything is set up above
});

// ============================================
// OPTIONAL: ADD SCROLL-TO-TOP BUTTON
// ============================================

const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.setAttribute('aria-label', 'Scroll to top');
  
  const styles = `
    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      background-color: var(--color-primary);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    }

    .scroll-to-top:hover {
      background-color: #0052cc;
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 102, 255, 0.4);
    }

    .scroll-to-top.show {
      display: flex;
    }

    @media (max-width: 768px) {
      .scroll-to-top {
        width: 45px;
        height: 45px;
        bottom: 1.5rem;
        right: 1.5rem;
        font-size: 1.25rem;
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
};

createScrollToTopButton();

// ============================================
// FORM VALIDATION (IF NEEDED)
// ============================================

const handleFormSubmission = (form) => {
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    console.log('Form would be submitted');
    
    // Example: you could show a success message
    // alert('Thank you for your message!');
    // form.reset();
  });
};

// Call for any forms if they exist
const contactForm = getElement('form[action*="contact"]');
if (contactForm) {
  handleFormSubmission(contactForm);
}

// ============================================
// PERFORMANCE: PRELOAD CRITICAL RESOURCES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Preload images for faster loading
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
  });
});

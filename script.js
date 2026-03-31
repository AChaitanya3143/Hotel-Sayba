/* ============================================
   HOTEL SAYBA — Website Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2000);
  });

  // Fallback: hide preloader after 4s regardless
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 4000);

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ===== MOBILE NAVIGATION =====
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  function toggleMobileNav() {
    navHamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileNav() {
    navHamburger.classList.remove('active');
    navLinks.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navHamburger.addEventListener('click', toggleMobileNav);
  mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Close mobile nav when clicking nav links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

  function highlightActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const activeLink = navLinks.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  // Trigger on load as well
  revealOnScroll();

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== PARALLAX-LIKE EFFECT ON HERO =====
  const heroBg = document.querySelector('.hero-bg img');

  function handleHeroParallax() {
    if (window.innerWidth > 768) {
      const scrolled = window.scrollY;
      if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1.05 + scrolled * 0.0002}) translateY(${scrolled * 0.15}px)`;
      }
    }
  }

  window.addEventListener('scroll', handleHeroParallax, { passive: true });

  // ===== COUNTER ANIMATION FOR EXPERIENCE BADGE =====
  const counterEl = document.querySelector('.about-experience-badge .number');
  let counterDone = false;

  function animateCounter() {
    if (counterDone || !counterEl) return;

    const rect = counterEl.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      counterDone = true;
      const target = 10;
      let current = 0;
      const duration = 1500;
      const step = target / (duration / 16);

      function updateCounter() {
        current += step;
        if (current >= target) {
          counterEl.textContent = target + '+';
          return;
        }
        counterEl.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      }
      updateCounter();
    }
  }

  window.addEventListener('scroll', animateCounter, { passive: true });

  // ===== DISH CARD HOVER TOUCH SUPPORT =====
  const dishCards = document.querySelectorAll('.dish-card');
  dishCards.forEach(card => {
    card.addEventListener('touchstart', () => {
      dishCards.forEach(c => c.classList.remove('touched'));
      card.classList.add('touched');
    }, { passive: true });
  });

  // ===== GALLERY LIGHTBOX-LIKE EFFECT =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      item.style.transform = 'scale(1.02)';
      setTimeout(() => {
        item.style.transform = '';
      }, 300);
    });
  });

  // ===== REVIEW CARDS AUTO-ROTATE ON MOBILE =====
  const reviewsGrid = document.querySelector('.reviews-grid');
  let currentReview = 0;

  function autoScrollReviews() {
    if (window.innerWidth > 900) return;
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length === 0) return;

    currentReview = (currentReview + 1) % reviewCards.length;
    reviewCards[currentReview].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  // Optional: auto-scroll reviews every 5 seconds on mobile
  // setInterval(autoScrollReviews, 5000);

  // ===== PERFORMANCE: Throttle scroll handlers =====
  let scrollTimeout;
  const throttledScroll = () => {
    if (!scrollTimeout) {
      scrollTimeout = requestAnimationFrame(() => {
        handleNavbarScroll();
        highlightActiveNav();
        revealOnScroll();
        handleBackToTop();
        handleHeroParallax();
        animateCounter();
        scrollTimeout = null;
      });
    }
  };

  // Remove individual listeners and use single throttled one
  window.removeEventListener('scroll', handleNavbarScroll);
  window.removeEventListener('scroll', highlightActiveNav);
  window.removeEventListener('scroll', revealOnScroll);
  window.removeEventListener('scroll', handleBackToTop);
  window.removeEventListener('scroll', handleHeroParallax);
  window.removeEventListener('scroll', animateCounter);
  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Initial calls
  handleNavbarScroll();
  revealOnScroll();
  handleBackToTop();
  animateCounter();

  console.log('🍽️ Hotel Sayba website loaded successfully!');
});

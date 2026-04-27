/* ===== THE APPARELS — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2000);
  });
  // Fallback: hide preloader after 4s even if images haven't loaded
  setTimeout(() => preloader.classList.add('hidden'), 4000);

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
    particle.style.animationDuration = Math.random() * 8 + 6 + 's';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particlesContainer.appendChild(particle);
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ===== MOBILE MENU TOGGLE =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // ===== DARK / LIGHT MODE TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const html = document.documentElement;

  // Check for saved theme
  const savedTheme = localStorage.getItem('apparels-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('apparels-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }

  // ===== PRODUCT FILTERING =====
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== ADD TO CART =====
  let cartCount = 0;
  const cartCountEl = document.getElementById('cartCount');
  const cartToast = document.getElementById('cartToast');
  const toastMessage = document.getElementById('toastMessage');

  document.querySelectorAll('.product-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      cartCount++;
      cartCountEl.textContent = cartCount;

      // Animate cart count
      cartCountEl.style.transform = 'scale(1.4)';
      setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);

      // Show toast
      toastMessage.textContent = `${name} added to cart!`;
      cartToast.classList.add('show');
      setTimeout(() => cartToast.classList.remove('show'), 2500);
    });
  });

  // ===== WISHLIST TOGGLE =====
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.className = 'fas fa-heart';
      } else {
        icon.className = 'far fa-heart';
      }
    });
  });

  // ===== REVIEWS SLIDER =====
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewCards = reviewsTrack.querySelectorAll('.review-card');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');
  const dotsContainer = document.getElementById('reviewsDots');
  let currentReview = 0;
  const totalReviews = reviewCards.length;

  // Create dots
  for (let i = 0; i < totalReviews; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(i));
    dotsContainer.appendChild(dot);
  }

  function goToReview(index) {
    currentReview = index;
    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;
    // Update dots
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentReview);
    });
  }

  nextBtn.addEventListener('click', () => {
    goToReview((currentReview + 1) % totalReviews);
  });

  prevBtn.addEventListener('click', () => {
    goToReview((currentReview - 1 + totalReviews) % totalReviews);
  });

  // Auto-play reviews
  let reviewInterval = setInterval(() => {
    goToReview((currentReview + 1) % totalReviews);
  }, 5000);

  // Pause auto-play on hover
  const reviewsSlider = document.querySelector('.reviews-slider');
  reviewsSlider.addEventListener('mouseenter', () => clearInterval(reviewInterval));
  reviewsSlider.addEventListener('mouseleave', () => {
    reviewInterval = setInterval(() => {
      goToReview((currentReview + 1) % totalReviews);
    }, 5000);
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (email) {
      toastMessage.textContent = 'Welcome to the family! 🎉';
      cartToast.classList.add('show');
      setTimeout(() => cartToast.classList.remove('show'), 3000);
      newsletterForm.reset();
    }
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks.querySelector(`a[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

});

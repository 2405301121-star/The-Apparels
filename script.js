s/* ===== THE APPARELS — Premium JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 2200);
  });
  setTimeout(() => preloader.classList.add('hidden'), 4500);

  // ===== CURSOR GLOW (Desktop only) =====
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  for (let i = 0; i < 35; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = (Math.random() * 8) + 's';
    particlesContainer.appendChild(particle);
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // ===== MOBILE MENU TOGGLE =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  const savedTheme = localStorage.getItem('apparels-theme') || 'dark';
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
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // ===== PRODUCT FILTERING =====
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      productCards.forEach((card, index) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 80);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== CART SYSTEM =====
  let cart = [];
  const cartCountEl = document.getElementById('cartCount');
  const cartToast = document.getElementById('cartToast');
  const toastMessage = document.getElementById('toastMessage');
  const cartBtn = document.getElementById('cartBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');
  const cartSidebarBody = document.getElementById('cartSidebarBody');
  const cartSidebarFooter = document.getElementById('cartSidebarFooter');
  const cartTotal = document.getElementById('cartTotal');
  const cartShopNow = document.getElementById('cartShopNow');

  function openCart() {
    cartOverlay.classList.add('active');
    cartSidebar.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeCart() {
    cartOverlay.classList.remove('active');
    cartSidebar.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  cartShopNow.addEventListener('click', () => {
    closeCart();
  });

  function showToast(message) {
    toastMessage.textContent = message;
    cartToast.classList.add('show');
    setTimeout(() => cartToast.classList.remove('show'), 2500);
  }

  function updateCartUI() {
    cartCountEl.textContent = cart.length;

    // Animate count
    cartCountEl.style.transform = 'scale(1.5)';
    setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);

    if (cart.length === 0) {
      cartSidebarBody.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Your bag is empty</p>
          <a href="#products" class="btn-primary btn-sm" onclick="document.getElementById('cartOverlay').click()">Shop Now</a>
        </div>`;
      cartSidebarFooter.style.display = 'none';
    } else {
      let html = '';
      let total = 0;
      cart.forEach((item, idx) => {
        total += item.price;
        html += `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
            </div>
            <button class="cart-item-remove" data-index="${idx}">
              <i class="fas fa-trash-alt"></i> Remove
            </button>
          </div>`;
      });
      cartSidebarBody.innerHTML = html;
      cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
      cartSidebarFooter.style.display = 'block';

      // Bind remove buttons
      cartSidebarBody.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index);
          const removed = cart.splice(idx, 1)[0];
          showToast(`${removed.name} removed from cart`);
          updateCartUI();
        });
      });
    }
  }

  // Add to Cart buttons
  document.querySelectorAll('.product-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);
      cart.push({ name, price });
      showToast(`${name} added to cart!`);
      updateCartUI();
    });
  });

  // ===== WISHLIST TOGGLE =====
  document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.className = 'fas fa-heart';
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
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

  // Touch/swipe support for reviews
  let touchStartX = 0;
  let touchEndX = 0;
  const reviewsSlider = document.querySelector('.reviews-slider');

  reviewsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  reviewsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToReview((currentReview + 1) % totalReviews);
    } else if (touchEndX - touchStartX > 50) {
      goToReview((currentReview - 1 + totalReviews) % totalReviews);
    }
  }, { passive: true });

  // Auto-play reviews
  let reviewInterval = setInterval(() => {
    goToReview((currentReview + 1) % totalReviews);
  }, 5000);

  reviewsSlider.addEventListener('mouseenter', () => clearInterval(reviewInterval));
  reviewsSlider.addEventListener('mouseleave', () => {
    reviewInterval = setInterval(() => {
      goToReview((currentReview + 1) % totalReviews);
    }, 5000);
  });

  // ===== ANIMATED COUNTER =====
  function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 25);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
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
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
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
      showToast('Welcome to the family! 🎉');
      newsletterForm.reset();
    }
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

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

  // ===== PARALLAX ON HERO IMAGE =====
  const heroBg = document.querySelector('.hero-bg img');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(${1 + window.scrollY * 0.0003}) translateY(${window.scrollY * 0.3}px)`;
    }
  });

  // ===== KEYBOARD ACCESSIBILITY =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

});

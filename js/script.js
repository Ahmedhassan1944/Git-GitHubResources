document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     1. Particles System
     ========================================= */
  const particlesContainer = document.getElementById('particles-bg');
  if (particlesContainer) {
    const colors = ['#00f5ff', '#3b82f6', '#8b5cf6'];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      
      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const delay = Math.random() * 20;
      const duration = Math.random() * 15 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.3 + 0.1;
      const drift = (Math.random() - 0.5) * 100;
      
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${posX}vw`;
      p.style.animationDelay = `${delay}s`;
      p.style.animationDuration = `${duration}s`;
      p.style.backgroundColor = color;
      p.style.setProperty('--p-opacity', opacity);
      p.style.setProperty('--p-drift', `${drift}px`);
      
      particlesContainer.appendChild(p);
    }
  }

  /* =========================================
     2. Typing Effect
     ========================================= */
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const phrases = [
      'Master Version Control.',
      'Track Every Change.',
      'Collaborate Seamlessly.',
      'Branch. Merge. Deploy.',
      'Build with Confidence.'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
  }

  /* =========================================
     3. Scroll Progress Bar & Navbar
     ========================================= */
  const progressBar = document.getElementById('progress-bar');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (progressBar) {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / scrollTotal) * 100;
      progressBar.style.width = `${scrollProgress}%`;
    }
    
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    if (backToTopBtn) {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  /* =========================================
     4. Mobile Menu
     ========================================= */
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  
  if (hamburger && navLinksMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navLinksMenu.classList.toggle('active');
    });
    
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navLinksMenu.classList.remove('active');
      });
    });
  }

  /* =========================================
     5. Scroll Reveal Animation
     ========================================= */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* =========================================
     6. Active Nav Link on Scroll (DISABLED FOR MULTI-PAGE)
     ========================================= */
  // Scroll spy is disabled because pages are now separated

  /* =========================================
     7. Command Search & Filter
     ========================================= */
  const searchInput = document.getElementById('cmd-search');
  if (searchInput) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cmdCards = document.querySelectorAll('.cmd-card');
    const noResults = document.getElementById('no-results');
    
    let currentFilter = 'all';
    let searchQuery = '';
    
    function filterCommands() {
      let visibleCount = 0;
      
      cmdCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const cmdName = card.getAttribute('data-cmd').toLowerCase();
        const desc = card.querySelector('.cmd-desc').textContent.toLowerCase();
        
        const matchesCategory = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = cmdName.includes(searchQuery) || desc.includes(searchQuery);
        
        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      if (noResults) {
        if (visibleCount === 0) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    }
    
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      filterCommands();
    });
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterCommands();
      });
    });
  }

  /* =========================================
     8. Copy to Clipboard
     ========================================= */
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('copy-toast');
  let toastTimer;
  
  if (copyBtns.length > 0) {
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '✓ Copied';
          
          if (toast) {
            toast.classList.add('show');
            
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
              toast.classList.remove('show');
              btn.innerHTML = originalText;
            }, 2000);
          } else {
             setTimeout(() => { btn.innerHTML = originalText; }, 2000);
          }
        });
      });
    });
  }

  /* =========================================
     9. Dark/Light Theme Toggle
     ========================================= */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const htmlEl = document.documentElement;
    
    const savedTheme = localStorage.getItem('git-ref-theme');
    if (savedTheme) {
      htmlEl.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      htmlEl.setAttribute('data-theme', 'light');
      updateThemeIcon('light');
    }
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('git-ref-theme', newTheme);
      updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  /* =========================================
     10. Back to Top Smooth Scroll
     ========================================= */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* =========================================
     Horizontal Nav Scroll
     ========================================= */
  const navContainer = document.getElementById('nav-links-container');
  const scrollLeftBtn = document.getElementById('nav-scroll-left');
  const scrollRightBtn = document.getElementById('nav-scroll-right');

  if (navContainer && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      navContainer.scrollBy({ left: -150, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
      navContainer.scrollBy({ left: 150, behavior: 'smooth' });
    });
  }
});

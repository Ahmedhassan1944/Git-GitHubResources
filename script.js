document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     1. Particles System
     ========================================= */
  const particlesContainer = document.getElementById('particles-bg');
  const colors = ['#00f5ff', '#3b82f6', '#8b5cf6'];
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    
    // Randomize properties
    const size = Math.random() * 4 + 2; // 2px to 6px
    const posX = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 20; // 0s to 20s
    const duration = Math.random() * 15 + 10; // 10s to 25s
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.3 + 0.1; // 0.1 to 0.4
    const drift = (Math.random() - 0.5) * 100; // -50px to 50px
    
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

  /* =========================================
     2. Typing Effect
     ========================================= */
  const typingText = document.getElementById('typing-text');
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
      typeSpeed = 2000; // Pause before delete
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before next type
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing slightly after load
  setTimeout(type, 1000);

  /* =========================================
     3. Scroll Progress Bar & Navbar
     ========================================= */
  const progressBar = document.getElementById('progress-bar');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    // Progress bar
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollTotal) * 100;
    progressBar.style.width = `${scrollProgress}%`;
    
    // Navbar style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  /* =========================================
     4. Mobile Menu
     ========================================= */
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');
  
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinksMenu.classList.toggle('active');
  });
  
  // Close menu when link clicked
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinksMenu.classList.remove('active');
    });
  });

  /* =========================================
     5. Scroll Reveal Animation
     ========================================= */
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after reveal
        // observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================================
     6. Active Nav Link on Scroll
     ========================================= */
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* =========================================
     7. Command Search & Filter
     ========================================= */
  const searchInput = document.getElementById('cmd-search');
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
    
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
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

  /* =========================================
     8. Copy to Clipboard
     ========================================= */
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('copy-toast');
  let toastTimer;
  
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Change button briefly
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Copied';
        
        // Show toast
        toast.classList.add('show');
        
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('show');
          btn.innerHTML = originalText;
        }, 2000);
      });
    });
  });

  /* =========================================
     9. Dark/Light Theme Toggle
     ========================================= */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  // Check local storage or system pref
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

  /* =========================================
     10. Back to Top Smooth Scroll
     ========================================= */
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* =========================================
     11. Interactive Terminal Simulation
     ========================================= */
  const termOutput = document.getElementById('terminal-output');
  const termBtns = document.querySelectorAll('.term-btn');
  const termClear = document.getElementById('term-clear');
  
  let isTyping = false;
  
  const terminalCommands = {
    'git init': {
      lines: [
        { text: '$ git init', color: 'white' },
        { text: 'Initialized empty Git repository in /project/.git/', color: 'green' },
        { text: 'hint: Using \'main\' as the name for the initial branch.', color: 'yellow' },
      ]
    },
    'git add': {
      lines: [
        { text: '$ git add .', color: 'white' },
        { text: '', color: 'white' },
        { text: '✓ Changes staged for commit:', color: 'green' },
        { text: '  modified:   index.html', color: 'cyan' },
        { text: '  new file:   style.css', color: 'cyan' },
        { text: '  modified:   script.js', color: 'cyan' },
      ]
    },
    'git commit': {
      lines: [
        { text: '$ git commit -m "feat: Add awesome feature"', color: 'white' },
        { text: '[main abc1234] feat: Add awesome feature', color: 'green' },
        { text: ' 3 files changed, 47 insertions(+), 2 deletions(-)', color: 'yellow' },
      ]
    },
    'git push': {
      lines: [
        { text: '$ git push origin main', color: 'white' },
        { text: 'Enumerating objects: 5, done.', color: 'cyan' },
        { text: 'Counting objects: 100% (5/5), done.', color: 'cyan' },
        { text: 'Writing objects: 100% (3/3), 712 bytes | 712.00 KiB/s, done.', color: 'cyan' },
        { text: 'To https://github.com/user/repo.git', color: 'yellow' },
        { text: '   a1b2c3d..abc1234  main -> main', color: 'green' },
        { text: '✓ Branch \'main\' pushed to GitHub successfully!', color: 'green' },
      ]
    },
    'git status': {
      lines: [
        { text: '$ git status', color: 'white' },
        { text: 'On branch main', color: 'white' },
        { text: 'Your branch is up to date with \'origin/main\'.', color: 'green' },
        { text: '', color: 'white' },
        { text: 'Changes not staged for commit:', color: 'red' },
        { text: '  (use "git add <file>..." to update what will be committed)', color: 'yellow' },
        { text: '\tmodified:   index.html', color: 'red' },
        { text: '', color: 'white' },
        { text: 'Untracked files:', color: 'red' },
        { text: '\tnew-feature.js', color: 'red' },
      ]
    },
    'git log': {
      lines: [
        { text: '$ git log --oneline', color: 'white' },
        { text: 'abc1234 (HEAD -> main, origin/main) feat: Add awesome feature', color: 'yellow' },
        { text: 'def5678 fix: Resolve merge conflict in style.css', color: 'yellow' },
        { text: 'ghi9012 docs: Update README with setup instructions', color: 'yellow' },
        { text: 'jkl3456 init: Initial project setup', color: 'yellow' },
      ]
    }
  };
  
  function scrollToBottom() {
    termOutput.scrollTop = termOutput.scrollHeight;
  }
  
  function createTermLine(content, colorClass) {
    const div = document.createElement('div');
    div.className = `term-line ${colorClass}`;
    div.innerHTML = content;
    return div;
  }
  
  async function simulateTerminal(cmdData) {
    if (isTyping) return;
    isTyping = true;
    
    // Disable buttons
    termBtns.forEach(b => b.style.opacity = '0.5');
    
    for (let i = 0; i < cmdData.lines.length; i++) {
      const line = cmdData.lines[i];
      const colorClass = `term-${line.color}`;
      
      // If it's a command typed by user, animate typing
      if (line.text.startsWith('$')) {
        const div = createTermLine('$ ', colorClass);
        termOutput.appendChild(div);
        scrollToBottom();
        
        const textToType = line.text.substring(2);
        for (let j = 0; j < textToType.length; j++) {
          div.innerHTML += textToType.charAt(j);
          scrollToBottom();
          await new Promise(r => setTimeout(r, 40)); // Typing speed
        }
      } else {
        // Output line, show instantly
        const div = createTermLine(line.text || '&nbsp;', colorClass);
        termOutput.appendChild(div);
        scrollToBottom();
        await new Promise(r => setTimeout(r, 150)); // Delay between output lines
      }
    }
    
    // Add extra empty line at end
    termOutput.appendChild(createTermLine('&nbsp;', 'term-white'));
    scrollToBottom();
    
    // Re-enable buttons
    termBtns.forEach(b => b.style.opacity = '1');
    isTyping = false;
  }
  
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isTyping) return;
      const cmd = btn.getAttribute('data-cmd');
      const data = terminalCommands[cmd];
      if (data) {
        simulateTerminal(data);
      }
    });
  });
  
  termClear.addEventListener('click', () => {
    if (isTyping) return;
    termOutput.innerHTML = `
      <div class="term-line">
        <span class="term-green">git-practice</span>
        <span class="term-white"> on </span>
        <span class="term-cyan">🌿 main</span>
        <span class="term-white"> ready</span>
      </div>
      <div class="term-line term-muted">Terminal cleared. Click a button below...</div>
      <div class="term-line">&nbsp;</div>
    `;
  });

  /* =========================================
     12. Git Aliases Interactive Demo
     ========================================= */
  const demoForm = document.getElementById('ga-demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', e => {
      e.preventDefault();
      const alias = demoForm.querySelector('input[name="alias"]').value.trim();
      const cmd   = demoForm.querySelector('input[name="command"]').value.trim();

      if (!alias || !cmd) return;

      const output = `git config --global alias.${alias} "${cmd}"`;
      const outEl  = document.getElementById('ga-demo-output');
      outEl.textContent = output;
      outEl.style.color = 'var(--text-main)';
      outEl.style.fontStyle = 'normal';
      
      const copyBtn = outEl.nextElementSibling;
      if (copyBtn && copyBtn.classList.contains('ga-copy')) {
        copyBtn.style.display = 'block';
        copyBtn.setAttribute('data-copy', output);
      }
    });
  }

  /* =========================================
     13. Git Stash Filter & Demo
  ========================================= */
  const stashSection = document.getElementById('git-stash');
  if (stashSection) {
    // Filter
    const stashFilterBtns = stashSection.querySelectorAll('.stash-filter-btn');
    const stashCmdCards = stashSection.querySelectorAll('.stash-cmd-card');
    
    stashFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        stashFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        stashCmdCards.forEach(card => {
          if (filter === 'All' || card.getAttribute('data-category') === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Demo Animation
    const demoDropBtn = stashSection.querySelector('#stash-demo-drop-btn');
    const itemToDrop = stashSection.querySelector('#stash-item-1');
    const itemToRenumber = stashSection.querySelector('#stash-item-2');
    
    if (demoDropBtn && itemToDrop && itemToRenumber) {
      demoDropBtn.addEventListener('click', () => {
        if (demoDropBtn.disabled) return;
        demoDropBtn.disabled = true;
        
        // 1. Fade out stash 1
        itemToDrop.classList.add('fading-out');
        
        setTimeout(() => {
          itemToDrop.style.display = 'none';
          
          // 2. Renumber stash 2 to 1 and highlight
          const idSpan = itemToRenumber.querySelector('.stash-item-id');
          if (idSpan) idSpan.textContent = 'stash@{1}';
          
          itemToRenumber.classList.add('highlight-renumber');
          
          // 3. Reset demo after a few seconds
          setTimeout(() => {
            itemToRenumber.classList.remove('highlight-renumber');
            if (idSpan) idSpan.textContent = 'stash@{2}';
            itemToDrop.style.display = 'flex';
            itemToDrop.classList.remove('fading-out');
            demoDropBtn.disabled = false;
          }, 3000);
          
        }, 500); // Wait for fade out
      });
    }
  }

  /* =========================================
     14. Lifecycle Stash Scenario
  ========================================= */
  const lifecycleSection = document.getElementById('lifecycle');
  if (lifecycleSection) {
    const simBtn = lifecycleSection.querySelector('#lc-stash-sim-btn');
    const wdCard = lifecycleSection.querySelector('.lifecycle-card[data-stage="1"]');
    const stageCard = lifecycleSection.querySelector('.lifecycle-card[data-stage="2"]');
    const repoCard = lifecycleSection.querySelector('.lifecycle-card[data-stage="3"]');
    const stashCard = lifecycleSection.querySelector('.lc-stash-card');
    const stashPill = lifecycleSection.querySelector('#stash-pill-demo');
    
    // Inject dynamic scenario labels/arrows
    if (wdCard) {
      const wdLabel = document.createElement('div');
      wdLabel.className = 'lc-scenario-label lc-label-red';
      wdLabel.id = 'lc-label-wd';
      wdLabel.textContent = '🔴 Unfinished work!';
      wdCard.appendChild(wdLabel);

      const animDown = document.createElement('div');
      animDown.className = 'lc-anim-arrow-down';
      animDown.innerHTML = `<span>git stash</span><div class="lc-anim-line"></div><span>▼</span>`;
      wdCard.appendChild(animDown);

      const animUp = document.createElement('div');
      animUp.className = 'lc-anim-arrow-up';
      animUp.innerHTML = `<span>▲</span><div class="lc-anim-line"></div><span>git stash pop</span>`;
      wdCard.appendChild(animUp);
    }
    
    if (stashCard) {
      const switchLabel = document.createElement('div');
      switchLabel.className = 'lc-scenario-label lc-label-cyan';
      switchLabel.id = 'lc-label-switch';
      switchLabel.textContent = '→ Now you can switch branches safely';
      stashCard.appendChild(switchLabel);
    }

    if (simBtn && wdCard && stashCard) {
      simBtn.addEventListener('click', () => {
        if (simBtn.disabled) return;
        
        // Step 1 (0ms)
        simBtn.disabled = true;
        simBtn.textContent = '▶ Playing scenario...';
        
        wdCard.classList.add('lc-dirty');
        const wdLabel = wdCard.querySelector('#lc-label-wd');
        if (wdLabel) {
          wdLabel.className = 'lc-scenario-label lc-label-red show-label';
          wdLabel.textContent = '🔴 Unfinished work!';
        }
        
        // Step 2 (800ms)
        setTimeout(() => {
          const animDown = wdCard.querySelector('.lc-anim-arrow-down');
          if (animDown) {
            animDown.classList.add('active');
            setTimeout(() => animDown.classList.remove('active'), 1000); // Remove after anim
          }
        }, 800);
        
        // Step 3 (1800ms)
        setTimeout(() => {
          wdCard.classList.remove('lc-dirty');
          wdCard.classList.add('lc-clean');
          if (wdLabel) {
            wdLabel.className = 'lc-scenario-label lc-label-green show-label';
            wdLabel.textContent = '✅ Clean!';
          }
          
          stashCard.classList.add('lc-pulse-card');
          setTimeout(() => stashCard.classList.remove('lc-pulse-card'), 500);
          
          if (stashPill) stashPill.classList.add('lc-pill-glow');
        }, 1800);
        
        // Step 4 (2800ms)
        setTimeout(() => {
          const switchLabel = stashCard.querySelector('#lc-label-switch');
          if (switchLabel) switchLabel.classList.add('show-label');
          
          if (stageCard) {
            stageCard.classList.add('lc-pulse-cyan');
            setTimeout(() => stageCard.classList.remove('lc-pulse-cyan'), 1000);
          }
          if (repoCard) {
            repoCard.classList.add('lc-pulse-cyan');
            setTimeout(() => repoCard.classList.remove('lc-pulse-cyan'), 1000);
          }
        }, 2800);
        
        // Step 5 (4000ms)
        setTimeout(() => {
          const switchLabel = stashCard.querySelector('#lc-label-switch');
          if (switchLabel) switchLabel.classList.remove('show-label');
          
          const animUp = wdCard.querySelector('.lc-anim-arrow-up');
          if (animUp) {
            animUp.classList.add('active');
            setTimeout(() => animUp.classList.remove('active'), 1000);
          }
          
          wdCard.classList.remove('lc-clean');
          if (wdLabel) wdLabel.classList.remove('show-label');
          
          if (stashPill) {
            stashPill.classList.remove('lc-pill-glow');
            stashPill.classList.add('lc-pill-fade');
          }
        }, 4000);
        
        // Step 6 (5200ms)
        setTimeout(() => {
          if (stashPill) stashPill.classList.remove('lc-pill-fade');
          simBtn.textContent = '🔄 Replay scenario';
          simBtn.disabled = false;
        }, 5200);
        
      });
    }
  }

  /* =========================================
     15. Git Stash Cinema Engine
  ========================================= */
  const cinema = document.getElementById('stash-cinema');
  if (cinema) {
    let isPlaying = false;
    
    // Core Elements
    const screenTitle = cinema.querySelector('.sc-screen-title');
    const cmdText = cinema.querySelector('#sc-cmd-text');
    const descText = cinema.querySelector('#sc-desc-text');
    const resetBtn = cinema.querySelector('.sc-reset-btn');
    const flash = cinema.querySelector('#sc-flash');
    const particlesContainer = cinema.querySelector('#sc-particles-container');
    
    // Zones
    const zoneWd = cinema.querySelector('#sc-zone-wd');
    const zoneStage = cinema.querySelector('#sc-zone-stage');
    const zoneStash = cinema.querySelector('#sc-zone-stash');
    
    // Files & Pills
    const filesWd = cinema.querySelector('#sc-files-wd');
    const filesStage = cinema.querySelector('#sc-files-stage');
    const fileApp = cinema.querySelector('#sc-file-app');
    const fileStyle = cinema.querySelector('#sc-file-style');
    const fileUtils = cinema.querySelector('#sc-file-utils');
    const fileNew = cinema.querySelector('#sc-file-new');
    
    const pill1 = cinema.querySelector('#sc-pill-1');
    const pill2 = cinema.querySelector('#sc-pill-2');
    const pillNew = cinema.querySelector('#sc-pill-new');
    
    const listOverlay = cinema.querySelector('#sc-list-overlay');
    const showOverlay = cinema.querySelector('#sc-show-overlay');
    const diffBlock = cinema.querySelector('#sc-diff-block');
    
    // Labels
    const labelWd = cinema.querySelector('#sc-label-wd');
    const labelStage = cinema.querySelector('#sc-label-stage');
    const labelStash = cinema.querySelector('#sc-label-stash');

    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function typeText(el, text, speed = 25) {
      el.textContent = '';
      for (const char of text) {
        el.textContent += char;
        await delay(speed);
      }
    }

    function resetScreen() {
      // Remove states
      [zoneWd, zoneStage, zoneStash].forEach(z => {
        if(z) z.classList.remove('sc-zone-active', 'sc-zone-danger', 'sc-zone-success');
      });
      [fileApp, fileStyle, fileUtils].forEach(f => {
        if(f) f.classList.remove('sc-hidden');
      });
      if(fileNew) fileNew.classList.add('sc-hidden');
      
      if(pill1) {
        pill1.textContent = 'stash@{0}';
        pill1.classList.remove('sc-hidden', 'sc-anim-shake');
      }
      if(pill2) {
        pill2.textContent = 'stash@{1}';
        pill2.classList.remove('sc-hidden', 'sc-anim-shake');
      }
      if(pillNew) pillNew.classList.add('sc-hidden');
      
      [listOverlay, showOverlay, diffBlock].forEach(o => {
        if(o) o.classList.add('sc-hidden');
      });
      [labelWd, labelStage, labelStash].forEach(l => {
        if(l) {
          l.classList.add('sc-hidden');
          l.textContent = '';
          l.className = 'sc-zone-label sc-hidden sc-label-float';
        }
      });
      
      if(particlesContainer) particlesContainer.innerHTML = '';
      if(cmdText) cmdText.textContent = '';
      if(descText) descText.textContent = '';
      if(screenTitle) screenTitle.textContent = 'git-visualizer — scene: idle';
    }

    function launchParticle(fromEl, toEl, color = 'var(--cyan)') {
      if(!fromEl || !toEl || !particlesContainer) return;
      const p = document.createElement('div');
      p.className = 'sc-particle';
      p.style.backgroundColor = color;
      p.style.boxShadow = `0 0 10px ${color}`;
      
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const screenRect = cinema.querySelector('.sc-screen-body').getBoundingClientRect();
      
      const startX = fromRect.left + fromRect.width/2 - screenRect.left;
      const startY = fromRect.top + fromRect.height/2 - screenRect.top;
      
      const dx = (toRect.left + toRect.width/2 - screenRect.left) - startX;
      const dy = (toRect.top + toRect.height/2 - screenRect.top) - startY;
      
      p.style.left = startX + 'px';
      p.style.top = startY + 'px';
      p.style.setProperty('--sc-dx', dx + 'px');
      p.style.setProperty('--sc-dy', dy + 'px');
      
      particlesContainer.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
    
    function showLabel(el, text, type) {
      if(!el) return;
      el.textContent = text;
      el.className = `sc-zone-label sc-label-float ${type}`;
      el.classList.remove('sc-hidden');
    }

    /* === SCENE DEFINITIONS === */
    
    async function playStash() {
      typeText(cmdText, '$ git stash', 30);
      typeText(descText, 'Packs Working Directory + Staging Area into the Stash. Both areas become clean.', 25);
      
      zoneWd.classList.add('sc-zone-active');
      zoneStage.classList.add('sc-zone-active');
      
      await delay(500);
      [fileApp, fileStyle, fileUtils].forEach(f => f.classList.add('sc-anim-pop-out'));
      
      await delay(300);
      launchParticle(zoneWd, zoneStash, 'var(--yellow)');
      await delay(150);
      launchParticle(zoneStage, zoneStash, 'var(--yellow)');
      
      await delay(400);
      [fileApp, fileStyle, fileUtils].forEach(f => f.classList.add('sc-hidden'));
      [fileApp, fileStyle, fileUtils].forEach(f => f.classList.remove('sc-anim-pop-out'));
      
      pillNew.textContent = 'stash@{0}';
      pillNew.classList.remove('sc-hidden');
      pillNew.classList.add('sc-anim-pop-in');
      pill1.textContent = 'stash@{1}';
      pill2.textContent = 'stash@{2}';
      
      await delay(200);
      zoneWd.classList.remove('sc-zone-active');
      zoneStage.classList.remove('sc-zone-active');
      zoneWd.classList.add('sc-zone-success');
      zoneStage.classList.add('sc-zone-success');
      showLabel(labelWd, '✓ Clean', 'lc-label-green');
      showLabel(labelStage, '✓ Clean', 'lc-label-green');
      
      await delay(1000);
      zoneWd.classList.remove('sc-zone-success');
      zoneStage.classList.remove('sc-zone-success');
      pillNew.classList.remove('sc-anim-pop-in');
      [fileApp, fileStyle, fileUtils].forEach(f => {
        f.classList.remove('sc-hidden');
        f.classList.add('sc-anim-pop-in');
      });
    }

    async function playStashNamed() {
      typeText(cmdText, '$ git stash push -m "msg"', 30);
      typeText(descText, 'Creates a named stash. Always use -m for clarity — unnamed stashes are hard to identify later.', 25);
      
      zoneWd.classList.add('sc-zone-active');
      zoneStage.classList.add('sc-zone-active');
      
      await delay(500);
      [fileApp, fileStyle, fileUtils].forEach(f => f.classList.add('sc-anim-pop-out'));
      
      await delay(300);
      launchParticle(zoneWd, zoneStash, 'var(--yellow)');
      launchParticle(zoneStage, zoneStash, 'var(--yellow)');
      
      await delay(400);
      [fileApp, fileStyle, fileUtils].forEach(f => f.classList.add('sc-hidden'));
      [fileApp, fileStyle, fileUtils].forEach(f => f.classList.remove('sc-anim-pop-out'));
      
      pillNew.textContent = 'stash@{0}: "working on feature"';
      pillNew.classList.remove('sc-hidden');
      pillNew.classList.add('sc-anim-pop-in');
      pill1.textContent = 'stash@{1}';
      pill2.textContent = 'stash@{2}';
      
      showLabel(labelStash, '💡 Always name your stashes', 'lc-label-cyan');
      
      await delay(200);
      zoneWd.classList.remove('sc-zone-active');
      zoneStage.classList.remove('sc-zone-active');
      zoneWd.classList.add('sc-zone-success');
      zoneStage.classList.add('sc-zone-success');
      showLabel(labelWd, '✓ Clean', 'lc-label-green');
      showLabel(labelStage, '✓ Clean', 'lc-label-green');
      
      await delay(1500);
      zoneWd.classList.remove('sc-zone-success');
      zoneStage.classList.remove('sc-zone-success');
      pillNew.classList.remove('sc-anim-pop-in');
      [fileApp, fileStyle, fileUtils].forEach(f => {
        f.classList.remove('sc-hidden');
        f.classList.add('sc-anim-pop-in');
      });
    }

    async function playStashUntracked() {
      typeText(cmdText, '$ git stash -u', 30);
      typeText(descText, 'Includes untracked files. By default, git stash ignores new files you haven\'t git add-ed yet.', 25);
      
      fileNew.classList.remove('sc-hidden');
      fileNew.classList.add('sc-anim-pop-in');
      
      await delay(600);
      zoneWd.classList.add('sc-zone-active');
      zoneStage.classList.add('sc-zone-active');
      showLabel(labelWd, 'Without -u, new files are left behind!', 'lc-label-red');
      
      await delay(800);
      [fileApp, fileStyle, fileUtils, fileNew].forEach(f => f.classList.add('sc-anim-pop-out'));
      
      await delay(300);
      launchParticle(zoneWd, zoneStash, 'var(--yellow)');
      launchParticle(zoneStage, zoneStash, 'var(--yellow)');
      
      await delay(400);
      [fileApp, fileStyle, fileUtils, fileNew].forEach(f => f.classList.add('sc-hidden'));
      [fileApp, fileStyle, fileUtils, fileNew].forEach(f => f.classList.remove('sc-anim-pop-out'));
      
      pillNew.textContent = 'stash@{0}';
      pillNew.classList.remove('sc-hidden');
      pillNew.classList.add('sc-anim-pop-in');
      pill1.textContent = 'stash@{1}';
      pill2.textContent = 'stash@{2}';
      
      await delay(200);
      zoneWd.classList.remove('sc-zone-active');
      zoneStage.classList.remove('sc-zone-active');
      zoneWd.classList.add('sc-zone-success');
      zoneStage.classList.add('sc-zone-success');
      labelWd.classList.add('sc-hidden');
      
      await delay(1000);
      zoneWd.classList.remove('sc-zone-success');
      zoneStage.classList.remove('sc-zone-success');
      [fileApp, fileStyle, fileUtils].forEach(f => {
        f.classList.remove('sc-hidden');
        f.classList.add('sc-anim-pop-in');
      });
    }

    async function playStashList() {
      typeText(cmdText, '$ git stash list', 30);
      typeText(descText, 'Shows all saved stashes. Newest is always stash@{0}.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      
      await delay(300);
      pill1.style.boxShadow = '0 0 10px var(--yellow)';
      await delay(200);
      pill2.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(300);
      listOverlay.classList.remove('sc-hidden');
      listOverlay.classList.add('sc-anim-pop-in');
      
      await delay(2500);
      listOverlay.classList.remove('sc-anim-pop-in');
      listOverlay.classList.add('sc-anim-pop-out');
      
      await delay(300);
      pill1.style.boxShadow = 'none';
      pill2.style.boxShadow = 'none';
    }

    async function playStashShow() {
      typeText(cmdText, '$ git stash show', 30);
      typeText(descText, 'Shows which files were changed in the latest stash — no diff content, just filenames.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      pill1.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(400);
      showOverlay.classList.remove('sc-hidden');
      showOverlay.classList.add('sc-anim-pop-in');
      diffBlock.classList.add('sc-hidden');
      
      await delay(2500);
      showOverlay.classList.remove('sc-anim-pop-in');
      showOverlay.classList.add('sc-anim-pop-out');
      pill1.style.boxShadow = 'none';
    }

    async function playStashShowDiff() {
      typeText(cmdText, '$ git stash show -p', 30);
      typeText(descText, 'Full patch diff of the stash. -p stands for --patch.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      pill1.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(400);
      diffBlock.classList.remove('sc-hidden');
      showOverlay.classList.remove('sc-hidden');
      showOverlay.classList.add('sc-anim-pop-in');
      
      await delay(2800);
      showOverlay.classList.remove('sc-anim-pop-in');
      showOverlay.classList.add('sc-anim-pop-out');
      pill1.style.boxShadow = 'none';
    }

    async function playStashApply() {
      typeText(cmdText, '$ git stash apply', 30);
      typeText(descText, 'Restores the stash to Working Directory. The stash is KEPT — use this when you might need to reapply it later.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      pill1.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(500);
      launchParticle(zoneStash, zoneWd, 'var(--cyan)');
      
      await delay(400);
      [fileApp, fileStyle].forEach(f => {
        f.classList.add('sc-anim-pop-in');
        setTimeout(() => f.classList.remove('sc-anim-pop-in'), 400);
      });
      
      await delay(200);
      zoneWd.classList.add('sc-zone-success');
      showLabel(labelStash, 'still here ✓', 'lc-label-cyan');
      
      await delay(1500);
      pill1.style.boxShadow = 'none';
    }

    async function playStashApplyIndex() {
      typeText(cmdText, '$ git stash apply stash@{1}', 30);
      typeText(descText, 'Applies a specific stash by index number. Useful when you have multiple stashes.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      pill2.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(500);
      launchParticle(zoneStash, zoneWd, 'var(--cyan)');
      
      await delay(400);
      [fileApp, fileStyle].forEach(f => {
        f.classList.add('sc-anim-pop-in');
        setTimeout(() => f.classList.remove('sc-anim-pop-in'), 400);
      });
      
      await delay(200);
      zoneWd.classList.add('sc-zone-success');
      showLabel(labelStash, 'still here ✓', 'lc-label-cyan');
      
      await delay(1500);
      pill2.style.boxShadow = 'none';
    }

    async function playStashPop() {
      typeText(cmdText, '$ git stash pop', 30);
      typeText(descText, 'Restores AND deletes the stash. Think of it as apply + drop. Most common workflow.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      pill1.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(500);
      launchParticle(zoneStash, zoneWd, 'var(--cyan)');
      
      await delay(400);
      [fileApp, fileStyle].forEach(f => {
        f.classList.add('sc-anim-pop-in');
        setTimeout(() => f.classList.remove('sc-anim-pop-in'), 400);
      });
      zoneWd.classList.add('sc-zone-success');
      
      await delay(500);
      pill1.classList.add('sc-anim-pop-out');
      showLabel(labelStash, 'stash deleted', 'lc-label-red');
      
      await delay(400);
      pill1.classList.add('sc-hidden');
      pill2.textContent = 'stash@{0}';
      pill2.classList.add('sc-anim-pop-in');
      pill1.style.boxShadow = 'none';
    }

    async function playStashPopIndex() {
      typeText(cmdText, '$ git stash pop --index', 30);
      typeText(descText, 'Restores changes AND recreates original staging area. Without --index, everything goes to Working Directory only.', 25);
      
      zoneStash.classList.add('sc-zone-active');
      pill1.style.boxShadow = '0 0 10px var(--yellow)';
      
      await delay(500);
      launchParticle(zoneStash, zoneWd, 'var(--cyan)');
      launchParticle(zoneStash, zoneStage, 'var(--cyan)');
      
      await delay(400);
      [fileApp, fileStyle, fileUtils].forEach(f => {
        f.classList.add('sc-anim-pop-in');
        setTimeout(() => f.classList.remove('sc-anim-pop-in'), 400);
      });
      zoneWd.classList.add('sc-zone-success');
      zoneStage.classList.add('sc-zone-success');
      showLabel(labelStage, 'Staging area also restored', 'lc-label-cyan');
      
      await delay(500);
      pill1.classList.add('sc-anim-pop-out');
      
      await delay(400);
      pill1.classList.add('sc-hidden');
      pill2.textContent = 'stash@{0}';
      pill2.classList.add('sc-anim-pop-in');
      pill1.style.boxShadow = 'none';
    }

    async function playStashDrop() {
      typeText(cmdText, '$ git stash drop stash@{1}', 30);
      typeText(descText, 'Permanently deletes ONE specific stash. All indexes above it shift down by one.', 25);
      
      zoneStash.classList.add('sc-zone-danger');
      pill2.style.boxShadow = '0 0 10px var(--red)';
      pill2.classList.add('sc-anim-shake');
      
      await delay(800);
      launchParticle(zoneStash, zoneStash, 'var(--red)');
      pill2.classList.add('sc-anim-pop-out');
      
      await delay(400);
      pill2.classList.add('sc-hidden');
      pill2.style.boxShadow = 'none';
      zoneStash.classList.remove('sc-zone-danger');
    }

    async function playStashClear() {
      typeText(cmdText, '$ git stash clear', 30);
      typeText(descText, '⚠️ Permanently destroys ALL stashes. There is no undo. Use drop for surgical removal.', 25);
      
      zoneStash.classList.add('sc-zone-danger');
      pill1.style.boxShadow = '0 0 10px var(--red)';
      pill2.style.boxShadow = '0 0 10px var(--red)';
      
      await delay(400);
      flash.classList.remove('sc-hidden');
      await delay(100);
      flash.classList.add('sc-hidden');
      
      await delay(300);
      pill1.classList.add('sc-anim-pop-out');
      launchParticle(pill1, pill1, 'var(--red)');
      
      await delay(150);
      pill2.classList.add('sc-anim-pop-out');
      launchParticle(pill2, pill2, 'var(--red)');
      
      await delay(450);
      pill1.classList.add('sc-hidden');
      pill2.classList.add('sc-hidden');
      showLabel(labelStash, '⚠️ All stashes deleted — no undo', 'lc-label-red');
      
      zoneStash.classList.remove('sc-zone-danger');
      zoneStash.classList.add('sc-zone-active');
      await delay(200);
      zoneStash.classList.remove('sc-zone-active');
      await delay(200);
      zoneStash.classList.add('sc-zone-danger');
      await delay(200);
      zoneStash.classList.remove('sc-zone-danger');
      
      pill1.style.boxShadow = 'none';
      pill2.style.boxShadow = 'none';
    }

    const sceneMap = {
      'stash': playStash,
      'stash-named': playStashNamed,
      'stash-untracked': playStashUntracked,
      'stash-list': playStashList,
      'stash-show': playStashShow,
      'stash-show-diff': playStashShowDiff,
      'stash-apply': playStashApply,
      'stash-apply-index': playStashApplyIndex,
      'stash-pop': playStashPop,
      'stash-pop-index': playStashPopIndex,
      'stash-drop': playStashDrop,
      'stash-clear': playStashClear
    };

    cinema.querySelectorAll('.sc-cmd-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isPlaying) return;
        const sceneName = btn.dataset.scene;
        const sceneFn = sceneMap[sceneName];
        if (!sceneFn) return;

        resetScreen();
        cinema.querySelectorAll('.sc-cmd-btn').forEach(b => b.classList.remove('sc-active'));
        btn.classList.add('sc-active');
        screenTitle.textContent = `git-visualizer — scene: ${sceneName}`;

        isPlaying = true;
        sceneFn().finally(() => {
          isPlaying = false;
          btn.classList.remove('sc-active');
          screenTitle.textContent = 'git-visualizer — scene: idle';
          // Clean up pop-out animations
          cinema.querySelectorAll('.sc-anim-pop-out').forEach(el => {
             el.classList.remove('sc-anim-pop-out');
             el.classList.add('sc-hidden');
          });
        });
      });
    });

    resetBtn.addEventListener('click', () => {
      if (isPlaying) return;
      resetScreen();
      cinema.querySelectorAll('.sc-cmd-btn').forEach(b => b.classList.remove('sc-active'));
    });
  }

  /* =========================================
     10. Git Clean & Restore Section
     ========================================= */
  const gcSection = document.getElementById('git-clean-restore');
  if (gcSection) {
    // delay helper
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // -- Clean Demo --
    const gcCleanPreviewBtn = document.getElementById('gc-clean-preview-btn');
    const gcCleanForceBtn = document.getElementById('gc-clean-force-btn');
    const gcCleanResetBtn = document.getElementById('gc-clean-reset-btn');
    const gcCleanNotes = document.getElementById('gc-clean-notes');
    const gcCleanTemp = document.getElementById('gc-clean-temp');
    const gcCleanApp = document.getElementById('gc-clean-app');
    const gcCleanTerminal = document.getElementById('gc-clean-terminal');
    const gcCleanBanner = document.getElementById('gc-clean-banner');
    
    let gcCleanIsPlaying = false;

    if (gcCleanPreviewBtn) {
      gcCleanPreviewBtn.addEventListener('click', async () => {
        if (gcCleanIsPlaying) return;
        gcCleanIsPlaying = true;
        
        // Visual updates
        gcCleanNotes.classList.add('gc-preview-state');
        gcCleanTemp.classList.add('gc-preview-state');
        
        gcCleanTerminal.classList.remove('gc-hidden');
        gcCleanTerminal.textContent = "Would remove notes.txt\nWould remove temp.log";
        
        gcCleanBanner.className = 'gc-demo-banner gc-banner-preview';
        gcCleanBanner.textContent = "✓ Nothing was deleted — this is a preview only";
        gcCleanBanner.classList.remove('gc-hidden');
        
        gcCleanIsPlaying = false;
      });
    }

    if (gcCleanForceBtn) {
      gcCleanForceBtn.addEventListener('click', async () => {
        if (gcCleanIsPlaying) return;
        gcCleanIsPlaying = true;
        
        // Remove preview state
        gcCleanNotes.classList.remove('gc-preview-state');
        gcCleanTemp.classList.remove('gc-preview-state');
        
        // Delete animation
        gcCleanNotes.classList.add('gc-deleted-state');
        gcCleanTemp.classList.add('gc-deleted-state');
        
        // Safe pulse
        gcCleanApp.classList.add('gc-safe-pulse');
        
        gcCleanTerminal.classList.add('gc-hidden');
        
        gcCleanBanner.className = 'gc-demo-banner gc-banner-deleted';
        gcCleanBanner.textContent = "🗑️ Untracked files deleted. Tracked files were never touched.";
        gcCleanBanner.classList.remove('gc-hidden');
        
        await delay(1000);
        gcCleanApp.classList.remove('gc-safe-pulse');
        gcCleanIsPlaying = false;
      });
    }

    if (gcCleanResetBtn) {
      gcCleanResetBtn.addEventListener('click', () => {
        gcCleanNotes.className = 'gc-demo-file-row gc-demo-untracked';
        gcCleanTemp.className = 'gc-demo-file-row gc-demo-untracked';
        gcCleanApp.className = 'gc-demo-file-row gc-demo-tracked';
        gcCleanTerminal.classList.add('gc-hidden');
        gcCleanBanner.classList.add('gc-hidden');
      });
    }

    // -- Restore Demo --
    const gcRestoreBtn = document.getElementById('gc-restore-btn');
    const gcRestoreResetBtn = document.getElementById('gc-restore-reset-btn');
    const gcRestoreFile = document.getElementById('gc-restore-file');
    const gcStageEmpty = document.getElementById('gc-stage-empty');
    const gcWdEmpty = document.getElementById('gc-wd-empty');
    const gcRestoreBanner = document.getElementById('gc-restore-banner');
    
    let gcRestoreIsPlaying = false;

    if (gcRestoreBtn) {
      gcRestoreBtn.addEventListener('click', async () => {
        if (gcRestoreIsPlaying) return;
        gcRestoreIsPlaying = true;
        
        // Animate out
        gcRestoreFile.classList.add('gc-moving-token');
        
        await delay(400);
        
        // State update
        gcStageEmpty.classList.remove('gc-hidden');
        gcWdEmpty.classList.add('gc-hidden');
        
        // Move element physically in DOM
        document.getElementById('gc-restore-wd').appendChild(gcRestoreFile);
        
        // Remove moving class and add final styling class
        gcRestoreFile.classList.remove('gc-moving-token');
        gcRestoreFile.classList.add('gc-wd-token');
        
        gcRestoreBanner.className = 'gc-demo-banner gc-banner-restore';
        gcRestoreBanner.textContent = "✓ Unstaged — your edits in app.js are untouched";
        gcRestoreBanner.classList.remove('gc-hidden');
        
        gcRestoreIsPlaying = false;
      });
    }

    if (gcRestoreResetBtn) {
      gcRestoreResetBtn.addEventListener('click', () => {
        document.getElementById('gc-restore-stage').appendChild(gcRestoreFile);
        gcRestoreFile.className = 'gc-file-token';
        gcStageEmpty.classList.add('gc-hidden');
        gcWdEmpty.classList.remove('gc-hidden');
        gcRestoreBanner.classList.add('gc-hidden');
      });
    }

    // -- Quiz Cards --
    const gcQuizCards = gcSection.querySelectorAll('.gc-quiz-card');
    gcQuizCards.forEach(card => {
      const correctAns = card.dataset.answer;
      const options = card.querySelectorAll('.gc-quiz-option');
      
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (card.classList.contains('gc-answered')) return;
          
          card.classList.add('gc-answered');
          const val = opt.dataset.val;
          
          if (val === correctAns) {
            opt.classList.add('gc-correct');
          } else {
            opt.classList.add('gc-wrong-ans');
            // Find and highlight correct answer
            const correctBtn = card.querySelector(`.gc-quiz-option[data-val="${correctAns}"]`);
            if (correctBtn) correctBtn.classList.add('gc-correct');
          }
        });
      });
    });
  }

  /* =============================================
     16. Git Reset Interactive Section
     ============================================= */
  const grSection = document.getElementById('git-reset');
  if (grSection) {

    // ---- C. HEAD Pointer Animation ----
    const grHeadPtr = grSection.querySelector('#gr-head-pointer');
    const grNodeC = grSection.querySelector('#gr-node-c');
    const grNodeD = grSection.querySelector('#gr-node-d');
    const grLineCD = grSection.querySelector('#gr-line-cd');
    const grHeadDesc = grSection.querySelector('#gr-head-desc');
    const grHeadMoveBtn = grSection.querySelector('#gr-head-move-btn');
    const grHeadResetBtn = grSection.querySelector('#gr-head-reset-btn');

    let grHeadMoved = false;

    if (grHeadMoveBtn) {
      grHeadMoveBtn.addEventListener('click', () => {
        if (grHeadMoved) return;
        grHeadMoved = true;
        grHeadPtr.classList.add('gr-head-at-b');
        grNodeC.classList.add('gr-commit-dim');
        grNodeD.classList.add('gr-commit-dim');
        if (grLineCD) grLineCD.classList.add('gr-commit-line-dim');
        setTimeout(() => {
          if (grHeadDesc) grHeadDesc.classList.remove('gr-hidden');
        }, 500);
        grHeadMoveBtn.disabled = true;
      });
    }

    if (grHeadResetBtn) {
      grHeadResetBtn.addEventListener('click', () => {
        grHeadMoved = false;
        grHeadPtr.classList.remove('gr-head-at-b');
        grNodeC.classList.remove('gr-commit-dim');
        grNodeD.classList.remove('gr-commit-dim');
        if (grLineCD) grLineCD.classList.remove('gr-commit-line-dim');
        if (grHeadDesc) grHeadDesc.classList.add('gr-hidden');
        if (grHeadMoveBtn) grHeadMoveBtn.disabled = false;
      });
    }

    // ---- G. Soft Reset Before/After ----
    const grSoftRunBtn = grSection.querySelector('#gr-soft-run-btn');
    const grSoftStageLayer = grSection.querySelector('#gr-soft-stage-layer');
    const grSoftStageContent = grSection.querySelector('#gr-soft-stage-content');

    if (grSoftRunBtn && grSoftStageLayer) {
      let softRan = false;
      grSoftRunBtn.addEventListener('click', () => {
        if (softRan) return;
        softRan = true;
        grSoftStageLayer.classList.add('gr-layer-soft', 'gr-flash-green');
        if (grSoftStageContent) {
          grSoftStageContent.innerHTML = '<span class="gr-file-pill">Changes from C + D ✅ (staged)</span>';
        }
        setTimeout(() => grSoftStageLayer.classList.remove('gr-flash-green'), 600);
        grSoftRunBtn.textContent = '✓ Reset applied';
        grSoftRunBtn.disabled = true;
      });
    }

    // ---- H. Mixed Reset Before/After ----
    const grMixedRunBtn = grSection.querySelector('#gr-mixed-run-btn');
    const grMixedStageLayer = grSection.querySelector('#gr-mixed-stage-layer');
    const grMixedStageContent = grSection.querySelector('#gr-mixed-stage-content');
    const grMixedWdLayer = grSection.querySelector('#gr-mixed-wd-layer');
    const grMixedWdContent = grSection.querySelector('#gr-mixed-wd-content');

    if (grMixedRunBtn && grMixedStageLayer) {
      let mixedRan = false;
      grMixedRunBtn.addEventListener('click', () => {
        if (mixedRan) return;
        mixedRan = true;
        grMixedStageLayer.classList.add('gr-layer-mixed', 'gr-flash-yellow');
        if (grMixedStageContent) grMixedStageContent.innerHTML = '<span class="gr-muted">(empty) ⚠️</span>';
        setTimeout(() => grMixedStageLayer.classList.remove('gr-flash-yellow'), 600);

        if (grMixedWdLayer && grMixedWdContent) {
          setTimeout(() => {
            grMixedWdLayer.classList.add('gr-layer-mixed', 'gr-flash-yellow');
            grMixedWdContent.innerHTML = '<span class="gr-file-pill-warn">app.js (modified) ✏️</span>';
            setTimeout(() => grMixedWdLayer.classList.remove('gr-flash-yellow'), 600);
          }, 300);
        }
        grMixedRunBtn.textContent = '✓ Reset applied';
        grMixedRunBtn.disabled = true;
      });
    }

    // ---- I. Hard Reset Before/After ----
    const grHardRunBtn = grSection.querySelector('#gr-hard-run-btn');
    const grHardStageLayer = grSection.querySelector('#gr-hard-stage-layer');
    const grHardStageContent = grSection.querySelector('#gr-hard-stage-content');
    const grHardWdLayer = grSection.querySelector('#gr-hard-wd-layer');
    const grHardWdContent = grSection.querySelector('#gr-hard-wd-content');

    if (grHardRunBtn && grHardStageLayer) {
      let hardRan = false;
      grHardRunBtn.addEventListener('click', () => {
        if (hardRan) return;
        hardRan = true;
        grHardStageLayer.classList.add('gr-layer-hard', 'gr-flash-red');
        if (grHardStageContent) grHardStageContent.innerHTML = '<span class="gr-muted">(empty — wiped) 🔴</span>';
        setTimeout(() => grHardStageLayer.classList.remove('gr-flash-red'), 700);

        if (grHardWdLayer && grHardWdContent) {
          setTimeout(() => {
            grHardWdLayer.classList.add('gr-layer-hard', 'gr-flash-red');
            grHardWdContent.innerHTML = '<span class="gr-muted">(empty — all changes deleted) 🔴</span>';
            setTimeout(() => grHardWdLayer.classList.remove('gr-flash-red'), 700);
          }, 300);
        }
        grHardRunBtn.textContent = '✓ Reset applied';
        grHardRunBtn.disabled = true;
      });
    }

    // ---- J. Reset Mode Simulator ----
    const grSimSoftBtn = grSection.querySelector('#gr-sim-soft-btn');
    const grSimMixedBtn = grSection.querySelector('#gr-sim-mixed-btn');
    const grSimHardBtn = grSection.querySelector('#gr-sim-hard-btn');
    const grSimApplyBtn = grSection.querySelector('#gr-sim-apply-btn');
    const grSimResetBtn = grSection.querySelector('#gr-sim-reset-btn');

    const grSimRepo = grSection.querySelector('#gr-sim-repo');
    const grSimStage = grSection.querySelector('#gr-sim-stage');
    const grSimWd = grSection.querySelector('#gr-sim-wd');
    const grSimRepoContent = grSection.querySelector('#gr-sim-repo-content');
    const grSimStageContent = grSection.querySelector('#gr-sim-stage-content');
    const grSimWdContent = grSection.querySelector('#gr-sim-wd-content');
    const grSimC = grSection.querySelector('#gr-sim-c');
    const grSimD = grSection.querySelector('#gr-sim-d');
    const grSimDesc = grSection.querySelector('#gr-sim-desc');

    let grSimMode = 'soft';
    let grSimApplied = false;

    const grSimModeData = {
      soft: {
        repo: 'A &rarr; B <span class="gr-sim-head">(HEAD &rarr; B)</span>',
        stage: '<span class="gr-sim-file">app.js, auth.js, login.js</span> <span class="gr-sim-staged">(now staged — changes from C+D)</span>',
        wd: '<span class="gr-sim-file">login.js</span> <span class="gr-sim-modified">(modified)</span>',
        stageClass: 'gr-sim-panel-soft',
        wdClass: 'gr-sim-panel-neutral',
        desc: '✅ <strong>Soft reset</strong> moved HEAD to B. Changes from C and D are now staged — ready to be committed again.'
      },
      mixed: {
        repo: 'A &rarr; B <span class="gr-sim-head">(HEAD &rarr; B)</span>',
        stage: '<span class="gr-muted">(empty)</span>',
        wd: '<span class="gr-sim-file">app.js, auth.js, login.js</span> <span class="gr-sim-modified">(all modified)</span>',
        stageClass: 'gr-sim-panel-mixed',
        wdClass: 'gr-sim-panel-mixed',
        desc: '⚠️ <strong>Mixed reset</strong> moved HEAD to B and cleared Staging. All changes are now in the Working Directory as modified files.'
      },
      hard: {
        repo: 'A &rarr; B <span class="gr-sim-head">(HEAD &rarr; B)</span>',
        stage: '<span class="gr-muted">(empty — wiped)</span>',
        wd: '<span class="gr-muted">(empty — all changes deleted 🔴)</span>',
        stageClass: 'gr-sim-panel-hard',
        wdClass: 'gr-sim-panel-hard',
        desc: '🔴 <strong>Hard reset</strong> moved HEAD to B and wiped everything. The project is now identical to commit B.'
      }
    };

    function grSetActiveSimBtn(mode) {
      [grSimSoftBtn, grSimMixedBtn, grSimHardBtn].forEach(b => {
        if (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); }
      });
      const map = { soft: grSimSoftBtn, mixed: grSimMixedBtn, hard: grSimHardBtn };
      if (map[mode]) { map[mode].classList.add('active'); map[mode].setAttribute('aria-pressed', 'true'); }
    }

    function grResetSimulator() {
      grSimApplied = false;
      [grSimRepo, grSimStage, grSimWd].forEach(p => {
        if (p) p.className = 'gr-sim-panel';
      });
      if (grSimRepoContent) grSimRepoContent.innerHTML = 'A &rarr; B &rarr; <span class="gr-sha-sim" id="gr-sim-c">C</span> &rarr; <span class="gr-sha-sim" id="gr-sim-d">D</span> <span class="gr-sim-head">(HEAD &rarr; D)</span>';
      if (grSimStageContent) grSimStageContent.innerHTML = '<span class="gr-sim-file">app.js</span>, <span class="gr-sim-file">auth.js</span> <span class="gr-sim-staged">(staged)</span>';
      if (grSimWdContent) grSimWdContent.innerHTML = '<span class="gr-sim-file">login.js</span> <span class="gr-sim-modified">(modified)</span>';
      if (grSimDesc) grSimDesc.innerHTML = 'Select a mode above and click &ldquo;Apply Reset&rdquo; to see what happens.';
      if (grSimApplyBtn) grSimApplyBtn.disabled = false;
    }

    [
      { btn: grSimSoftBtn, mode: 'soft' },
      { btn: grSimMixedBtn, mode: 'mixed' },
      { btn: grSimHardBtn, mode: 'hard' }
    ].forEach(({ btn, mode }) => {
      if (btn) {
        btn.addEventListener('click', () => {
          grSimMode = mode;
          grSetActiveSimBtn(mode);
          if (grSimApplied) grResetSimulator();
        });
      }
    });

    if (grSimApplyBtn) {
      grSimApplyBtn.addEventListener('click', () => {
        if (grSimApplied) return;
        grSimApplied = true;
        const data = grSimModeData[grSimMode];

        // Dim C and D in repo
        if (grSimRepoContent) {
          grSimRepoContent.innerHTML = data.repo;
        }

        const flashMap = { soft: 'gr-flash-green', mixed: 'gr-flash-yellow', hard: 'gr-flash-red' };
        const flash = flashMap[grSimMode];

        // Stage panel
        setTimeout(() => {
          if (grSimStage) {
            grSimStage.classList.add(data.stageClass, flash);
            setTimeout(() => grSimStage.classList.remove(flash), 600);
          }
          if (grSimStageContent) grSimStageContent.innerHTML = data.stage;
        }, 200);

        // WD panel
        setTimeout(() => {
          if (grSimWd) {
            grSimWd.classList.add(data.wdClass, flash);
            setTimeout(() => grSimWd.classList.remove(flash), 600);
          }
          if (grSimWdContent) grSimWdContent.innerHTML = data.wd;
        }, 450);

        // Description
        setTimeout(() => {
          if (grSimDesc) grSimDesc.innerHTML = data.desc;
        }, 600);

        grSimApplyBtn.disabled = true;
      });
    }

    if (grSimResetBtn) {
      grSimResetBtn.addEventListener('click', grResetSimulator);
    }

    // ---- P. Prediction Exercises ----
    const grExerciseCards = grSection.querySelectorAll('.gr-exercise-card');
    grExerciseCards.forEach(card => {
      const opts = card.querySelectorAll('.gr-quiz-option');
      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          if (card.classList.contains('gr-ex-answered')) return;
          card.classList.add('gr-ex-answered');

          const isCorrect = opt.dataset.val === 'correct';
          opts.forEach(o => {
            o.disabled = true;
            if (o.dataset.val === 'correct') o.classList.add('gr-correct');
          });
          if (!isCorrect) opt.classList.add('gr-wrong');

          const exId = card.id;
          const expEl = grSection.querySelector(`#${exId}-exp`);
          if (expEl) expEl.classList.remove('gr-hidden');
        });
      });
    });

    // ---- Q. Mini Quiz ----
    const grQuizQuestions = [
      {
        q: 'What is HEAD?',
        opts: ['A fixed snapshot of your code', 'A pointer to the current commit', 'The latest commit on GitHub', 'The first commit in the project'],
        correct: 1
      },
      {
        q: 'Which reset mode affects the Working Directory?',
        opts: ['--soft', '--mixed', '--hard', 'None of them'],
        correct: 2
      },
      {
        q: 'Which reset mode is Git\'s default when no flag is given?',
        opts: ['--soft', '--mixed', '--hard', '--force'],
        correct: 1
      },
      {
        q: 'Why does `git push` fail after a local reset?',
        opts: ['GitHub is offline', 'Local history is behind remote history', 'The branch is protected', 'Force push is required by default'],
        correct: 1
      },
      {
        q: 'When is `git push --force` safe to use?',
        opts: ['Always', 'Never — it is always dangerous', 'On a personal feature branch no one else has pulled', 'Only on the main branch'],
        correct: 2
      }
    ];

    let grQuizIdx = 0;
    let grQuizScore = 0;
    let grQuizAnswered = false;

    const grQuizNum = grSection.querySelector('#gr-quiz-num');
    const grQuizQuestion = grSection.querySelector('#gr-quiz-question');
    const grQuizOptions = grSection.querySelector('#gr-quiz-options');
    const grQuizNext = grSection.querySelector('#gr-quiz-next');
    const grQuizResult = grSection.querySelector('#gr-quiz-result');
    const grQuizBar = grSection.querySelector('#gr-quiz-bar');

    function grRenderQuiz(idx) {
      grQuizAnswered = false;
      const q = grQuizQuestions[idx];
      if (grQuizNum) grQuizNum.textContent = `Question ${idx + 1} of ${grQuizQuestions.length}`;
      if (grQuizBar) grQuizBar.style.width = `${(idx / grQuizQuestions.length) * 100}%`;
      if (grQuizQuestion) grQuizQuestion.textContent = q.q;
      if (grQuizNext) grQuizNext.style.display = 'none';

      if (grQuizOptions) {
        grQuizOptions.innerHTML = '';
        q.opts.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.className = 'gr-mini-opt';
          btn.textContent = opt;
          btn.dataset.idx = i;
          btn.setAttribute('aria-label', opt);
          btn.addEventListener('click', () => {
            if (grQuizAnswered) return;
            grQuizAnswered = true;
            const isCorrect = i === q.correct;
            if (isCorrect) grQuizScore++;

            grQuizOptions.querySelectorAll('.gr-mini-opt').forEach((b, bi) => {
              b.disabled = true;
              if (bi === q.correct) b.classList.add('gr-opt-correct');
              else if (bi === parseInt(btn.dataset.idx) && !isCorrect) b.classList.add('gr-opt-wrong');
            });

            if (grQuizNext) grQuizNext.style.display = 'inline-flex';
          });
          grQuizOptions.appendChild(btn);
        });
      }
    }

    if (grQuizNext) {
      grQuizNext.addEventListener('click', () => {
        grQuizIdx++;
        if (grQuizIdx < grQuizQuestions.length) {
          grRenderQuiz(grQuizIdx);
        } else {
          // Show result
          if (grQuizBar) grQuizBar.style.width = '100%';
          if (grQuizNum) grQuizNum.textContent = `Complete!`;
          if (grQuizQuestion) grQuizQuestion.textContent = '';
          if (grQuizOptions) grQuizOptions.innerHTML = '';
          if (grQuizNext) grQuizNext.style.display = 'none';

          const score = grQuizScore;
          const total = grQuizQuestions.length;
          const emoji = score >= 4 ? '🎉' : score >= 3 ? '👍' : '📚';
          const msg = score >= 4
            ? `${emoji} Excellent! You scored ${score}/${total} — you have a strong grasp of Git Reset!`
            : score >= 3
              ? `${emoji} Good job! You scored ${score}/${total}. Review the reset modes once more and you'll master it.`
              : `${emoji} You scored ${score}/${total}. Spend more time with the interactive diagrams above!`;

          if (grQuizResult) {
            grQuizResult.innerHTML = msg;
            grQuizResult.classList.remove('gr-hidden');
          }
        }
      });
    }

    // Initialize quiz
    if (grQuizQuestion && grQuizOptions) {
      grRenderQuiz(0);
    }

  } // end grSection

  /* =========================================
     XX. Git Ignore Section
     ========================================= */
  const giSection = document.getElementById('git-ignore');
  if (giSection) {
    // Tabs
    const tabBtns = giSection.querySelectorAll('.gi-tab-btn');
    const tabPanels = giSection.querySelectorAll('.gi-tab-panel');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('gi-tab-active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => p.classList.remove('gi-tab-active'));
        btn.classList.add('gi-tab-active');
        btn.setAttribute('aria-selected', 'true');
        const panel = giSection.querySelector(`.gi-tab-panel[data-panel="${btn.dataset.tab}"]`);
        if (panel) panel.classList.add('gi-tab-active');
      });
    });

    // Critical Concept Simulation
    const btnStep2 = giSection.querySelector('#gi-btn-step2');
    const btnStep3 = giSection.querySelector('#gi-btn-step3');
    const btnSim = giSection.querySelector('#gi-btn-sim');
    const step2 = giSection.querySelector('#gi-step-2');
    const step3 = giSection.querySelector('#gi-step-3');
    const simResult = giSection.querySelector('#gi-sim-result');
    const delay = ms => new Promise(res => setTimeout(res, ms));

    if (btnStep2) {
      btnStep2.addEventListener('click', () => {
        step2.classList.remove('gi-step-hidden');
        step2.classList.add('gi-step-visible');
        btnStep2.style.display = 'none';
      });
    }
    if (btnStep3) {
      btnStep3.addEventListener('click', () => {
        step3.classList.remove('gi-step-hidden');
        step3.classList.add('gi-step-visible');
        btnStep3.style.display = 'none';
      });
    }
    if (btnSim) {
      btnSim.addEventListener('click', async () => {
        btnSim.disabled = true;
        btnSim.textContent = 'Simulating...';
        await delay(800);
        simResult.classList.remove('gi-step-hidden');
        simResult.classList.add('gi-step-visible');
        btnSim.textContent = 'Done!';
        
        // Change badge from Tracked to Untracked then Ignored for config.json in step 3
        const step1Badge = giSection.querySelector('#gi-step-1 .gi-badge-tracked');
        const step2Badge = giSection.querySelector('#gi-step-2 .gi-badge-tracked');
        const step3Badge = giSection.querySelector('#gi-step-3 .gi-badge-tracked');
        if (step1Badge) { step1Badge.textContent = '⚪ Untracked'; step1Badge.className = 'gi-badge-untracked'; }
        if (step2Badge) { step2Badge.textContent = '⚪ Untracked'; step2Badge.className = 'gi-badge-untracked'; }
        if (step3Badge) { step3Badge.textContent = '⚪ Untracked'; step3Badge.className = 'gi-badge-untracked'; }
      });
    }

    // Quiz
    giSection.querySelectorAll('.gi-quiz-card').forEach(card => {
      const answer = card.dataset.answer;
      const explanation = card.querySelector('.gi-quiz-explanation');
      card.querySelectorAll('.gi-quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (card.dataset.answered) return;
          card.dataset.answered = 'true';
          if (btn.dataset.val === answer) {
            btn.classList.add('gi-correct');
            if (explanation) explanation.style.display = 'block';
          } else {
            btn.classList.add('gi-wrong');
            const correctBtn = card.querySelector(`[data-val="${answer}"]`);
            if (correctBtn) correctBtn.classList.add('gi-correct');
            if (explanation) explanation.style.display = 'block';
          }
          card.querySelectorAll('.gi-quiz-option').forEach(b => b.disabled = true);
        });
      });
    });
  }

});


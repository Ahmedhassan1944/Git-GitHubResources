document.addEventListener('DOMContentLoaded', () => {
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

});

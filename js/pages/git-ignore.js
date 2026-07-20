document.addEventListener('DOMContentLoaded', () => {
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

});

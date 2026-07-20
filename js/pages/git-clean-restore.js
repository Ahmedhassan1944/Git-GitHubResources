document.addEventListener('DOMContentLoaded', () => {
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

});

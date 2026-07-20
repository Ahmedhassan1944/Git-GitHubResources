document.addEventListener('DOMContentLoaded', () => {
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

});

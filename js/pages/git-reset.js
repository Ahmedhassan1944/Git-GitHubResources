document.addEventListener('DOMContentLoaded', () => {
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

});

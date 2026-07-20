document.addEventListener('DOMContentLoaded', () => {
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

});

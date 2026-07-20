document.addEventListener('DOMContentLoaded', () => {
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

});

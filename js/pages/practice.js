document.addEventListener('DOMContentLoaded', () => {
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

});

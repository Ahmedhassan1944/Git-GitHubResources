# Google Antigravity Prompt — Git Stash Cinema: Interactive Visual Scene Player

---

## PASTE THIS INTO GOOGLE ANTIGRAVITY:

---

I need you to build a **self-contained, cinematic interactive section** for my Git learning website. The concept: a **split-screen "Git Cinema"** — a command list on the left acts as the movie script, and a visual lifecycle screen on the right plays an animated scene every time the user clicks a command.

---

## EXISTING DESIGN SYSTEM (already loaded on the page — use these exact values)

```css
--bg-main: #0a0c10;
--bg-card: #0d1117;
--bg-card-hover: #161b22;
--cyan: #00f5ff;
--blue: #3b82f6;
--purple: #8b5cf6;
--pink: #ec4899;
--green: #10b981;
--yellow: #f59e0b;
--red: #ef4444;
--text-main: #e6edf3;
--text-muted: #8b949e;
--border: rgba(48, 54, 61, 0.8);
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', Consolas, monospace;
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--shadow-lg: 0 10px 25px -5px rgba(0,0,0,0.6);
```

The page uses `.reveal` class with an existing IntersectionObserver for scroll-based fade-in. Apply it to the section wrapper.
The page has existing `.copy-btn[data-copy]` clipboard handling — reuse the pattern for any copy buttons.

---

## SECTION IDENTITY

```html
<section id="stash-cinema" class="section">
```

Section header:
- section-tag: `"Interactive Scene Player"`
- Title: `Git Stash <span class="gradient-text">Cinema</span>`
- Description: `"Select a command. Watch the scene play out inside Git."`

---

## LAYOUT — SPLIT SCREEN

```
┌─────────────────────────────────────────────────────────────────────┐
│  SECTION HEADER (centered, full width)                              │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│   🎬 COMMAND PANEL       │   🖥️  LIFECYCLE SCREEN                  │
│   (Left — 35% width)     │   (Right — 65% width)                   │
│                          │                                          │
│   Scrollable list of     │   The animated scene plays here         │
│   all stash commands     │   showing what happens inside Git        │
│   grouped by category    │                                          │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
```

On mobile (under 900px): stack vertically — screen on top, command list below.

---

## LEFT PANEL — COMMAND PANEL

**Style:** Cinematic "film script" feel.
- Background: `#050709` (slightly darker than --bg-main)
- Left border: `3px solid var(--cyan)`
- Border-radius: `16px 0 0 16px`
- Padding: `24px`
- Max-height: `640px`, `overflow-y: auto`
- Custom scrollbar: 4px wide, color `var(--cyan)` with 30% opacity

**Panel header:**
```
🎬  STASH COMMANDS
──────────────────
```
Title in `var(--font-mono)`, font-size `0.8rem`, letter-spacing `3px`, color `var(--text-muted)`, uppercase. Below it a thin cyan `<hr>` line.

**Command groups** — 4 groups, each with a group label:

---

**Group 1 — 📦 CREATE**  (group label color: `var(--green)`)

| Button Text | data-scene |
|---|---|
| `git stash` | `stash` |
| `git stash push -m "msg"` | `stash-named` |
| `git stash -u` | `stash-untracked` |

---

**Group 2 — 🔍 INSPECT**  (group label color: `var(--blue)`)

| Button Text | data-scene |
|---|---|
| `git stash list` | `stash-list` |
| `git stash show` | `stash-show` |
| `git stash show -p` | `stash-show-diff` |

---

**Group 3 — ♻️ RESTORE**  (group label color: `var(--purple)`)

| Button Text | data-scene |
|---|---|
| `git stash apply` | `stash-apply` |
| `git stash apply stash@{1}` | `stash-apply-index` |
| `git stash pop` | `stash-pop` |
| `git stash pop --index` | `stash-pop-index` |

---

**Group 4 — 🗑️ CLEAN**  (group label color: `var(--red)`)

| Button Text | data-scene |
|---|---|
| `git stash drop stash@{1}` | `stash-drop` |
| `git stash clear` | `stash-clear` |

---

**Each command button styling:**
```css
/* Use class sc-cmd-btn — sc- prefix for all new classes */
background: transparent;
border: 1px solid transparent;
border-left: 3px solid transparent;
border-radius: 6px;
padding: 10px 14px;
font-family: var(--font-mono);
font-size: 0.82rem;
color: var(--text-muted);
width: 100%;
text-align: left;
cursor: pointer;
transition: all 0.2s ease;
```

**On hover:**
```css
background: rgba(255,255,255,0.04);
color: var(--text-main);
border-left-color: var(--cyan);
```

**When active (currently playing scene — add class `.sc-active`):**
```css
background: rgba(0, 245, 255, 0.08);
border-left-color: var(--cyan);
color: var(--cyan);
box-shadow: inset 0 0 20px rgba(0,245,255,0.05);
```

Add a small animated "▶ playing" indicator that appears to the right of the button text when active (CSS only — a blinking dot + "playing" text, fades in/out).

---

## RIGHT PANEL — LIFECYCLE SCREEN

**Style:** Cinema screen / monitor feel.
- Background: `#000`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border-radius: `0 16px 16px 0`
- Overflow: hidden
- Position: relative

**Screen titlebar** (like a browser/OS window):
```
● ● ●    git-visualizer — scene: idle    [RESET]
```
- 3 dots: red `#ff5f56`, yellow `#ffbd2e`, green `#27c93f`
- Center title text in `var(--font-mono)` — updates dynamically to show current scene name
- Right: a `[RESET]` button that restores the screen to idle state

**Screen body** — the animation canvas. Height: `520px`. Contains:

### PERSISTENT ZONES (always visible, static layout)

Draw 5 zones arranged in the screen. They are always present; animations happen between them.

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  📁           │    │  📋           │    │  💾           │    │  ☁️           │
│  Working Dir  │    │  Staging Area │    │  Local Repo   │    │  Remote       │
│               │    │               │    │               │    │               │
│  [file slots] │    │  [file slots] │    │  [commit list]│    │               │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                │ ↑
                    (vertical gap — the stash lives here, centered below)
                                │
                    ┌─────────────────────────────┐
                    │  📦  STASH STACK             │
                    │  stash@{0}  stash@{1}  ...   │
                    │  (dashed border, yellow tint)│
                    └─────────────────────────────┘
```

**Zone card styles (class `sc-zone`):**
- Background: `rgba(13,17,23,0.9)`
- Border: `1px solid rgba(255,255,255,0.1)`
- Border-radius: `12px`
- Padding: `12px`
- Transition: `border-color 0.3s, box-shadow 0.3s`

**Stash Stack zone** has:
- Border: `2px dashed rgba(245,158,11,0.4)`
- Background: `rgba(245,158,11,0.04)`
- Initially contains 2 stash pills: `stash@{0}` and `stash@{1}` (can grow/shrink during animations)

**Stash pills (class `sc-stash-pill`):**
```css
display: inline-flex;
align-items: center;
gap: 6px;
background: rgba(245,158,11,0.15);
border: 1px solid rgba(245,158,11,0.4);
border-radius: 20px;
padding: 4px 10px;
font-family: var(--font-mono);
font-size: 0.75rem;
color: #f59e0b;
```

**File tokens (class `sc-file`)** — small animated pills inside Working Dir and Staging Area zones:
```css
display: inline-flex;
align-items: center;
gap: 4px;
background: rgba(255,255,255,0.06);
border: 1px solid var(--border);
border-radius: 4px;
padding: 3px 8px;
font-family: var(--font-mono);
font-size: 0.72rem;
color: var(--text-muted);
```
Pre-populate: Working Dir has `app.js ✏️`, `style.css ✏️`. Staging has `utils.js ✅`.

**Zone highlight state (class `sc-zone-active`):**
```css
border-color: var(--cyan);
box-shadow: 0 0 20px rgba(0,245,255,0.15);
```

**Zone danger state (class `sc-zone-danger`):**
```css
border-color: var(--red);
box-shadow: 0 0 20px rgba(239,68,68,0.15);
```

**Zone success state (class `sc-zone-success`):**
```css
border-color: var(--green);
box-shadow: 0 0 20px rgba(16,185,129,0.15);
```

### SCENE DESCRIPTION BAR

A bar at the bottom of the screen (inside the screen body, pinned to bottom):
- Background: `rgba(0,0,0,0.8)`
- Backdrop-filter: `blur(8px)`
- Padding: `12px 20px`
- Two lines:
  - Line 1: **Command** in cyan mono font — e.g., `$ git stash`
  - Line 2: **Plain English explanation** — e.g., `"Saves Working Directory + Staging Area into the Stash Stack. Cleans both areas."`
- Both lines type-in character by character when a scene starts (CSS animation or JS typing)

### FLOATING PARTICLE ARROWS

When files/data "move" between zones during animations, show animated arrows or "flying tokens":
- A small div with class `sc-particle` that animates from source zone to target zone using `@keyframes` with `transform: translate(x, y)`
- Color matches the direction: cyan for stash→workdir, yellow for workdir→stash, red for delete operations
- After the particle reaches its target, it fades out

---

## SCENES — Complete Definitions

Each scene is triggered by clicking a command button. All animation is CSS class toggling + JS `setTimeout` chains. No GSAP. No libraries.

Define all scene logic inside a `const sceneMap = { ... }` object. Each key is the `data-scene` value.

---

### Scene: `stash`  (`git stash`)

**Narration:** `"$ git stash"` → `"Packs Working Directory + Staging Area into the Stash. Both areas become clean."`

1. **0ms** — Highlight Working Dir and Staging Area zones with `sc-zone-active`
2. **500ms** — Animate sc-file tokens in both zones: they shrink + fade out (`transform: scale(0.5); opacity: 0`)
3. **800ms** — Launch 2–3 sc-particle arrows flying from Working Dir → Stash Stack zone
4. **1200ms** — A new sc-stash-pill `stash@{0}` (renumbers existing) appears in Stash Stack with pop-in animation (`transform: scale(0) → scale(1)`)
5. **1400ms** — Working Dir and Staging Area show "✓ Clean" label in green. Remove `sc-zone-active`. Add `sc-zone-success` briefly.
6. **2000ms** — Reset active states. File tokens reappear in Working Dir (they're restored to reflect "the workspace is now clean — those changes are safe in stash").

---

### Scene: `stash-named`  (`git stash push -m "msg"`)

Same as `stash` scene, but:
- The new pill reads: `stash@{0}: "working on feature"` (longer pill)
- Narration: `"$ git stash push -m 'working on feature'"` → `"Creates a named stash. Always use -m for clarity — unnamed stashes are hard to identify later."`
- A small tooltip appears on the new pill: `"💡 Always name your stashes"`

---

### Scene: `stash-untracked`  (`git stash -u`)

Same as `stash`, but:
- Before animating, show a NEW untracked file token appearing in Working Dir: `new-file.js 🆕` (glowing yellow)
- That token ALSO gets packed into the stash
- Narration: `"$ git stash -u"` → `"Includes untracked files. By default, git stash ignores new files you haven't git add-ed yet."`
- Flash a warning badge on screen: `"Without -u, new files are left behind!"`

---

### Scene: `stash-list`  (`git stash list`)

1. **0ms** — Stash Stack zone pulses `sc-zone-active`
2. **300ms** — All stash pills light up one by one with a yellow glow, 200ms apart
3. **600ms** — A "list readout" overlay slides up from the bottom of the Stash zone:
   ```
   stash@{0}  WIP on main: abc1234 — working on feature
   stash@{1}  WIP on main: def5678 — hotfix prep
   ```
   (styled like terminal output, mono font, dark bg)
4. **2500ms** — Overlay fades out
- Narration: `"$ git stash list"` → `"Shows all saved stashes. Newest is always stash@{0}."`

---

### Scene: `stash-show`  (`git stash show`)

1. Stash Stack zone activates + `stash@{0}` pill glows
2. A small card slides in showing:
   ```
   📄 app.js     | 3 changes
   📄 style.css  | 1 change
   ─────────────────────────
   2 files changed, 4 lines
   ```
- Narration: `"$ git stash show"` → `"Shows which files were changed in the latest stash — no diff content, just filenames."`

---

### Scene: `stash-show-diff`  (`git stash show -p`)

Same as `stash-show` but the card also shows a mini diff block:
```diff
- const old = 'value';
+ const new = 'updated';
```
Red lines for `-`, green lines for `+`.
- Narration: `"$ git stash show -p"` → `"Full patch diff of the stash. -p stands for --patch."`

---

### Scene: `stash-apply`  (`git stash apply`)

1. **0ms** — Stash Stack zone activates + `stash@{0}` glows
2. **500ms** — sc-particle arrows fly from Stash → Working Dir
3. **900ms** — File tokens reappear in Working Dir with a pop-in animation
4. **1100ms** — `stash@{0}` pill stays — does NOT disappear. It pulses once then returns to normal.
5. A small label appears on the pill: `"still here ✓"` for 1.5s
6. Working Dir gets `sc-zone-success`
- Narration: `"$ git stash apply"` → `"Restores the stash to Working Directory. The stash is KEPT — use this when you might need to reapply it later."`

---

### Scene: `stash-apply-index`  (`git stash apply stash@{1}`)

Same as `stash-apply` but:
- `stash@{1}` pill is the one that glows (not stash@{0})
- Narration: `"$ git stash apply stash@{1}"` → `"Applies a specific stash by index number. Useful when you have multiple stashes."`

---

### Scene: `stash-pop`  (`git stash pop`)

Same animation as `stash-apply` EXCEPT:
1. After files appear in Working Dir (step 3)
2. `stash@{0}` pill shrinks and fades OUT (deleted): `transform: scale(0); opacity: 0`
3. Remaining pills renumber: `stash@{1}` becomes `stash@{0}` with a brief highlight animation
4. A label flashes: `"stash deleted"`
- Narration: `"$ git stash pop"` → `"Restores AND deletes the stash. Think of it as apply + drop. Most common workflow."`

---

### Scene: `stash-pop-index`  (`git stash pop --index`)

Same as `stash-pop` but:
- File tokens reappear in BOTH Working Dir AND Staging Area (not just Working Dir)
- Staging Area also gets `sc-zone-success`
- A badge appears between them: `"Staging area also restored"`
- Narration: `"$ git stash pop --index"` → `"Restores changes AND recreates the original staging area state. Without --index, everything goes to Working Directory only."`

---

### Scene: `stash-drop`  (`git stash drop stash@{1}`)

1. `stash@{1}` pill gets `sc-zone-danger` glow (red)
2. It shakes left-right (CSS keyframe: `translateX(-4px → 4px → -2px → 2px → 0)`)
3. It shrinks and fades out
4. `stash@{2}` (if exists) slides left and renumbers to `stash@{1}` with highlight
- Narration: `"$ git stash drop stash@{1}"` → `"Permanently deletes ONE specific stash. All indexes above it shift down by one."`

---

### Scene: `stash-clear`  (`git stash clear`)

**Dramatic scene:**
1. **0ms** — All stash pills glow red simultaneously
2. **400ms** — Screen flashes once (very brief white overlay, `opacity: 0.05`, immediately fades)
3. **600ms** — All pills play a staggered deletion animation: each one shrinks+fades with 150ms delay between them
4. **1200ms** — Stash Stack zone is empty. Shows a label: `"⚠️ All stashes deleted — no undo"`
5. Stash Stack zone border pulses red 2×, then returns to yellow dashed
- Narration: `"$ git stash clear"` → `"⚠️ Permanently destroys ALL stashes. There is no undo. Use drop for surgical removal."`

---

## JAVASCRIPT ARCHITECTURE

All JS scoped to `#stash-cinema` element.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const cinema = document.getElementById('stash-cinema');
  if (!cinema) return;

  // Stash state — tracks current pills
  let stashPills = [
    { id: 'stash@{0}', label: 'WIP: feature work' },
    { id: 'stash@{1}', label: 'WIP: hotfix prep' }
  ];

  let isPlaying = false;

  // Scene map: keyed by data-scene value
  const sceneMap = {
    'stash': playStash,
    'stash-named': playStashNamed,
    // ... etc
  };

  // Attach click handlers — scoped to cinema
  cinema.querySelectorAll('.sc-cmd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isPlaying) return;
      const sceneName = btn.dataset.scene;
      const sceneFn = sceneMap[sceneName];
      if (!sceneFn) return;

      // Mark active
      cinema.querySelectorAll('.sc-cmd-btn').forEach(b => b.classList.remove('sc-active'));
      btn.classList.add('sc-active');

      // Update titlebar
      cinema.querySelector('.sc-screen-title').textContent = `git-visualizer — scene: ${sceneName}`;

      // Play
      isPlaying = true;
      sceneFn().finally(() => {
        isPlaying = false;
        btn.classList.remove('sc-active');
        cinema.querySelector('.sc-screen-title').textContent = 'git-visualizer — scene: idle';
      });
    });
  });

  // RESET button
  cinema.querySelector('.sc-reset-btn').addEventListener('click', () => {
    if (isPlaying) return;
    resetScreen();
  });

  // Helper: type text character by character into an element
  async function typeText(el, text, speed = 25) {
    el.textContent = '';
    for (const char of text) {
      el.textContent += char;
      await delay(speed);
    }
  }

  // Helper: delay
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  // Helper: animate particle from zone to zone
  function launchParticle(fromZone, toZone, color = 'var(--cyan)') {
    // Get bounding boxes relative to screen container
    // Create .sc-particle div, animate via CSS custom properties
    // Remove after animation
  }

  // Reset function
  function resetScreen() { /* restore all zones to initial state */ }

  // Scene functions — each returns a Promise
  async function playStash() { /* ... */ }
  async function playStashPop() { /* ... */ }
  // etc.
});
```

Use `async/await` with the `delay()` helper for all timing. Each scene function is `async` and returns after the animation completes.

---

## CSS ARCHITECTURE

All CSS prefixed with `sc-` and scoped inside `#stash-cinema` where needed.

```css
/* Main layout */
#stash-cinema .sc-cinema-layout { display: grid; grid-template-columns: 35% 65%; min-height: 640px; }

/* Command Panel */
#stash-cinema .sc-panel { background: #050709; border-right: 1px solid var(--border); border-radius: 16px 0 0 16px; }

/* Screen */
#stash-cinema .sc-screen { background: #000; border-radius: 0 16px 16px 0; position: relative; overflow: hidden; }

/* Zones layout inside screen body */
#stash-cinema .sc-zones-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 12px;
  padding: 20px;
  height: calc(100% - 80px); /* leave room for description bar */
}

/* Stash zone spans columns 2–3, placed in row 2 */
#stash-cinema .sc-zone-stash {
  grid-column: 2 / 4;
  grid-row: 2;
  border: 2px dashed rgba(245,158,11,0.4);
  background: rgba(245,158,11,0.04);
}

/* Particle animation */
@keyframes sc-particle-fly {
  0%   { opacity: 1; transform: translate(0, 0) scale(1); }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--sc-dx), var(--sc-dy)) scale(0.3); }
}

#stash-cinema .sc-particle {
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 50%;
  animation: sc-particle-fly 0.6s ease-in forwards;
  pointer-events: none;
  z-index: 10;
}

/* Pill pop-in */
@keyframes sc-pop-in {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}

/* Pill delete */
@keyframes sc-pop-out {
  0%   { transform: scale(1); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
}

/* Shake */
@keyframes sc-shake {
  0%,100% { transform: translateX(0); }
  20%  { transform: translateX(-5px); }
  40%  { transform: translateX(5px); }
  60%  { transform: translateX(-3px); }
  80%  { transform: translateX(3px); }
}

/* Typing animation for description bar */
@keyframes sc-blink { 0%,100%{opacity:1} 50%{opacity:0} }
#stash-cinema .sc-cursor { animation: sc-blink 0.8s step-end infinite; }
```

---

## NAMESPACE RULES — CRITICAL

⚠️ This page already has these global classes — do NOT reuse them:
`.term-btn`, `.terminal-body`, `.terminal-window`, `.lifecycle-card`, `.lifecycle-grid`, `.cmd-card`, `.filter-btn`, `.copy-btn` (only safe to reuse if using `data-copy` pattern exactly as-is)

All new classes: prefix `sc-`
All new IDs: none needed (scope via `#stash-cinema .sc-*`)
All JavaScript: scoped inside `const cinema = document.getElementById('stash-cinema'); if (!cinema) return;`

---

## OUTPUT FORMAT

Return **three separate clearly-labeled blocks**:

**[HTML]** — Full section from `<section id="stash-cinema">` to `</section>`

**[CSS]** — All styles, every rule scoped to `#stash-cinema` or `.sc-*` prefixed

**[JS]** — Full animation engine, placed inside existing `DOMContentLoaded` listener

---

## FINAL QUALITY BAR

- Zero external libraries or CDN links
- Pure CSS keyframe animations only
- Every scene must have a typed-in description at the bottom of the screen
- The Stash zone must look visually distinct from the 4 main lifecycle zones (dashed yellow border vs solid border)
- On mobile: the screen appears first (full width), commands scroll below it
- Light theme compatible: add `[data-theme="light"] #stash-cinema` overrides for backgrounds
- The experience should feel like watching a **directed scene** — smooth, timed, and purposeful — not just toggling visibility

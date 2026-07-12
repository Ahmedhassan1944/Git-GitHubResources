# Google Antigravity Prompt — Git Clean & Git Restore --staged Section

---

## PASTE THIS INTO GOOGLE ANTIGRAVITY:

---

I have an existing Git & GitHub interactive learning website built with pure HTML, CSS, and JavaScript (no frameworks, no build tools). It already has a "Git Stash" section (`id="git-stash"`). I need you to generate a new section, placed directly after it, that teaches **Git Clean** and **Git Restore --staged** together.

---

## EXISTING DESIGN SYSTEM

```css
--bg-main: #0a0c10;
--bg-card: #0d1117;
--bg-card-hover: #161b22;
--bg-glass: rgba(13, 17, 23, 0.7);
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
--shadow-glow: 0 0 20px rgba(0, 245, 255, 0.2);
```

Light theme is toggled via `[data-theme="light"]` on `<html>`.

---

## EXISTING SECTION STRUCTURE PATTERN

```html
<section id="SECTION-ID" class="section [section-alt]">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">TAG TEXT</span>
      <h2 class="section-title">Title <span class="gradient-text">Highlighted Word</span></h2>
      <p class="section-desc">Short description sentence.</p>
    </div>
    <!-- content -->
  </div>
</section>
```

`.reveal` triggers the existing scroll-fade IntersectionObserver — apply it to every card.
`.gradient-text` = `background: linear-gradient(135deg, #00f5ff, #8b5cf6, #ec4899); -webkit-background-clip: text; color: transparent;`

Cards follow:
```css
background: var(--bg-card);
border: 1px solid var(--border);
border-radius: 12px;
padding: 24px;
transition: var(--transition);
```
Hover: `transform: translateY(-4px); box-shadow: var(--shadow-lg);`

Code blocks:
```css
background: #000;
padding: 16px;
border-radius: 8px;
font-family: var(--font-mono);
font-size: 0.85rem;
border: 1px solid var(--border);
```
Syntax colors: commands → `#00f5ff`, strings → `#10b981`, comments → `#8b949e`

Copy button pattern (already wired globally, reuse as-is):
```html
<button class="copy-btn" aria-label="Copy COMMAND" data-copy="COMMAND TEXT">⧉ Copy</button>
```

---

## SECTION IDENTITY

Place this section **immediately after** the closing `</section>` of `#git-stash`, before the footer.

```html
<section id="git-clean-restore" class="section section-alt">
```

- section-tag: `"Cleanup & Undo"`
- Title: `Clean <span class="gradient-text">&amp; Restore</span>`
- Description: `"Remove untracked clutter safely, and undo a mistaken git add without losing your work."`

---

## WHAT TO BUILD

### A. Prerequisite Recap — Three Areas Strip

A slim horizontal strip (reuse visual language, don't duplicate the Lifecycle section's actual classes — use new `gc-` prefixed classes) showing:

```
📁 Working Directory  →  📋 Staging Area  →  💾 Repository
```

Small caption underneath: "Git Clean acts on the Working Directory. Git Restore --staged acts on the Staging Area."

---

### B. Git Clean — Concept Block (2-column layout)

**Left column — "What is an untracked file?"**
A small file-tree visual card:
```
📄 app.js        ✅ Tracked
📄 style.css     ✅ Tracked
📄 notes.txt     ⚪ Untracked
📄 temp.log      ⚪ Untracked
```
Tracked rows have a subtle green left border; Untracked rows have a subtle gray dashed left border.

**Right column — Common misconception warning card**
Styled as a red/amber alert card:
- ❌ "git clean deletes everything in the Working Directory" — **WRONG**
- ✅ "git clean only removes untracked files — tracked files and their edits are always safe"

---

### C. Git Clean — Preview vs Delete (Interactive Before/After Demo)

Build an interactive card with two buttons: `Run git clean -n` and `Run git clean -f`, plus a file list that responds to clicks.

**Initial file list state (rendered as file token rows):**
```
app.js       — Tracked, Modified   (stays always)
notes.txt    — Untracked
temp.log     — Untracked
```

**When "Run git clean -n" is clicked:**
- Do NOT remove anything from the DOM
- Untracked rows (`notes.txt`, `temp.log`) get a highlighted dashed outline + a small tag: `"Would remove"`
- A terminal-style output line appears below: `Would remove notes.txt` / `Would remove temp.log`
- Add a green confirmation banner: `"✓ Nothing was deleted — this is a preview only"`

**When "Run git clean -f" is clicked:**
- `notes.txt` and `temp.log` rows animate: fade out + collapse height (like items being deleted)
- `app.js` row stays untouched, pulses briefly with a green "safe" glow
- A banner appears: `"🗑️ Untracked files deleted. Tracked files were never touched."`

Add a "↺ Reset Demo" button to restore the initial state.

Style: reuse the terminal aesthetic already used in the Practice section — `background:#000`, mono font — for the command output lines.

---

### D. Git Clean — Commands Reference Cards (grid)

| Command | Category | Description |
|---|---|---|
| `git clean -n` | Preview | Shows what would be deleted. Deletes nothing. Always run this first. |
| `git clean -f` | Delete | Deletes untracked files only. Tracked files are never affected. |
| `git clean -fd` | Delete | Also removes untracked **directories**, not just files. |
| `git clean -fx` | Delete | Also removes files ignored by `.gitignore` — use with extra care. |

Category badge colors: Preview → `--blue`, Delete → `--red`

---

### E. Git Restore --staged — Concept Block

**Mental model banner** (full width, centered, large text):
```
git add              →   Working Directory → Staging Area
git restore --staged →   Staging Area → Working Directory  (undo the add — work is NOT lost)
```
Style each line as a pill/row with an icon (⬆️ for add, ⬇️ for restore --staged), separated by a glowing divider.

---

### F. Git Restore --staged — Interactive Before/After Demo

A two-panel card showing live state transitions:

**Panel 1: Before**
```
Working Directory: (empty / clean)
Staging Area: app.js
```

Button: `Run git restore --staged app.js`

**On click, animate:**
- `app.js` token slides/fades from the Staging panel down into the Working Directory panel
- Staging panel becomes empty with label "Empty"
- Working Directory panel shows `app.js` tagged `"Tracked + Modified"`
- A confirmation banner: `"✓ Unstaged — your edits in app.js are untouched"`

**Panel 2: After** (final state, shown once animation completes)
```
Working Directory: app.js (Tracked + Modified)
Staging Area: (empty)
```

Add "↺ Reset Demo" button.

---

### G. Git Clean vs Git Restore --staged — Comparison Table

Side-by-side comparison card (reuse the two-column-with-VS-divider pattern):

**git clean**
- Works on: Untracked files
- Action: Deletes files
- Recoverable: ⚠️ Not easily
- Flags: `-n` preview, `-f` force

**git restore --staged**
- Works on: Tracked, staged files
- Action: Removes from Staging Area only
- Recoverable: ✅ Always — no data lost
- Flags: none needed, just the filename

---

### H. ⚠️ Common Mistakes — Warning Cards Grid

Amber warning cards with ⚠️ icon:

1. **Thinking `git clean` deletes tracked files** — It never touches tracked files, only untracked ones
2. **Thinking `git clean` deletes modified tracked files** — Modified tracked files are always safe
3. **Thinking `git clean -n` deletes anything** — `-n` is preview-only, zero files removed
4. **Thinking `git restore --staged` removes your changes** — It only unstages; your edits stay in the Working Directory
5. **Thinking `git restore --staged` restores the last commit** — It does not touch file content at all, only the staging state

---

### I. Practical Exercises — Quiz Cards

Build 4 collapsible "predict the outcome" cards. Each shows a scenario, an input box or multiple-choice buttons, and reveals the correct answer with an explanation on submit/click.

**Exercise 1:**
Given: `app.js (Modified)`, `notes.txt (Untracked)` — Predict the output of `git clean -n`
Answer: `Would remove notes.txt` — nothing deleted, app.js untouched (it's tracked)

**Exercise 2:**
Same starting state — Predict the result after `git clean -f`
Answer: `notes.txt` deleted, `app.js` still exists with its modifications

**Exercise 3:**
Given: `app.js (Staged)` — Predict the result after `git restore --staged app.js`
Answer: `app.js` moves back to Working Directory as Modified; nothing is lost

**Exercise 4 (mixed):**
Given: `app.js (Modified)`, `style.css (Staged)`, `notes.txt (Untracked)` — Predict the final state after running `git clean -f` then `git restore --staged style.css`
Answer: `notes.txt` deleted → `style.css` unstaged to Working Directory as Modified → `app.js` unchanged throughout

Use multiple-choice buttons (3–4 options each) styled with the existing `.filter-btn`-style pill but namespaced (see rules below). Correct answer turns green on selection; wrong answer turns red and shows the correct one highlighted.

---

## NAMESPACE & ANTI-CONFLICT RULES — CRITICAL

⚠️ The existing page already uses these global classes — do **NOT** reuse them:
`.cmd-card`, `.filter-btn`, `.commands-grid`, `#cmd-search`, `#commands-grid`, `#no-results`, `.lifecycle-card`, `.lifecycle-grid`, `.lc-icon-wrap`, `.lc-badge`

The Git Stash section already uses `stash-` prefixed classes — do **NOT** reuse those either (`.stash-card`, `.stash-filter-btn`, `.stash-grid`, etc.) even though this section sits right next to it.

All new classes in this section **must be prefixed with `gc-`** (e.g. `.gc-card`, `.gc-file-row`, `.gc-demo-btn`, `.gc-quiz-option`).

All new CSS selectors must be scoped inside `#git-clean-restore` — never write a bare `.card` or `.file-row` rule.

All new JavaScript must scope every query to the section:
```javascript
const gcSection = document.getElementById('git-clean-restore');
const gcDemoBtns = gcSection.querySelectorAll('.gc-demo-btn');
```
Never use unscoped `document.querySelectorAll('.gc-*')`.

The **only** shared/global patterns allowed:
- `class="reveal"` — existing IntersectionObserver picks it up automatically
- `<button class="copy-btn" data-copy="...">⧉ Copy</button>` — existing global clipboard handler, safe to reuse as-is

---

## NAVBAR & FOOTER INTEGRATION

Navbar `<li>` to add (after the Git Stash link):
```html
<li><a href="#git-clean-restore" class="nav-link">Clean &amp; Restore</a></li>
```

Footer "Learn" column link:
```html
<li><a href="#git-clean-restore">Clean &amp; Restore</a></li>
```

---

## QUALITY REQUIREMENTS

- Zero external libraries or CDN links
- Pure CSS animations only (no GSAP, no anime.js)
- Mobile-responsive: all grids use `repeat(auto-fill, minmax(..., 1fr))`
- Light theme compatible — test all new colors against `[data-theme="light"]`
- All interactive elements have `aria-label`
- Consistent font usage: Inter for body text, JetBrains Mono for code/commands
- Premium feel: glow effects on hover matching `--shadow-glow`, smooth transitions, no jarring instant state changes
- All demo animations use CSS class toggling + `setTimeout`/`async-await` — never inline style mutation from JS

---

## OUTPUT FORMAT

Return three separate labeled code blocks:

**[HTML]** — The full section to insert after `#git-stash`'s closing `</section>`, plus the navbar and footer `<li>` snippets

**[CSS]** — All new `gc-`prefixed styles, scoped to `#git-clean-restore`, to append to style.css

**[JS]** — All new interactive logic (clean demo, restore demo, quiz cards), scoped to `#git-clean-restore`, to add inside the existing `DOMContentLoaded` listener in script.js

Generate the three code blocks now. Make the section visually stunning, safe (no conflicts with existing Stash or Commands sections), and educationally complete.

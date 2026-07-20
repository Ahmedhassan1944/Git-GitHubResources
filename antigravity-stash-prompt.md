# Google Antigravity Prompt — Git Stash Section

---

## PROMPT TO PASTE INTO GOOGLE ANTIGRAVITY:

---

I have an existing Git & GitHub interactive learning website built with pure HTML, CSS, and JavaScript (no frameworks, no build tools). I need you to generate the code for a new **Git Stash** section that fits perfectly into this site.

---

## EXISTING DESIGN SYSTEM

The site uses these CSS variables (already defined globally):

```css
--bg-main: #0a0c10
--bg-card: #0d1117
--bg-card-hover: #161b22
--bg-glass: rgba(13, 17, 23, 0.7)
--cyan: #00f5ff
--blue: #3b82f6
--purple: #8b5cf6
--pink: #ec4899
--green: #10b981
--yellow: #f59e0b
--red: #ef4444
--text-main: #e6edf3
--text-muted: #8b949e
--border: rgba(48, 54, 61, 0.8)
--font-sans: 'Inter', system-ui, sans-serif
--font-mono: 'JetBrains Mono', Consolas, monospace
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--shadow-lg: 0 10px 25px -5px rgba(0,0,0,0.6)
```

Light theme is toggled via `[data-theme="light"]` on the `<html>` element.

---

## EXISTING SECTION STRUCTURE PATTERN

Every section follows this exact HTML pattern:

```html
<section id="SECTION-ID" class="section [section-alt]">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">TAG TEXT</span>
      <h2 class="section-title">Title <span class="gradient-text">Highlighted Word</span></h2>
      <p class="section-desc">Short description sentence.</p>
    </div>
    <!-- Section content here -->
  </div>
</section>
```

The `.reveal` class triggers a scroll-based fade-in animation (IntersectionObserver already running). Apply `.reveal` to all cards and major elements.

The `.gradient-text` class applies: `background: linear-gradient(135deg, #00f5ff, #8b5cf6, #ec4899); -webkit-background-clip: text; color: transparent;`

---

## EXISTING CARD PATTERN

Cards follow this style:

```css
background: var(--bg-card);
border: 1px solid var(--border);
border-radius: 12px;
padding: 24px;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

On hover: `transform: translateY(-4px); box-shadow: var(--shadow-lg);`

Code blocks inside cards use:
```css
background: #000;
padding: 16px;
border-radius: 8px;
font-family: 'JetBrains Mono', monospace;
font-size: 0.85rem;
border: 1px solid var(--border);
```

Syntax colors: commands → `color: #00f5ff`, strings → `color: #10b981`, comments → `color: #8b949e`

---

## WHAT TO GENERATE

Generate **three separate code blocks**:

### 1. HTML (the full section to insert before the `<footer>` tag)
### 2. CSS (new styles to append to style.css)  
### 3. JavaScript (new code to add inside the existing `DOMContentLoaded` listener in script.js)

---

## THE SECTION CONTENT — GIT STASH

Build a premium educational section with `id="git-stash"` using these sub-components:

---

### A. Section Header
- section-tag: "Temporary Storage"
- Title: `Git <span class="gradient-text">Stash</span>`
- Description: "Save your unfinished work without committing. Switch context instantly."

---

### B. Concept Overview — "What is Git Stash?" (2-column layout)

Left column: A visual diagram showing 3 zones stacked vertically with animated arrows between them:
```
📁 Working Directory  →  (git stash)  →  📦 Stash Stack
📦 Stash Stack        →  (git stash pop)  →  📁 Working Directory
```
Each zone is a styled card with an icon, label, and short description.

Right column: A real-world scenario told as a vertical timeline with 7 steps:
1. 👨‍💻 Working on Feature A
2. 🚨 Urgent bug reported!
3. 📦 Run `git stash` — work is saved
4. 🌿 Switch to `hotfix` branch
5. 🐛 Fix the bug & commit
6. 🔙 Return to feature branch
7. ✅ Run `git stash pop` — continue Feature A

Style each step as a small card with a colored left border (alternating --cyan and --purple).

---

### C. What Gets Saved? — Visual comparison grid (3 columns)

Column 1 — ✅ Default `git stash` saves:
- Tracked modified files
- Tracked staged files

Column 2 — ❌ Default does NOT save:
- Untracked new files
- Ignored files

Column 3 — ✅ With `git stash -u` also saves:
- Untracked new files

Use green checkmarks (color: --green) and red X marks (color: --red). Add a warning banner: "💡 Always use `git stash -u` when you have new files you haven't run `git add` on yet."

---

### D. Commands Reference — Styled cards grid (3 columns, auto-fill)

Build one card per command. Each card has: category badge, command name in mono font, description, and a syntax-highlighted code block with copy button.

Commands to include:

| Command | Category | Description |
|---|---|---|
| `git stash` | Create | Save tracked changes and clean working directory |
| `git stash push -m "message"` | Create | Save with a descriptive name (**recommended** — replaces deprecated `save`) |
| `git stash save "message"` | Create | ⚠️ Deprecated syntax — shown for recognition only; prefer `push -m` |
| `git stash -u` or `git stash --include-untracked` | Create | Include untracked new files (both short and long form) |
| `git stash list` | Inspect | Show all saved stashes |
| `git stash show` | Inspect | Show changed files in latest stash |
| `git stash show -p` | Inspect | Show full diff of latest stash |
| `git stash apply` | Restore | Restore changes, keep stash |
| `git stash apply stash@{2}` | Restore | Restore a specific stash by index |
| `git stash apply --index` | Restore | Restore changes AND restore the original staging area state |
| `git stash pop` | Restore | Restore changes AND delete stash |
| `git stash pop --index` | Restore | Restore changes, restore staging area state, then delete stash |
| `git stash drop stash@{1}` | Clean | Delete one specific stash |
| `git stash clear` | Clean | Delete ALL stashes permanently (add danger styling) |

Category badge colors: Create → --green, Inspect → --blue, Restore → --purple, Clean → --red

---

### E. `apply` vs `pop` — Comparison Table

A side-by-side comparison card with two columns:

**git stash apply**
- ✅ Restores changes to Working Directory
- ✅ Keeps stash in list
- 🔁 Can be applied multiple times
- 💡 Use when: you might need the stash again

**git stash pop**
- ✅ Restores changes to Working Directory
- ❌ Deletes stash after restore
- ⚡ Most common workflow
- 💡 Use when: you're done with the stash

Style as two side-by-side cards with a VS divider in the center. pop card has a cyan glowing border.

---

### F. Stash Numbering — Animated Interactive Demo

Show a visual stash stack (like a list of cards stacked):

Initial state:
```
stash@{0} — "feat: login UI"
stash@{1} — "fix: navbar colors"
stash@{2} — "wip: dashboard"
```

Add a button: "Drop stash@{1}"

When clicked, animate stash@{1} fading out, then stash@{2} renumbers to stash@{1} with a highlight animation.

Add explanatory text: "Git automatically renumbers all stashes after a drop."

---

### G. ⚠️ Common Mistakes — Warning cards grid

Style as amber/yellow warning cards with a ⚠️ icon:

1. **Thinking stash saves untracked files** — Use `-u` flag for new files
2. **Thinking `pop` never causes conflicts** — pop is a merge; conflicts can happen
3. **Thinking restored changes always go to staging** — They go to Working Directory by default; use `--index` to restore staging state
4. **Forgetting `pop` deletes the stash** — Use `apply` if you're unsure
5. **Using `clear` by accident** — Clears ALL stashes permanently, no undo
6. **Using stash as long-term storage** — Create a branch instead

---

### H. Stash vs Branch — Decision Card

A styled decision banner at the bottom of the section:

```
⏱️ Short interruption (minutes/hours)?  →  Use git stash
📅 Long interruption (days/weeks)?      →  Create a branch
🤝 Need to share work with teammates?   →  Create a branch
💾 Need a backup?                       →  Create a branch
```

Style as a two-column card with a glowing divider line between the two options.

---

## NAMESPACE & ANTI-CONFLICT RULES — CRITICAL

⚠️ The existing page already uses these global class names that **must NOT be reused**:
`.cmd-card`, `.cmd-search-wrap`, `.filter-btn`, `.commands-grid`, `.copy-btn` (except as shown below), `#cmd-search`, `#commands-grid`, `#no-results`

All new HTML classes **must be prefixed with `stash-`** (e.g. `.stash-card`, `.stash-filter-btn`, `.stash-grid`).

All new CSS selectors **must be scoped inside `#git-stash`** — never write a bare `.card` or `.filter-btn` rule.

All new JavaScript **must scope every `querySelector` / `querySelectorAll` to the section element**:
```javascript
const stashSection = document.getElementById('git-stash');
const stashCards = stashSection.querySelectorAll('.stash-card');
```
Never use `document.querySelectorAll('.stash-*')` without scoping.

The **only** shared patterns allowed are:
- `class="reveal"` — so the existing IntersectionObserver picks up new elements
- `<button class="copy-btn" data-copy="...">⧉ Copy</button>` — the existing clipboard handler already listens on `document` and handles these safely

---

## INTERACTIVITY REQUIREMENTS

1. **Copy buttons** on every code block — use the existing pattern exactly:
   ```html
   <button class="copy-btn" aria-label="Copy COMMAND" data-copy="COMMAND TEXT">⧉ Copy</button>
   ```
   The existing clipboard JS already handles `.copy-btn` with `data-copy` globally — no new JS needed for this.

2. **Stash stack animation** — pure CSS transitions + JavaScript classList toggling, no external libraries. Scope all JS to `#git-stash`.

3. **Scroll reveal** — add `class="reveal"` to all cards so the existing IntersectionObserver handles the fade-in automatically.

4. **Filter tabs** on the commands grid — add filter buttons with class `stash-filter-btn` (NOT `filter-btn`). Implement their JS scoped inside the `#git-stash` element. Categories: All / Create / Inspect / Restore / Clean.

---

## NAVBAR INTEGRATION

Also provide the `<li>` tag to add to the navbar:
```html
<li><a href="#git-stash" class="nav-link">Git Stash</a></li>
```

And the footer Learn column link:
```html
<li><a href="#git-stash">Git Stash</a></li>
```

---

## QUALITY REQUIREMENTS

- Zero external libraries or CDN links
- Pure CSS animations only (no GSAP, no anime.js)
- Mobile-responsive (all grids use `repeat(auto-fill, minmax(..., 1fr))`)
- Light theme compatible (test with `[data-theme="light"]`)
- All interactive elements have `aria-label` attributes
- Consistent with the existing Inter + JetBrains Mono font usage
- The section should feel premium — use gradients, glow effects on hover (matching `--shadow-glow: 0 0 20px rgba(0, 245, 255, 0.2)`), and smooth transitions

---

Generate the three code blocks now. Make the section visually stunning and educationally complete.

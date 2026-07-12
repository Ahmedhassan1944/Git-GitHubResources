# Google Antigravity Prompt — Git Reset (HEAD) Section

---

## PASTE THIS INTO GOOGLE ANTIGRAVITY:

---

I have an existing Git & GitHub interactive learning website built with pure HTML, CSS, and JavaScript (no frameworks, no build tools). It already has sections for Git Stash (`id="git-stash"`) and Git Clean & Restore (`id="git-clean-restore"`). I need you to generate a new section placed directly after `#git-clean-restore` that teaches **Git Reset** — covering `git log`, `git reset --soft`, `git reset --mixed`, `git reset --hard`, and `git push --force`.

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

`.reveal` triggers the existing scroll-fade IntersectionObserver — apply it to every card and major element.
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

Code blocks inside cards:
```css
background: #000;
padding: 16px;
border-radius: 8px;
font-family: var(--font-mono);
font-size: 0.85rem;
border: 1px solid var(--border);
```
Syntax colors: commands → `#00f5ff`, strings/values → `#10b981`, comments → `#8b949e`, SHAs → `#f59e0b`

Copy button pattern (already wired globally — reuse exactly as-is, no new JS needed):
```html
<button class="copy-btn" aria-label="Copy COMMAND" data-copy="COMMAND TEXT">⧉ Copy</button>
```

---

## SECTION IDENTITY

Place this section **immediately after** the closing `</section>` of `#git-clean-restore`, before the footer.

```html
<section id="git-reset" class="section">
```

- section-tag: `"Rewriting History"`
- Title: `Resetting <span class="gradient-text">The HEAD</span>`
- Description: `"Move HEAD backwards in time. Understand exactly which layers Git touches — and when that becomes dangerous."`

---

## EDUCATIONAL PHILOSOPHY — CRITICAL

This website is NOT a command reference. It is a conceptual understanding platform.

Every component you generate must make the student understand **WHY** this command exists, **WHAT** problem it solves, **HOW** Git internally behaves, **WHERE** files move between layers, and **WHAT** changes after every reset mode. Never present commands without first establishing the conceptual motivation. The learner should leave able to explain Git Reset to someone else — not just know which flags to type.

---

## WHAT TO BUILD

---

### A. Section Header
- section-tag: `"Rewriting History"`
- Title: `Resetting <span class="gradient-text">The HEAD</span>`
- Description: `"Move HEAD backwards in time. Understand exactly which layers Git touches — and when that becomes dangerous."`

---

### B. Why Reset Exists — Motivation Block (full-width, before any commands)

Build a full-width motivation card with heading "Why Would You Ever Want to Move Backwards?"

Inside, render a 2×3 responsive grid of scenario cards. Each card has:
- A large emoji icon
- A short bold title
- One sentence explanation of the real problem

Scenarios:

| Emoji | Title | Explanation |
|---|---|---|
| ✍️ | Wrong commit message | You committed with a typo or unclear message and want to redo it. |
| 🧩 | Too many small commits | You made 5 tiny commits and want to squash them into one clean commit before pushing. |
| 🔬 | Experimental work | You tried something locally and want to cleanly undo all of it. |
| 📦 | Wrong files staged | You committed files that shouldn't be there and need to restart. |
| 🔁 | Prepare for rebase | You need to clean up local history before merging into main. |
| 🧹 | Start a feature over | You've realized the approach is wrong and want a clean slate from a known good commit. |

Add a subtle banner below the grid:
> "In all of these cases, the solution is the same: move HEAD to a previous commit. What changes is **how much Git resets alongside HEAD**."

Style the banner with a left border in `--cyan` and italic text in `--text-muted`.

---

### C. HEAD Explained — Animated Pointer Diagram

This is the most important concept in the entire section. Build it as a standalone card with generous padding and a heading: **"HEAD Is Not a Commit — It's a Pointer"**.

**Diagram structure:**

Render a horizontal commit timeline as styled nodes connected by lines:

```
● ──── ● ──── ● ──── ●
A      B      C      D
                     ↑
                    HEAD
```

Each commit node is a circle with a letter label (A, B, C, D) and a short fake SHA below it in `--yellow` mono font (e.g. `a1b2c3`). The connection lines between commits are thin, `--border`-colored horizontal lines. The HEAD pointer is a distinct colored arrow (use `--cyan`) with the label "HEAD" that visually points up at the active commit node.

**Animation:**

Add a button: `"← Move HEAD to B"`. When clicked:
- The cyan HEAD arrow slides left with a CSS `transition` from D to B
- Commits C and D get a dimmed/faded style (opacity 0.35, no border glow)
- A description card appears below the diagram:

> "After `git reset <commit-B>`, HEAD now points to B. Commits C and D are no longer in your active history — but **what happens to their changes** depends on the reset mode."

Add a `"↺ Reset"` button to restore the initial state.

Use only CSS transitions on `transform: translateX()` and `opacity` for the animation. No external libraries.

---

### D. Commit History Explained — Three-Area Strip

A slim, full-width horizontal strip (3 equal columns) reinforcing the three Git layers:

```
💾 Repository  →  📋 Staging Area  →  📁 Working Directory
```

Each column is a labeled card. Below the strip, a caption:

> "`git reset` always moves HEAD in the Repository. The reset **mode** decides what happens to Staging and Working Directory."

Use `gr-` prefixed classes for this strip (see namespace rules below).

---

### E. git log — Command Explainer Card

A standalone card with heading "Reading History Before You Reset".

Left half: syntax-highlighted code block showing sample `git log` output:

```
commit f7a3d91  ← SHA (yellow)
Author: Alex Dev <alex@example.com>
Date:   Mon Jul 7 10:22:00 2026

    Add login page UI

commit b2c8e14
Author: Alex Dev <alex@example.com>
Date:   Sun Jul 6 18:45:00 2026

    Fix navbar overflow bug
```

Right half: a 4-row explanation list with icons:

- 🔑 **SHA** — The unique ID of every commit. You need this for `git reset <commit>`.
- ✍️ **Message** — What was changed. Helps you identify the target commit.
- 👤 **Author** — Who made the commit.
- 📅 **Date** — When it was committed. Useful for time-based orientation.

Add a callout banner: `"💡 Copy the first 7 characters of the SHA — that's all Git needs for reset."`

Include a copy button:
```html
<button class="copy-btn" data-copy="git log">⧉ Copy</button>
```

---

### F. Reset Mode Explained — Concept Intro Banner

Before showing individual reset modes, build a full-width banner card:

**Heading:** "Reset Always Moves HEAD — The Mode Controls Everything Else"

Render three rows, one per mode, each as a pill-style row:

```
--soft   →  Moves HEAD only
--mixed  →  Moves HEAD + clears Staging Area
--hard   →  Moves HEAD + clears Staging Area + clears Working Directory
```

Use colored left-border accents: soft → `--green`, mixed → `--yellow`, hard → `--red`.

---

### G. Soft Reset — Explainer + Visualization

Build a styled card with a `--green` glowing top border and heading "Soft Reset".

**Sub-sections inside this card:**

**1. What moves?** — A 3-row layer checklist:
- ✅ Repository — HEAD moves to target commit
- ✅ Staging Area — Previous commit's changes appear here (staged, ready to commit again)
- ❌ Working Directory — Completely untouched

**2. Animated Before/After Diagram:**

Show a two-panel layout ("Before" / "After") with the 3 Git layers in each:

**Before `git reset --soft B`:**
```
Repository:        A → B → C → D  (HEAD → D)
Staging Area:      (empty)
Working Directory: (clean)
```

**After `git reset --soft B`:**
```
Repository:        A → B  (HEAD → B)
Staging Area:      Changes from C + D  ← highlighted green
Working Directory: (unchanged)
```

Animate the transition: clicking a `"Run git reset --soft B"` button transitions the Repository diagram, fades C and D, and populates the Staging Area panel with a pulsing green-bordered file list.

**3. When to use it — Real Scenario:**
> "You made 3 small commits but want to combine them into one. Soft reset to the commit before your first small commit. All changes land in Staging — commit once with a single clean message."

**4. Copy button:**
```html
<button class="copy-btn" data-copy="git reset --soft <commit>">⧉ Copy</button>
```

---

### H. Mixed Reset — Explainer + Visualization

A styled card with a `--yellow` glowing top border and heading "Mixed Reset (Git's Default)".

**Sub-sections:**

**1. What moves?** — 3-row checklist:
- ✅ Repository — HEAD moves to target commit
- ✅ Staging Area — Cleared. Previous changes become **unstaged modified** files.
- ❌ Working Directory — Untouched. Your edits still exist.

**2. Key insight banner:**
> "Mixed reset is `git reset` with no flag. It clears the staging area but keeps your work in the Working Directory — you decide what to re-stage."

**3. Animated Before/After Diagram** (same 3-layer structure as Soft):

**Before:**
```
Repository:        A → B → C → D  (HEAD → D)
Staging Area:      app.js (staged)
Working Directory: (modified files)
```

**After `git reset --mixed B`:**
```
Repository:        A → B  (HEAD → B)
Staging Area:      (empty) ← highlighted yellow/amber
Working Directory: app.js (modified) ← highlighted yellow/amber
```

Animate: clicking `"Run git reset --mixed B"` transitions the Repository, wipes the Staging panel, and populates the Working Directory panel with the same file tagged "Modified".

**4. When to use it:**
> "You staged the wrong file or staged too much. Mixed reset clears the staging area but leaves your actual code changes safe in the Working Directory."

**5. Copy button:**
```html
<button class="copy-btn" data-copy="git reset --mixed <commit>">⧉ Copy</button>
```

---

### I. Hard Reset — Explainer + Visualization

A styled card with a `--red` glowing top border and heading "Hard Reset".

**Sub-sections:**

**1. What moves?** — 3-row checklist:
- ✅ Repository — HEAD moves to target commit
- ✅ Staging Area — Completely wiped
- ✅ Working Directory — Completely wiped. **Your code changes are gone.**

**2. Danger banner** (red/amber alert card):
> "⚠️ Hard reset is the only reset mode that can delete unrecoverable work. If you have uncommitted changes in your Working Directory, they will be gone permanently."

**3. Animated Before/After Diagram:**

**Before:**
```
Repository:        A → B → C → D  (HEAD → D)
Staging Area:      auth.js (staged)
Working Directory: login.js (modified)
```

**After `git reset --hard B`:**
```
Repository:        A → B  (HEAD → B)
Staging Area:      (empty) ← highlighted red
Working Directory: (empty) ← highlighted red
```

Animate: clicking `"Run git reset --hard B"` transitions the Repository and wipes both panels with a red flash animation.

**4. When to use it:**
> "You experimented locally and want to completely discard everything. The project should be identical to commit B — no traces of your experiment."

**5. Copy button:**
```html
<button class="copy-btn" data-copy="git reset --hard <commit>">⧉ Copy</button>
```

---

### J. Interactive Reset Mode Simulator — THE HIGHLIGHT OF THE SECTION

Build a full-width, premium interactive simulator card with heading **"Reset Mode Simulator — See Every Layer Change"**.

**Layout:**

Top: Three toggle buttons: `Soft` / `Mixed` / `Hard`

Middle: A visual diagram showing all three Git layers as stacked labeled panels:

```
┌─────────────────────────────┐
│  💾 Repository               │
│  A → B → C → D  (HEAD → D)  │
└─────────────────────────────┘
          ↓
┌─────────────────────────────┐
│  📋 Staging Area             │
│  app.js, auth.js (staged)   │
└─────────────────────────────┘
          ↓
┌─────────────────────────────┐
│  📁 Working Directory        │
│  login.js (modified)        │
└─────────────────────────────┘
```

Bottom: A description panel explaining what the selected mode does.

**Behavior when each button is clicked:**

**Soft:**
- Repository panel: commits C and D dim, HEAD arrow moves to B (animated slide)
- Staging Area panel: glows green, content updates to "Changes from C + D (now staged)"
- Working Directory panel: no change, stays grey/neutral
- Description: "Soft reset moved HEAD to B. Changes from C and D are now staged — ready to be committed again."

**Mixed:**
- Repository panel: same as Soft
- Staging Area panel: flashes yellow then shows "(empty)"
- Working Directory panel: glows yellow, content updates to "app.js, auth.js, login.js (all modified)"
- Description: "Mixed reset moved HEAD to B and cleared Staging. All changes are now in the Working Directory as modified files."

**Hard:**
- Repository panel: same as Soft
- Staging Area panel: flashes red then shows "(empty)"
- Working Directory panel: flashes red then shows "(empty — all changes deleted)"
- Description: "Hard reset moved HEAD to B and wiped everything. The project is now identical to commit B."

Add a `"↺ Reset All"` button to restore the initial state.

All transitions use CSS class toggling + `setTimeout`. No inline style mutations from JS.

---

### K. Force Push — Explainer Card

A standalone card with heading "Why Normal Push Fails After Reset — and What Force Push Does".

**Part 1 — The Problem:**

A side-by-side diagram showing two timelines:

```
Local:   A → B  (HEAD)
Remote:  A → B → C → D  (origin/main)
```

Caption: "After a reset, your local history is *behind* the remote. Git refuses to push because it would delete remote commits — it protects you."

Add a terminal-style error block:
```
$ git push origin main
! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'origin'
hint: Updates were rejected because the tip of your current branch is behind
```

**Part 2 — Force Push:**

```
$ git push origin main --force
```

Caption: "Force push tells Git: 'I know what I'm doing — overwrite remote history with my local history.'"

After force push diagram:
```
Local:   A → B  (HEAD)
Remote:  A → B  (overwritten — C and D are gone from GitHub)
```

Include a copy button:
```html
<button class="copy-btn" data-copy="git push origin main --force">⧉ Copy</button>
```

---

### L. Force Push — Team Collaboration Warning

A full-width danger card with `--red` top border and heading "⚠️ Force Push is Dangerous on Shared Branches".

Build a horizontal timeline animation showing 3 actors: **Developer A**, **Developer B**, and **GitHub**.

Steps (render as a vertical numbered timeline):

1. 🧑‍💻 Developer A and Developer B both pull from `main`. Timeline: `A → B → C → D`
2. 🔄 Developer B makes a new commit E. Timeline: `A → B → C → D → E`
3. ⚡ Developer A does `git reset --hard B` then `git push --force`. GitHub now shows: `A → B`
4. 😱 Developer B tries to push commit E. Git rejects — their history no longer matches remote.
5. 💥 Developer B's entire history is now "orphaned" — they must manually resolve the conflict or lose their work.

Below the timeline, add a "Safe Alternatives" info card with two rows:
- ✅ `git revert <commit>` — Safely undoes a commit by creating a **new** commit. History is never rewritten. Safe for shared branches.
- ✅ Only use `--force` on **personal feature branches** that no one else has pulled.

---

### M. Comparison Table — All Three Reset Modes

A premium full-width table card with heading "Soft vs Mixed vs Hard — At a Glance".

Table columns: `Mode` / `Moves HEAD` / `Clears Staging Area` / `Clears Working Directory` / `Work Lost?` / `Common Use Case` / `Danger Level`

| Mode | Moves HEAD | Clears Staging | Clears Working Directory | Work Lost? | Common Use Case | Danger Level |
|---|---|---|---|---|---|---|
| `--soft` | ✅ | ❌ | ❌ | Never | Squash commits, rewrite last commit message | 🟢 Safe |
| `--mixed` | ✅ | ✅ | ❌ | Never | Unstage wrong files, reorganize staged changes | 🟡 Low Risk |
| `--hard` | ✅ | ✅ | ✅ | Yes (uncommitted work) | Discard all local experimentation | 🔴 Dangerous |

Style the danger level cells with colored badge pills: green / yellow / red.

---

### N. Real-World Scenario Cards — When to Use Each Mode

A 4-card grid (responsive, `repeat(auto-fill, minmax(260px, 1fr))`). Each card has a colored left border matching the mode's danger color:

**Scenario 1 — Wrong commit message (--soft)**
- 🔴 Problem: "Committed with message 'asdf'. Embarrassing."
- 💡 Solution: `git reset --soft HEAD~1` → edit message → commit again
- 🟢 Risk: Zero — nothing is lost

**Scenario 2 — Undo a mistaken git add (--mixed)**
- 🔴 Problem: "Staged the wrong files before committing."
- 💡 Solution: `git reset --mixed HEAD` clears staging; files remain modified
- 🟡 Risk: Low — all code stays in Working Directory

**Scenario 3 — Discard a failed experiment (--hard)**
- 🔴 Problem: "Spent 2 hours on an approach. It's wrong. Start over."
- 💡 Solution: `git reset --hard <last-good-commit>` — project reverts completely
- 🔴 Risk: Irreversible if you had uncommitted work

**Scenario 4 — Squash before merging (--soft + --force)**
- 🔴 Problem: "Made 6 small commits on a feature branch. Want 1 clean commit for the PR."
- 💡 Solution: `git reset --soft <commit-before-feature>` → single commit → `git push --force` (safe on personal branch)
- 🟡 Risk: Low — only on personal feature branch

---

### O. Common Mistakes — Warning Cards Grid

Amber warning cards (left border `--yellow`, background tinted) with ⚠️ icon. Six cards in a responsive grid:

1. **"HEAD is a commit"** — HEAD is a pointer that points to a commit. They are not the same thing.
2. **"Hard reset deletes Git history forever"** — Hard reset moves HEAD. The commits still exist via `git reflog` for ~90 days. What's lost is uncommitted work.
3. **"Reset automatically updates GitHub"** — Reset only changes your local repository. GitHub is unaffected until you push (with `--force`).
4. **"Force push is always dangerous"** — Force push is safe on private feature branches no one else has pulled. It is dangerous on shared branches like `main`.
5. **"Mixed reset = losing my code"** — Mixed reset never touches the Working Directory. All your code is safe — it just moves out of staging.
6. **"`git restore` and `git reset` do the same thing"** — `git restore --staged` unstages a file. `git reset` moves HEAD. Completely different operations with different scopes.

---

### P. Prediction Exercises — Interactive Quiz Cards

Build 4 collapsible "predict the outcome" cards. Each shows a starting Git state, a command, and reveals the correct answer with a brief explanation when the user submits or clicks "Reveal".

Use multiple-choice buttons (3–4 options). Correct answer turns green; wrong answer turns red and highlights the correct one.

**Exercise 1:**
```
Starting state:
  Repository:        A → B → C → D  (HEAD → D)
  Staging Area:      (empty)
  Working Directory: (clean)

Command: git reset --soft B
```
Question: "Where do the changes from C and D end up?"
Options: a) Deleted permanently / b) Staging Area ✅ / c) Working Directory / d) Still in Repository as commits

**Exercise 2:**
```
Starting state:
  Repository:        A → B → C  (HEAD → C)
  Staging Area:      style.css (staged)
  Working Directory: style.css, app.js (modified)

Command: git reset --mixed A
```
Question: "What is in the Staging Area after the reset?"
Options: a) style.css / b) app.js / c) Nothing ✅ / d) All files

**Exercise 3:**
```
Starting state:
  Repository:        A → B → C  (HEAD → C)
  Staging Area:      login.js (staged)
  Working Directory: login.js (modified), README.md (modified)

Command: git reset --hard A
```
Question: "What happens to login.js and README.md?"
Options: a) Both move to Staging / b) Both stay in Working Directory / c) Both are permanently deleted ✅ / d) They are committed to A

**Exercise 4 (force push):**
```
Local:   A → B  (HEAD, after hard reset)
Remote:  A → B → C → D
```
Question: "You run `git push origin main`. What happens?"
Options: a) Push succeeds normally / b) Git rejects the push ✅ / c) C and D are automatically deleted from remote / d) Local pulls C and D automatically

---

### Q. Mini Quiz — Conceptual Questions

A styled quiz card with heading "Test Your Understanding". Five questions, rendered one at a time with Next button, using multiple-choice pills.

Questions:
1. "What is HEAD?" → A pointer to the current commit ✅
2. "Which reset mode affects the Working Directory?" → `--hard` ✅
3. "Which reset mode is Git's default when no flag is given?" → `--mixed` ✅
4. "Why does `git push` fail after a local reset?" → Local history is behind remote history ✅
5. "When is `git push --force` safe to use?" → On a personal feature branch no one else has pulled ✅

Show score at the end with a congratulations message if ≥4/5 correct.

---

### R. Commands Reference Grid

A card grid (`repeat(auto-fill, minmax(300px, 1fr))`) — one card per command. Each card has: category badge, command in mono font, description, syntax-highlighted code block, and copy button.

| Command | Category | Description |
|---|---|---|
| `git log` | Inspect | View commit history, SHAs, authors, and messages |
| `git log --oneline` | Inspect | Compact one-line-per-commit view — great for reset targeting |
| `git reset --soft <commit>` | Safe Reset | Move HEAD only. Changes appear in Staging Area. |
| `git reset --mixed <commit>` | Safe Reset | Move HEAD and clear Staging. Changes stay in Working Directory. (Default) |
| `git reset --hard <commit>` | Destructive Reset | Move HEAD and wipe Staging + Working Directory. Uncommitted work is lost. |
| `git reset HEAD~1` | Safe Reset | Shorthand to undo exactly one commit back (mixed by default) |
| `git push origin main --force` | Remote | Overwrite remote history with local history. Use with caution. |
| `git reflog` | Recovery | View all HEAD movements. Recover commits after a hard reset for ~90 days. |

Category badge colors: Inspect → `--blue`, Safe Reset → `--green`, Destructive Reset → `--red`, Remote → `--purple`, Recovery → `--cyan`

---

## NAMESPACE & ANTI-CONFLICT RULES — CRITICAL

⚠️ The existing page already uses these global classes — do **NOT** reuse them:
`.cmd-card`, `.filter-btn`, `.commands-grid`, `#cmd-search`, `#commands-grid`, `#no-results`, `.lifecycle-card`, `.lifecycle-grid`, `.lc-icon-wrap`, `.lc-badge`

The Git Stash section uses `stash-` prefixed classes — do **NOT** reuse.
The Git Clean & Restore section uses `gc-` prefixed classes — do **NOT** reuse.

All new classes in this section **must be prefixed with `gr-`** (e.g. `.gr-card`, `.gr-commit-node`, `.gr-simulator-btn`, `.gr-mode-panel`, `.gr-quiz-option`).

All new CSS selectors must be scoped inside `#git-reset` — never write a bare `.card`, `.commit-node`, or `.simulator` rule.

All new JavaScript must scope every query to the section element:
```javascript
const grSection = document.getElementById('git-reset');
const grSimBtns = grSection.querySelectorAll('.gr-simulator-btn');
```
Never use unscoped `document.querySelectorAll('.gr-*')`.

**Only these shared/global patterns are allowed:**
- `class="reveal"` — existing IntersectionObserver picks it up automatically
- `<button class="copy-btn" data-copy="...">⧉ Copy</button>` — existing global clipboard handler, safe to reuse as-is

---

## NAVBAR & FOOTER INTEGRATION

Navbar `<li>` to add (after the Clean & Restore link):
```html
<li><a href="#git-reset" class="nav-link">Git Reset</a></li>
```

Footer "Learn" column link:
```html
<li><a href="#git-reset">Git Reset</a></li>
```

---

## QUALITY REQUIREMENTS

- Zero external libraries or CDN links
- Pure CSS animations only (no GSAP, no anime.js)
- Mobile-responsive: all grids use `repeat(auto-fill, minmax(..., 1fr))`
- Light theme compatible — test all new colors against `[data-theme="light"]`
- All interactive elements have `aria-label` attributes
- Consistent font usage: Inter for body text, JetBrains Mono for all code, SHAs, and commands
- Premium feel: glow effects on hover matching `--shadow-glow`, smooth transitions, no jarring instant state changes
- All demo animations use CSS class toggling + `setTimeout` / `requestAnimationFrame` — never inline style mutation from JS
- The HEAD pointer animation (Part C) must use `transform: translateX()` and `transition` only — no WAAPI, no GSAP
- The simulator (Part J) must reset cleanly when switching between modes without visual artifacts
- Quiz answers must not be pre-selected on load — the student must interact before seeing any result

---

## OUTPUT FORMAT

Return three separate labeled code blocks:

**[HTML]** — The full `<section id="git-reset">` block to insert after `#git-clean-restore`'s closing `</section>`, plus the navbar `<li>` and footer `<li>` snippets

**[CSS]** — All new `gr-`prefixed styles, scoped to `#git-reset`, to append to `style.css`

**[JS]** — All new interactive logic (HEAD animation, reset simulator, prediction exercises, mini quiz), scoped to `#git-reset`, to add inside the existing `DOMContentLoaded` listener in `script.js`

Generate the three code blocks now. Make the section the most visually impressive and conceptually thorough section in the entire website.

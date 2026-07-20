# Google Antigravity Prompt — Add Git Stash to the Lifecycle Section

---

## PASTE THIS INTO GOOGLE ANTIGRAVITY:

---

I have a Git learning website. I need you to **enhance the existing Lifecycle section** to visually teach how Git Stash fits into the normal Git workflow. Do NOT rebuild the section from scratch — extend what exists.

---

## EXISTING LIFECYCLE SECTION (current HTML)

```html
<section id="lifecycle" class="section">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">Visual Overview</span>
      <h2 class="section-title">Git <span class="gradient-text">Lifecycle</span></h2>
      <p class="section-desc">Understand how changes move from your editor to the world.</p>
    </div>
    <div class="lifecycle-grid">
      <div class="lifecycle-card reveal" data-stage="1">
        <div class="lc-icon-wrap" style="--clr:#10b981">🗂️</div>
        <div class="lc-content">
          <h3>Working Directory</h3>
          <p>Your local files where you edit code. Changes here are <em>untracked</em>.</p>
        </div>
        <div class="lc-badge" style="--clr:#10b981">Untracked</div>
      </div>
      <div class="lifecycle-arrow reveal" aria-hidden="true">
        <span class="arrow-cmd">git add</span>
        <div class="arrow-line"><div class="arrow-head">→</div></div>
      </div>
      <div class="lifecycle-card reveal" data-stage="2">
        <div class="lc-icon-wrap" style="--clr:#3b82f6">📋</div>
        <div class="lc-content">
          <h3>Staging Area</h3>
          <p>Files added to the index. Ready to be committed as the next snapshot.</p>
        </div>
        <div class="lc-badge" style="--clr:#3b82f6">Staged</div>
      </div>
      <div class="lifecycle-arrow reveal" aria-hidden="true">
        <span class="arrow-cmd">git commit</span>
        <div class="arrow-line"><div class="arrow-head">→</div></div>
      </div>
      <div class="lifecycle-card reveal" data-stage="3">
        <div class="lc-icon-wrap" style="--clr:#8b5cf6">💾</div>
        <div class="lc-content">
          <h3>Local Repository</h3>
          <p>The <code>.git</code> folder. A complete history of every commit you've made.</p>
        </div>
        <div class="lc-badge" style="--clr:#8b5cf6">Committed</div>
      </div>
      <div class="lifecycle-arrow reveal" aria-hidden="true">
        <span class="arrow-cmd">git push</span>
        <div class="arrow-line"><div class="arrow-head">→</div></div>
      </div>
      <div class="lifecycle-card reveal" data-stage="4">
        <div class="lc-icon-wrap" style="--clr:#00f5ff">☁️</div>
        <div class="lc-content">
          <h3>Remote Repository</h3>
          <p>GitHub, GitLab, etc. The shared, cloud-hosted version of your project.</p>
        </div>
        <div class="lc-badge" style="--clr:#00f5ff">Remote</div>
      </div>
    </div>
  </div>
</section>
```

---

## EXISTING CSS DESIGN SYSTEM

```css
/* CSS Variables already defined globally */
--bg-main: #0a0c10;
--bg-card: #0d1117;
--bg-card-hover: #161b22;
--cyan: #00f5ff;
--blue: #3b82f6;
--purple: #8b5cf6;
--pink: #ec4899;
--green: #10b981;
--yellow: #f59e0b;
--text-main: #e6edf3;
--text-muted: #8b949e;
--border: rgba(48, 54, 61, 0.8);
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--shadow-lg: 0 10px 25px -5px rgba(0,0,0,0.6);
--shadow-glow: 0 0 20px rgba(0, 245, 255, 0.2);
```

Existing lifecycle-specific CSS (already active):
- `.lifecycle-grid` — `display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;`
- `.lifecycle-card` — `background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; width: 240px; text-align: center;`
- `.lifecycle-card:hover` — `transform: translateY(-8px);`
- `.lc-icon-wrap` — 60px circle with `--clr` CSS variable for accent color
- `.lc-badge` — mono font pill at bottom of each card, colored by `--clr`
- `.lifecycle-arrow` — flex column with `.arrow-cmd` (code pill) and `.arrow-line` + `.arrow-head` (animated with `arrowPulse` keyframe)
- `.arrow-head` animation: pulses right and turns `var(--cyan)` color

---

## WHAT TO BUILD

Add **two new elements** below the existing `.lifecycle-grid`, still inside the same `<section id="lifecycle">` container. Keep the existing grid untouched.

---

### ELEMENT 1 — Stash Side-Pocket Diagram

A visual that shows the Stash as a "side escape" from the main flow.

**Layout concept:**

```
┌─────────────────────────────────── Main Flow (existing, untouched) ───────────────────────────────────┐
│   🗂️ Working Dir  →(git add)→  📋 Staging  →(git commit)→  💾 Local Repo  →(git push)→  ☁️ Remote   │
└───────────────────────────────────────────────────────────────────────────────────────────────────────┘
         │                    │
    git stash             git stash
         │                    │
         ▼                    ▼
┌─────────────────────────────────────┐
│  📦  Stash Stack  (temporary shelf) │
│  stash@{0}  stash@{1}  stash@{2}    │
└─────────────────────────────────────┘
         │                    │
   git stash pop         git stash apply
         │                    │
         ▲                    ▲
         └────────────────────┘
```

**Build it as:**

A centered wrapper div with class `lc-stash-zone` placed directly after `.lifecycle-grid`.

Inside it:

**A) Two vertical connector lines** — one drops from "Working Directory" position, one drops from "Staging Area" position. Use absolute/relative positioning with CSS. Style them as dashed lines (`border-left: 2px dashed var(--yellow)`) to visually distinguish them from the main flow (which is solid). Each line has a small arrow at the bottom (▼).

**B) The Stash Card** — centered below, spanning both connectors. Style it differently from the main lifecycle cards to communicate "this is temporary, not permanent":
- Dashed border: `border: 2px dashed var(--yellow)` 
- Background: `rgba(245, 158, 11, 0.05)` (subtle yellow tint)
- Width: ~520px (wider to show the stack concept)
- Icon: 📦 with `--clr: #f59e0b`
- Title: "Stash Stack"
- Description: "Temporary shelf for unfinished work. Not part of commit history."
- Badge: "Temporary" colored with `--yellow`
- Inside the card, show 3 mini stash entry pills: `stash@{0}`, `stash@{1}`, `stash@{2}` — styled as small horizontal pills in a row, each with a slightly transparent background
- A subtle label on the card: "⚠️ Not a substitute for commits or branches"

**C) Two return arrows** going back UP from the Stash card, also dashed, each labeled:
- Left return: `git stash pop` (restores + deletes)
- Right return: `git stash apply` (restores only)

Both return arrows end with ▲ pointing up toward Working Directory.

**D) A small legend row** below the Stash card:
```
━━━ Normal flow     - - - Stash escape (temporary)
```

---

### ELEMENT 2 — Interactive "What If?" Scenario Button

A centered button below the diagram labeled: `🚨 Simulate: Urgent Interrupt!`

**Initial state:**
Button is visible. All lifecycle cards appear in their normal state.

**When the user clicks the button:**

Trigger a multi-step animation using `setTimeout` chains:

**Step 1 (0ms):** 
- Working Directory card gets a red pulsing border (`box-shadow: 0 0 0 3px var(--red)`)
- A floating label appears above it: "🔴 Unfinished work!"
- Button text changes to "▶ Playing scenario..."
- Button becomes disabled

**Step 2 (800ms):**
- An animated yellow arrow appears flowing DOWN from Working Directory toward the Stash card
- The arrow animates from top to bottom (CSS `@keyframes` with `transform: translateY` from -20px to 0, opacity 0→1)
- Label appears on the arrow: `git stash`

**Step 3 (1800ms):**
- The Working Directory card transforms: red border fades out, green border fades in (`box-shadow: 0 0 0 3px var(--green)`)
- A floating label replaces the red one: "✅ Clean!"
- The Stash card pulses once (scale 1 → 1.05 → 1)
- `stash@{0}` pill inside the Stash card highlights with a yellow glow

**Step 4 (2800ms):**
- A floating label appears: "→ Now you can switch branches safely"
- The Staging Area and Local Repo cards briefly pulse cyan to show the main flow is now available

**Step 5 (4000ms):**
- A return arrow animates UP from Stash to Working Directory
- Label: `git stash pop`
- Working Directory returns to its original (neutral) state
- Stash card's `stash@{0}` pill fades out (deleted)

**Step 6 (5200ms):**
- All states reset to default
- Button text changes to "🔄 Replay scenario"
- Button re-enables

**Important:** All animation state changes must be done with CSS class toggling only. Add CSS classes like `.lc-dirty`, `.lc-clean`, `.lc-stash-active` that apply the visual changes. The JS only adds/removes these classes. Never use inline style manipulation in JS.

---

## NAMESPACE RULES — CRITICAL

⚠️ All new CSS class names MUST be prefixed with `lc-stash-` to avoid colliding with existing styles.

Do NOT reuse or override: `.lifecycle-card`, `.lifecycle-arrow`, `.lifecycle-grid`, `.lc-icon-wrap`, `.lc-badge`, `.arrow-cmd`, `.arrow-line`, `.arrow-head`

Allowed: Adding new classes like `.lc-stash-zone`, `.lc-stash-card`, `.lc-stash-pill`, `.lc-stash-connector`, `.lc-stash-return`, `.lc-stash-btn`, `.lc-dirty`, `.lc-clean`, `.lc-stash-active`

All new JavaScript must be scoped:
```javascript
const lifecycleSection = document.getElementById('lifecycle');
const stashBtn = lifecycleSection.querySelector('.lc-stash-btn');
// etc.
```

---

## OUTPUT FORMAT

Provide three separate labeled code blocks:

**[HTML]** — The two new elements to insert immediately after the closing `</div>` of `.lifecycle-grid`, still inside `.container`

**[CSS]** — All new styles, every selector scoped inside `#lifecycle` or using `.lc-stash-*` prefixed classes

**[JS]** — The scenario animation, placed inside the existing `DOMContentLoaded` listener, fully scoped to `#lifecycle`

---

## QUALITY REQUIREMENTS

- Zero external libraries
- Pure CSS animations only
- Mobile responsive: on screens under 768px, the dashed connector lines and stash card stack vertically with simplified layout
- Light theme compatible using `[data-theme="light"]` overrides
- All interactive elements have `aria-label`
- The Stash card must look visually distinct from the main 4 cards — different border style (dashed), different background tint — to communicate "this is temporary side storage, not a permanent step"
- The overall effect when seen by a student: they immediately understand that Stash is an escape from the main flow, not a step in it

---
name: site-eval
description: Comprehensive website evaluation — spacing, contrast, interactions, responsiveness. Run after any visual/structural change.
---

# Site Evaluation Skill

## When to Use
Run after any visual or structural change to verify quality. Invoke with `/site-eval` or when asked to "evaluate", "audit", or "check quality".

## Prerequisites
- Chrome DevTools MCP connected
- Dev server running (`npm run dev`)
- Both pages accessible: `/` and `/company`

---

## Phase 1: Extract Computed Styles

Emulate two viewports and extract actual rendered values:

### Mobile (iPhone 14)
```
mcp: emulate viewport "390x844x3,mobile,touch"
mcp: navigate to http://localhost:3000
mcp: evaluate_script — run CSS extraction script below
mcp: take full-page screenshot
```

### Desktop
```
mcp: emulate viewport "1440x900x2"
mcp: navigate to http://localhost:3000
mcp: evaluate_script — run CSS extraction script below
mcp: take full-page screenshot
```

### CSS Extraction Script
```javascript
() => {
  const main = document.querySelector('main');
  const nav = document.querySelector('nav');
  const footer = document.querySelector('footer');
  const sections = main.querySelectorAll('section');
  const sectionNames = ['Hero', 'AgentBuilder', 'Control', 'Timeline', 'CTA'];

  const extract = (el) => {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      height: Math.round(rect.height),
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
    };
  };

  const sectionData = Array.from(sections).map((s, i) => {
    const base = extract(s);
    const h2 = s.querySelector('h2');
    const h2Cs = h2 ? getComputedStyle(h2) : null;
    return {
      name: sectionNames[i] || `Section${i}`,
      ...base,
      h2FontSize: h2Cs?.fontSize,
      h2MarginBottom: h2Cs?.marginBottom,
      h2LineHeight: h2Cs?.lineHeight,
    };
  });

  // Extract all text elements for contrast/size check
  const textIssues = [];
  main.querySelectorAll('p, span, a, h1, h2, h3').forEach(el => {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const fontSize = parseFloat(cs.fontSize);
    const isHidden = el.closest('[aria-hidden="true"]');
    if (fontSize < 12 && !isHidden) {
      textIssues.push({
        tag: el.tagName,
        text: el.textContent?.substring(0, 30),
        fontSize: cs.fontSize,
        location: 'visible content',
      });
    }
  });

  // Check touch targets
  const tapIssues = [];
  main.querySelectorAll('a[href], button').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    if (rect.height < 44 || rect.width < 44) {
      tapIssues.push({
        tag: el.tagName,
        text: el.textContent?.substring(0, 30),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  });

  return {
    viewport: window.innerWidth,
    nav: extract(nav),
    sections: sectionData,
    footer: extract(footer),
    textIssues,
    tapIssues,
  };
}
```

---

## Phase 2: Audit Against Standards

### Spacing Scale (Tailwind 4px base)
All padding/margin values must be multiples of 4px. Acceptable values:
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112, 128`

**Section vertical padding tiers:**
| Tier | Mobile | Desktop | Usage |
|------|--------|---------|-------|
| Standard | 48px (`py-12`) | 80px (`py-20`) | Content sections |
| Accent | 64px (`py-16`) | 96px (`py-24`) | CTA / emphasis |
| Compact | 40px (`py-10`) | 64px (`py-16`) | Footer |

**Heading spacing:**
- h2 `margin-bottom`: 32-40px (`mb-8` or `mb-10`)
- h3 `margin-bottom`: 12px (`mb-3`)
- Section label to h2: 20px (`mt-5`)

**Horizontal padding:**
- All sections: 24px (`px-6`)
- Card internal: 16px mobile / 24px desktop (`px-4 md:px-6`)

**Container max-width:**
- Content sections: 1200px (`max-w-[1200px]`)
- Hero heading: 800px (`max-w-[800px]`)
- CTA heading: 650px (`max-w-[650px]`)

### Typography Scale
| Element | Mobile | Desktop |
|---------|--------|---------|
| h1 | 28px / weight 400 | 60px / weight 300 |
| h2 (section) | 24px / weight 400 | 44px / weight 300 |
| h2 (CTA) | 28px / weight 400 | 52px / weight 300 |
| h3 (card) | 24px / weight 400 | 24px / weight 400 |
| Body | 15-16px / weight 400 | 15px / weight 400 |
| Label | 12px / weight 400 | 12px / weight 400 |
| Minimum visible | 12px | 12px |

### Color Contrast (WCAG AA)
Background: `#0f0e0d` (page) or `#191a1a` (cards)

| Text class | Opacity | Contrast on #0f0e0d | Contrast on #191a1a | Pass? |
|-----------|---------|--------------------|--------------------|-------|
| text-white/[0.87] | 87% | 13.6:1 | 11.2:1 | YES |
| text-white/[0.65] | 65% | 10.2:1 | 8.3:1 | YES |
| text-white/[0.55] | 55% | 8.6:1 | 7.0:1 | YES |
| text-white/[0.50] | 50% | 7.8:1 | 6.4:1 | YES |
| text-white/[0.45] | 45% | 7.0:1 | 5.8:1 | YES (large) |
| text-white/[0.40] | 40% | 6.3:1 | 5.1:1 | FAILS normal |

**Rule:** No `text-white/[0.45]` or lower on text below 18px (unless inside `aria-hidden`).

### Touch Targets
- All `<a>` and `<button>` elements: minimum 44x44px effective area
- Includes padding — a 15px text link with `py-1.5 px-2` = ~35px height. Needs adjustment.

### Responsiveness
- `document.documentElement.scrollWidth === window.innerWidth` (no horizontal overflow)
- All images have `w-full` or responsive constraints
- No `position: fixed` elements wider than viewport

---

## Phase 3: Visual Rhythm Check

Take section-by-section viewport screenshots at mobile:
```javascript
// For each section, scroll to it and screenshot
const sections = document.querySelectorAll('main section');
sections[i].scrollIntoView({ behavior: 'instant' });
// mcp: take_screenshot
```

Visual checks:
- [ ] Each section starts with consistent top padding
- [ ] Heading → content gaps feel even across sections
- [ ] No section feels cramped relative to its neighbors
- [ ] No section has excessive empty space
- [ ] Cards within a section have uniform padding
- [ ] Footer doesn't blend into CTA section

---

## Phase 4: Lighthouse Gate

Run on both pages, both devices:
```
mcp: navigate to http://localhost:3000
mcp: lighthouse_audit device=desktop
mcp: lighthouse_audit device=mobile
mcp: navigate to http://localhost:3000/company
mcp: lighthouse_audit device=desktop
mcp: lighthouse_audit device=mobile
```

**Required scores:** Accessibility 100, Best Practices 100, SEO 100
**Any failure is a defect.**

---

## Phase 5: Report & Iterate

### Defect Classification
| Tier | Definition | Action |
|------|-----------|--------|
| **Critical** | Lighthouse failure, horizontal overflow, text below 12px visible, touch target under 44px | Fix immediately |
| **Major** | Spacing off-scale, heading gap inconsistent, contrast below threshold | Fix in current pass |
| **Minor** | Visual rhythm slightly off, line-height could be tighter | Fix if time permits |

### Iteration Loop
1. Fix all critical defects
2. Re-run phases 1-4
3. Fix all major defects
4. Re-run phases 1-4
5. Report final state

**Max 5 iterations.** If still failing after 5, escalate to user with detailed report.

### Final Report Format
```markdown
## Evaluation Report — [date]

### Scores
| Page | Device | A11y | BP | SEO |
|------|--------|------|----|-----|

### Spacing Compliance
| Section | Mobile Padding | Desktop Padding | On-scale? |
|---------|---------------|----------------|-----------|

### Defects Found: X (Y fixed, Z remaining)

### Before/After Screenshots
[mobile full-page before] → [mobile full-page after]
```

---

## Quality Gates (All Must Pass)
1. `npm run build` — clean, zero errors
2. Lighthouse 100/100/100 on all 4 page+device combinations
3. All section padding values on Tailwind 4px scale
4. Consistent section padding per tier (standard/accent/compact)
5. No visible text below 12px outside aria-hidden
6. All interactive elements ≥ 44px tap area
7. No horizontal overflow at 390px
8. Heading-to-content spacing consistent (32-40px margin-bottom on h2)
9. Visual rhythm even across sections (confirmed by screenshot review)

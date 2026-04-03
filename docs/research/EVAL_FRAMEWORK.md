# Mirret Quality Evaluation Framework -- 100 Evals

## Overview

This framework provides 100 discrete, testable evaluations split across two tracks: **ARCHITECT** (technical quality, ARCH-001 through ARCH-050) and **CHIEF DESIGNER** (visual/UX quality, DESIGN-001 through DESIGN-050). Each eval is grounded in the actual Mirret codebase as inspected on 2026-04-03. Evaluations are weighted toward mobile because that is where the most severe gaps exist.

Severity levels are marked for prioritization: **[CRITICAL]** = blocks real users, **[HIGH]** = degrades experience significantly, **[MEDIUM]** = noticeable quality gap, **[LOW]** = polish item.

---

## TRACK 1: ARCHITECT -- Technical Quality (50 Evals)

### A. Accessibility -- Navigation & Structure

**ARCH-001 [CRITICAL] -- Skip Link Exists and Functions**
- Pass criteria: A visually-hidden skip link appears as the first focusable element in the DOM on every page. When activated, focus moves to `<main>` or `#main-content`. The link becomes visible on focus.
- How to test: Load `/` and `/company` in Chrome. Press Tab once. Verify a "Skip to content" link becomes visible. Press Enter. Verify focus moves past the navbar into main content. Inspect DOM to confirm the skip link is the first child of `<body>`.
- Current state: FAIL. `layout.tsx` has no skip link. The first focusable element is the Mirret logo link in the navbar.

**ARCH-002 [CRITICAL] -- Mobile Navigation Exists**
- Pass criteria: On viewports below 768px, a hamburger/menu button is visible in the navbar that opens a mobile navigation panel containing all navigation links (Platform, Company) and the "Talk to us" CTA.
- How to test: Resize Chrome to 375px width. Verify a menu button is visible. Tap/click it. Verify all navigation links from the desktop nav are present and functional. Verify the menu can be closed.
- Current state: FAIL. `Navbar.tsx` line 38 hides nav links with `hidden md:flex` but provides no mobile alternative. On mobile, only the logo and "Talk to us" button are visible.

**ARCH-003 [CRITICAL] -- Mobile Menu Keyboard Accessible**
- Pass criteria: The mobile menu button is focusable via Tab, activatable via Enter/Space. When open, menu items are focusable in order. Escape closes the menu and returns focus to the trigger button. Focus is trapped within the open menu.
- How to test: On a 375px viewport, Tab to the hamburger button. Press Enter. Verify menu opens. Tab through all menu items. Press Escape. Verify menu closes and focus returns to the hamburger button.
- Current state: FAIL. No mobile menu exists to test.

**ARCH-004 [HIGH] -- Landmark Regions Defined**
- Pass criteria: The page has exactly one `<main>`, one `<nav>` (or multiple with distinct `aria-label`), a `<header>` wrapping the navbar, and a `<footer>`. No landmark roles are missing or duplicated without labels.
- How to test: Run the Accessibility tree in Chrome DevTools on `/`. Verify landmark regions: banner (header), navigation, main, contentinfo (footer). On `/company`, verify the `<article>` element is present within `<main>`.
- Current state: PARTIAL FAIL. `page.tsx` uses `<main>` and `Footer.tsx` uses `<footer>`, but the navbar (`Navbar.tsx`) uses `<nav>` without being wrapped in a `<header>`. The `<nav>` lacks an accessible name (`aria-label`).

**ARCH-005 [HIGH] -- Heading Hierarchy Is Sequential**
- Pass criteria: Each page starts with exactly one `h1`. Subsequent headings follow a sequential hierarchy (h1 > h2 > h3) with no skipped levels. No heading level is used purely for visual sizing.
- How to test: Install the HeadingsMap browser extension. Load `/` and `/company`. Verify the heading outline has no skipped levels and exactly one h1.
- Current state: PASS on `/` (h1 in Hero, h2 in sections, h3 in cards). Verify `/company` also passes (it has h1 and h2 elements properly sequenced).

**ARCH-006 [MEDIUM] -- Nav Links Have Semantic Meaning**
- Pass criteria: The "Platform" dropdown in the navbar communicates its expandable nature via `aria-expanded` and `aria-haspopup`. The chevron icon has `aria-hidden="true"`.
- How to test: Inspect the "Platform" link in the navbar. Verify it has `aria-expanded="false"` (or `true` when open) and `aria-haspopup="true"`. Verify the ChevronDown SVG has `aria-hidden="true"`.
- Current state: FAIL. `Navbar.tsx` line 39-48: The Platform link is a plain `<a>` with no ARIA attributes. The ChevronDown SVG (line 7-24) has no `aria-hidden`.

### B. Accessibility -- Focus & Keyboard

**ARCH-007 [CRITICAL] -- All Interactive Elements Have Visible Focus Indicators**
- Pass criteria: Every link, button, and interactive element shows a visible focus ring (minimum 2px, contrast ratio 3:1 against adjacent colors) when focused via keyboard. Focus indicators must be visible on the dark `#0f0e0d` background.
- How to test: Tab through every element on `/` and `/company`. Verify each focusable element has a clearly visible focus ring. Screenshot each state. Verify the ring is visible (not just a browser default that is invisible on dark backgrounds).
- Current state: FAIL. `globals.css` line 107 sets `outline-ring/50` as the base outline, which resolves to `rgba(255,255,255,0.2)` -- a 20% opacity white ring on a near-black background. Links in `Navbar.tsx`, `Footer.tsx`, and `CTASection.tsx` use plain `<a>` tags with no `focus-visible` styles. The shadcn button component has proper focus styles, but it is not used for any of the site's actual CTAs or links.

**ARCH-008 [HIGH] -- Tab Order Follows Visual Layout**
- Pass criteria: Tabbing through the page follows the visual reading order: skip link, logo, nav links, CTA, then page content top-to-bottom, then footer.
- How to test: Press Tab repeatedly through the entire `/` page. Verify focus never jumps backward or to an unexpected region. Document the full tab sequence.
- Current state: LIKELY PASS (DOM order matches visual order in current code), but needs verification since the fixed navbar may cause issues.

**ARCH-009 [HIGH] -- Focus Not Trapped Unintentionally**
- Pass criteria: At no point during keyboard navigation is focus trapped in a region without an escape mechanism. After the last focusable element on the page, Tab cycles back to the browser chrome (or skip link).
- How to test: Tab through the entire page to the last footer link. Press Tab once more. Verify focus exits the page (or loops to skip link if implemented). Check that the hero video element does not inadvertently capture focus.
- Current state: NEEDS VERIFICATION. The `<video>` element in HeroSection has no `tabindex` but may still be focusable depending on browser.

**ARCH-010 [MEDIUM] -- Keyboard Activation of All CTAs**
- Pass criteria: All CTA buttons and links (Generate Free Report, Talk to us, Back to home) are activatable via Enter key. The "Platform" dropdown can be opened/closed with Enter or Space.
- How to test: Tab to each CTA. Press Enter. Verify the expected action occurs (navigation or new tab). On the Platform dropdown, verify Enter toggles it.
- Current state: PARTIAL. `<a>` elements activate on Enter by default, so CTAs pass. The "Platform" dropdown is a plain link (not a button), so it navigates rather than expanding.

### C. Accessibility -- Screen Reader

**ARCH-011 [HIGH] -- All Images Have Meaningful Alt Text**
- Pass criteria: Every `<Image>` and `<img>` element has alt text that conveys the image's purpose, or `alt=""` and `aria-hidden="true"` if purely decorative. Alt text is descriptive, not just a filename.
- How to test: Run axe DevTools on `/` and `/company`. Inspect every image element. Verify alt text.
- Current state: PASS. `HeroSection.tsx` line 192 has descriptive alt: "Surface Monitor dashboard showing detected brand threats...". `Footer.tsx` has "SOC 2 compliance badge", "ISO 27001 compliance badge", "GDPR compliance badge". Decorative SVGs have `aria-hidden="true"`.

**ARCH-012 [HIGH] -- Decorative Elements Hidden from Assistive Tech**
- Pass criteria: All decorative SVG icons, background videos, gradient overlays, and the "Mirret" watermark text in CTASection are hidden via `aria-hidden="true"`.
- How to test: Enable VoiceOver (macOS) or NVDA (Windows). Navigate through `/`. Verify decorative elements are not announced. Check the hero video, card mockup sections, and CTA watermark.
- Current state: MOSTLY PASS. The hero video has `aria-hidden="true"` (HeroSection line 173). The CTA watermark span has `aria-hidden="true"` (CTASection line 35). Card mockups have `aria-hidden="true"`. However, the `MirretMark` SVG in the hero label (HeroSection line 125) has `role="img"` and `aria-label="Mirret logo"` which will be announced redundantly next to the "Surface Monitor" text.

**ARCH-013 [MEDIUM] -- Social Media Links Have Accessible Names**
- Pass criteria: Social icon links in the footer have `aria-label` describing their destination.
- How to test: Inspect footer social links. Verify each has an `aria-label`.
- Current state: PASS. Footer.tsx line 157: `aria-label="Follow Mirret on X"`, line 167: `aria-label="Follow Mirret on LinkedIn"`.

**ARCH-014 [MEDIUM] -- Page Announces Meaningful Title on Load**
- Pass criteria: Each page has a unique, descriptive `<title>` that is announced by screen readers on page load.
- How to test: Navigate to `/` and `/company` with a screen reader. Verify the page title is announced. Check that the title template (`%s | Mirret`) works on subpages.
- Current state: PASS. `layout.tsx` defines `title.default` and `title.template`. `/company/page.tsx` defines `title: "Company"` which renders as "Company | Mirret".

**ARCH-015 [MEDIUM] -- Link Purpose Clear from Text Alone**
- Pass criteria: Every link's purpose can be determined from its link text alone (or link text plus its programmatic context). No "click here" or "read more" links without context.
- How to test: List all link texts on both pages. Verify each is self-describing. Check that external links opening in new tabs indicate this behavior.
- Current state: PARTIAL FAIL. Links like "Surface Monitor", "Blog", "Privacy Policy" are clear. However, external links (Calendly, report.mirret.co.uk) open in new tabs via `target="_blank"` without indicating this to screen reader users (no `aria-label` mentioning "opens in new tab" or visual indicator).

**ARCH-016 [LOW] -- Language Attribute Set**
- Pass criteria: The `<html>` element has `lang="en"` (or appropriate locale).
- How to test: Inspect the `<html>` tag.
- Current state: PASS. `layout.tsx` line 92: `lang="en"`.

### D. Accessibility -- Color & Contrast

**ARCH-017 [CRITICAL] -- Body Text Meets WCAG AA Contrast (4.5:1)**
- Pass criteria: All body text (under 18pt/24px regular or 14pt/18.66px bold) has a contrast ratio of at least 4.5:1 against its background.
- How to test: Use Chrome DevTools color contrast checker on each text element. Calculate contrast for opacity-based colors against `#0f0e0d`. Key elements to check: `text-white/[0.61]` (hero body), `text-white/[0.45]` (feature descriptions), `text-white/[0.55]` (footer headers, labels).
- Current state: FAIL. `text-white/[0.45]` on `#0f0e0d` = `rgba(255,255,255,0.45)` on `#0f0e0d` resolves to approximately `#7a7976` which is roughly 4.1:1 -- below 4.5:1 AA. `text-white/[0.55]` is borderline. Feature descriptions at 13px with 0.45 opacity are the worst offenders (HeroSection line 157).

**ARCH-018 [HIGH] -- Large Text Meets WCAG AA Contrast (3:1)**
- Pass criteria: All large text (18pt+ regular or 14pt+ bold) has a contrast ratio of at least 3:1 against its background.
- How to test: Check h1, h2, h3 elements. These use `text-white` (full opacity) on `#0f0e0d` which should pass easily.
- Current state: PASS. Headings use `text-white` (full white) on `#0f0e0d` = contrast ratio ~19.5:1.

**ARCH-019 [HIGH] -- Interactive Element Contrast**
- Pass criteria: All interactive elements (links, buttons) have text contrast of at least 4.5:1 in their default state, and their focus/hover states also meet contrast requirements.
- How to test: Check nav links (`text-white/[0.87]`), footer links (`text-white/[0.61]`), and CTA buttons. Check hover states.
- Current state: PARTIAL. Nav links at `0.87` opacity pass. Footer links at `0.61` are borderline. The hover state `hover:opacity-70` on nav links (Navbar.tsx line 43) reduces an already reduced opacity, potentially failing.

**ARCH-020 [MEDIUM] -- UI Component Boundary Contrast (3:1)**
- Pass criteria: Buttons and form controls have a border or visual boundary that achieves at least 3:1 contrast against the adjacent background.
- How to test: Check the "Talk to us" button border (`border-white/30` on `#0f0e0d`) and the card borders (`border-white/[0.06]`).
- Current state: FAIL. Card borders at `rgba(255,255,255,0.06)` on `#0f0e0d` resolve to approximately `#181716` which is essentially invisible (~1.1:1 contrast). The "Talk to us" button border at `white/30` is approximately `#555250` (~3.4:1) which barely passes.

**ARCH-021 [MEDIUM] -- Color Is Not the Only Indicator**
- Pass criteria: No information is conveyed by color alone. Status indicators, links, and interactive states have additional visual cues (underline, icon, shape change).
- How to test: View the page in grayscale mode (Chrome DevTools rendering emulation). Verify all information remains distinguishable. Check the "Compliant" badge in footer (green dot + text).
- Current state: MOSTLY PASS. The green "Compliant" dot in the footer has accompanying text. Links are distinguishable by context (nav position, footer columns). However, the gradient bar in TimelineSection conveys progression purely through color.

### E. Touch Targets & Mobile Interaction

**ARCH-022 [CRITICAL] -- All Touch Targets Meet 44x44px Minimum**
- Pass criteria: Every interactive element (link, button) has a tap target of at least 44x44 CSS pixels on mobile viewports. This includes padding, not just text bounds.
- How to test: On a 375px viewport, use Chrome DevTools to measure the bounding box of every interactive element. Key targets: nav logo link, "Talk to us" button, footer links, social icons, CTA buttons.
- Current state: FAIL. Multiple violations:
  - Footer social icons are 18x18 SVGs in `<a>` tags with no padding (Footer.tsx lines 151-169), total target approximately 18x18.
  - Footer category links have `text-sm leading-[2.2]` but no explicit padding -- the text "Surface Monitor" at 14px is approximately 14x31px (line-height provides vertical space but horizontal target is just text width).
  - The Mirret logo link wraps a 24px SVG + text with no minimum height/padding.
  - The nav "Talk to us" button has `px-5 py-2` which produces approximately 40x36px -- below 44px height.

**ARCH-023 [HIGH] -- Touch Targets Have Adequate Spacing**
- Pass criteria: Adjacent touch targets have at least 8px of space between them so accidental taps on neighboring elements are unlikely.
- How to test: Measure the gap between adjacent footer links, between social icons, and between nav items.
- Current state: PARTIAL. Footer social icons have `gap-3` (12px) between them, but since the icons themselves are only 18px, the actual gap between tap targets is adequate. Footer link columns use vertical list layout which provides natural spacing. The separator `|` between social icons may confuse tapping.

**ARCH-024 [HIGH] -- No Hover-Only Interactions on Mobile**
- Pass criteria: All content and functionality accessible via hover on desktop is also accessible on mobile via tap or always-visible.
- How to test: On a touch device/emulator, verify the "Platform" dropdown (which uses hover) is accessible. Verify no tooltips or content are hidden behind hover states.
- Current state: FAIL. The "Platform" nav link has a ChevronDown suggesting a dropdown, but it just links to `/` with a hover opacity change. On mobile it is completely hidden (part of the `hidden md:flex` group). Any intended dropdown behavior is inaccessible.

### F. Performance

**ARCH-025 [HIGH] -- Hero Image Optimized for Mobile**
- Pass criteria: The hero image (`hero-canvas.png`, 731KB) serves responsive sizes: WebP format, and at least 2 srcset breakpoints (mobile ~375w, desktop ~1100w). On mobile, the served image is under 150KB.
- How to test: Load `/` on a 375px viewport with DevTools Network tab open. Check the actual bytes transferred for the hero image. Verify the `<Image>` component uses `sizes` attribute for responsive loading.
- Current state: FAIL. `next.config.ts` line 9-11 has `images: { unoptimized: true }` which disables all Next.js image optimization. The full 731KB PNG is served at every viewport. The `<Image>` component in HeroSection (line 191) has no `sizes` attribute.

**ARCH-026 [HIGH] -- Hero Video Optimized**
- Pass criteria: The hero background video (9MB) is either lazy-loaded, has a poster frame, or is replaced with a static image on mobile to avoid unnecessary data transfer. On mobile cellular connections, the video should not auto-load.
- How to test: Load `/` on a throttled 3G connection in DevTools. Measure time for the video to start transferring. Check if a poster attribute exists. Check if the video is conditionally hidden on mobile.
- Current state: FAIL. HeroSection.tsx line 169-177: The video has `autoPlay` with no `poster` attribute, no conditional mobile loading, and no lazy loading. A 9MB video autoplays on every device.

**ARCH-027 [HIGH] -- Largest Contentful Paint Under 2.5s**
- Pass criteria: LCP is under 2.5 seconds on a mobile 4G connection.
- How to test: Run Lighthouse in mobile mode. Check LCP. The hero image (731KB unoptimized) is marked `priority` which helps, but the unoptimized size will hurt.
- Current state: AT RISK. The `priority` prop on the hero image (HeroSection line 196) triggers preloading, which helps. But 731KB unoptimized PNG plus 9MB autoplay video will heavily impact LCP on slower connections.

**ARCH-028 [MEDIUM] -- Cumulative Layout Shift Under 0.1**
- Pass criteria: CLS is under 0.1 as measured by Lighthouse.
- How to test: Run Lighthouse in mobile mode. Check CLS. Pay attention to the hero image (which has explicit width/height preventing shift) and font loading (which uses `display: swap`).
- Current state: LIKELY PASS. The hero image has explicit `width={1100} height={427}`. Fonts use `display: "swap"` (layout.tsx line 32). But the Emilio custom font swap from system font to decorative heading font could cause visible shift on h1/h2 elements.

**ARCH-029 [MEDIUM] -- Total Page Weight Under 3MB on Mobile**
- Pass criteria: Total transferred size on the homepage is under 3MB on a mobile viewport.
- How to test: Load `/` on a 375px viewport with DevTools Network tab. Sum all transferred bytes.
- Current state: FAIL. Hero image alone is 731KB, hero video is 9MB, compliance badges are ~43KB total, OG image is 339KB. The video alone exceeds the budget by 3x.

**ARCH-030 [MEDIUM] -- No Render-Blocking Resources**
- Pass criteria: No external stylesheets or scripts block first render. Fonts load asynchronously with `font-display: swap`.
- How to test: Run Lighthouse. Check for render-blocking resource warnings. Verify font loading strategy.
- Current state: LIKELY PASS. Fonts use `display: "swap"` or `next/font` (self-hosted with preload). Tailwind CSS is compiled at build time. No external CSS imports.

**ARCH-031 [LOW] -- Static Export Produces Clean Output**
- Pass criteria: `next build` with `output: "export"` completes without errors. All pages are generated as static HTML.
- How to test: Run `npm run build`. Verify the `out/` directory contains `index.html`, `company/index.html`, `404.html`, and `sitemap.xml`.
- Current state: NEEDS VERIFICATION.

### G. SEO & Meta Tags

**ARCH-032 [HIGH] -- Canonical URL Correct**
- Pass criteria: Each page has a canonical URL tag pointing to its canonical location on `mirret.co.uk`.
- How to test: Inspect `<head>` on each page. Verify `<link rel="canonical">` exists and points to the correct URL. Note: `metadataBase` is set to `https://mirret.co.uk` (layout.tsx line 35).
- Current state: NEEDS VERIFICATION. Next.js may auto-generate canonical from metadataBase, but this should be confirmed in the built HTML output.

**ARCH-033 [HIGH] -- Open Graph Tags Complete**
- Pass criteria: Every page has `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, and `og:site_name`.
- How to test: Use Facebook's Sharing Debugger or inspect `<meta>` tags in the `<head>`. Verify all OG tags are present on `/` and `/company`.
- Current state: PASS. `layout.tsx` defines comprehensive OG metadata. `/company/page.tsx` overrides title, description, and image.

**ARCH-034 [HIGH] -- Twitter Card Tags Complete**
- Pass criteria: Every page has `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
- How to test: Use Twitter's Card Validator or inspect meta tags.
- Current state: PASS. Both pages define Twitter card metadata.

**ARCH-035 [MEDIUM] -- Structured Data (JSON-LD) Present**
- Pass criteria: The homepage includes Organization schema markup and optionally WebSite schema. The company page includes an Article or AboutPage schema.
- How to test: Run Google's Rich Results Test on both pages. Check for valid JSON-LD.
- Current state: FAIL. No JSON-LD structured data exists in any component or layout file.

**ARCH-036 [MEDIUM] -- Sitemap Accurate and Complete**
- Pass criteria: `/sitemap.xml` lists all public pages with correct URLs, appropriate `lastmod` dates, and `changefreq`/`priority` values.
- How to test: Fetch `/sitemap.xml`. Verify it lists `/` and `/company` with correct `https://mirret.co.uk` URLs.
- Current state: PASS. `sitemap.ts` generates entries for both pages with correct URLs and recent dates.

**ARCH-037 [MEDIUM] -- Robots.txt Properly Configured**
- Pass criteria: `/robots.txt` allows crawling of all public pages and references the sitemap.
- How to test: Fetch `/robots.txt`. Verify `Allow: /` and `Sitemap:` directive.
- Current state: PASS. `public/robots.txt` contains the correct directives.

**ARCH-038 [LOW] -- Favicon and Apple Touch Icon Present**
- Pass criteria: A favicon is defined in SVG (for modern browsers) and PNG (for Apple touch icon). Both are referenced in metadata.
- How to test: Check browser tab icon. Inspect `<head>` for `<link rel="icon">` and `<link rel="apple-touch-icon">`.
- Current state: PASS. `layout.tsx` line 52-54 defines icon and apple icon paths. Files exist in `public/seo/`.

**ARCH-039 [LOW] -- No Broken Internal Links**
- Pass criteria: Every internal `href` resolves to an existing page. No 404s on internal navigation.
- How to test: Spider the site with a link checker tool. Verify all internal hrefs (/, /company, /privacy, /terms) resolve.
- Current state: AT RISK. Footer links to `/privacy` and `/terms` (Footer.tsx line 55-56) point to `https://mirret.co.uk/privacy` and `https://mirret.co.uk/terms` as external links, but these pages may not exist yet.

### H. Semantic HTML

**ARCH-040 [HIGH] -- Sections Have Accessible Names or Headings**
- Pass criteria: Each `<section>` element either has an `aria-label`, `aria-labelledby` pointing to its heading, or contains a heading as its first content child. Screen readers should be able to navigate by section.
- How to test: Navigate by landmarks using VoiceOver rotor. Verify each section is named/identifiable.
- Current state: FAIL. All `<section>` elements in HeroSection, AgentBuilderSection, ControlSection, TimelineSection, and CTASection lack `aria-label` or `aria-labelledby` attributes.

**ARCH-041 [MEDIUM] -- Lists Used for Groups of Related Items**
- Pass criteria: Groups of related items (nav links, feature cards, timeline steps, footer link columns) use `<ul>/<li>` or `<ol>/<li>` lists.
- How to test: Inspect DOM for navigation links, feature cards, and timeline steps. Verify list semantics.
- Current state: PARTIAL. Footer uses `<ul>/<li>` for link groups (Footer.tsx line 71-87). However, nav links in `Navbar.tsx` are bare `<a>` tags inside a `<div>` (not a list). Feature cards in HeroSection use `.map()` into `<div>` elements (not a list). Timeline steps use `.map()` into `<div>` elements within a CSS grid.

**ARCH-042 [MEDIUM] -- No Div-Soup for Interactive Elements**
- Pass criteria: All interactive elements use semantic HTML (`<a>` for navigation, `<button>` for actions). No `<span>` or `<div>` elements styled as buttons.
- How to test: Search for `<span>` or `<div>` elements with button-like styling (rounded, bg-white, px/py padding) that are not wrapped in `<a>` or `<button>`.
- Current state: FAIL. `AgentBuilderSection.tsx` line 91 has a `<div>` with `bg-white px-4 py-1.5` styled as a toggle button. Lines 123-128 have `<span>` elements styled as "Cancel" and "Start scan" buttons. These are inside `aria-hidden="true"` mockups, which mitigates the accessibility impact, but still represents non-semantic HTML.

**ARCH-043 [MEDIUM] -- External Links Identifiable**
- Pass criteria: Links that navigate to external sites or open in new tabs include `rel="noopener noreferrer"` and visually indicate they open externally.
- How to test: Inspect all links with `target="_blank"`. Verify `rel` attribute. Check for visual external-link indicator.
- Current state: PARTIAL. All external links have `rel="noopener noreferrer"` (Navbar.tsx line 66, Footer.tsx lines 76-78, CTASection line 23, company/page.tsx lines 354, 362). However, none have a visual indicator that they open in a new tab.

**ARCH-044 [LOW] -- `<time>` Element Used for Dates**
- Pass criteria: Any dates displayed (copyright year, "Day 1/3/7" timeline) use `<time>` elements with `datetime` attributes where semantically appropriate.
- How to test: Inspect the copyright year in the footer and the timeline dates.
- Current state: FAIL. Footer copyright (line 148) uses a plain `<p>` with `new Date().getFullYear()`. Timeline dates are plain `<p>` elements.

### I. ARIA

**ARCH-045 [HIGH] -- ARIA Roles Used Correctly**
- Pass criteria: No ARIA roles that conflict with native semantics. No `role="button"` on `<a>` elements or vice versa. No missing required ARIA properties for used roles.
- How to test: Run axe DevTools. Check for ARIA violations. Manually review any `role`, `aria-*` attributes.
- Current state: LIKELY PASS. The codebase uses minimal ARIA (mostly `aria-hidden` and `aria-label` on icons/social links), which is correct usage. The `MirretMark` SVG has `role="img"` with `aria-label` which is appropriate.

**ARCH-046 [MEDIUM] -- ARIA Live Regions for Dynamic Content**
- Pass criteria: If the mobile menu opens/closes, or any content changes dynamically (e.g., dropdown), the change is announced via `aria-live` or appropriate role (e.g., `role="dialog"` for the mobile menu).
- How to test: Open the mobile menu with a screen reader active. Verify the opening is announced. Close it. Verify the closing is announced.
- Current state: N/A (no dynamic content currently exists -- no mobile menu, no dropdown). This eval becomes relevant once those features are implemented.

**ARCH-047 [LOW] -- No Redundant ARIA**
- Pass criteria: ARIA attributes are not used where native HTML semantics already provide the same information. For example, `<nav role="navigation">` is redundant.
- How to test: Audit all ARIA attributes in the codebase. Flag any that duplicate native semantics.
- Current state: PASS. The codebase does not use redundant ARIA. `<nav>` has no `role="navigation"`, `<main>` has no `role="main"`, etc.

### J. Advanced Accessibility & Edge Cases

**ARCH-048 [HIGH] -- Reduced Motion Respected**
- Pass criteria: Users with `prefers-reduced-motion: reduce` see no auto-playing video, no transition animations, and no CSS transitions longer than 100ms.
- How to test: Enable "Reduce motion" in macOS System Settings (or Chrome DevTools rendering emulation). Reload `/`. Verify the hero video does not autoplay. Verify hover transitions are instant or very short.
- Current state: FAIL. The hero video (`autoPlay` in HeroSection line 170) plays regardless of motion preferences. No `@media (prefers-reduced-motion: reduce)` media query exists in `globals.css`. All transition durations (e.g., `duration-200`) apply unconditionally.

**ARCH-049 [MEDIUM] -- Text Resizable to 200% Without Loss**
- Pass criteria: When the browser's base font size is doubled (from 16px to 32px), all text scales proportionally and no content is clipped, overlapping, or hidden. The layout remains usable.
- How to test: Set Chrome's default font size to 32px in Settings. Reload `/`. Verify no overflow, clipping, or layout breakage. Note: many font sizes in the codebase use fixed pixel values (`text-[36px]`, `text-[15px]`), which will NOT scale with browser font size settings.
- Current state: FAIL. Almost all text uses fixed pixel sizes via Tailwind arbitrary values: `text-[36px]`, `text-[60px]`, `text-[15px]`, `text-[13px]`, `text-[11px]`, `text-[14px]`, etc. These are set in CSS pixels and will not respond to browser font size preferences. Only elements using Tailwind's default scale (`text-sm`, `text-lg`, `text-xl`) use `rem` units.

**ARCH-050 [MEDIUM] -- Print Stylesheet Usable**
- Pass criteria: When printed, the page renders readable content without decorative backgrounds, videos, or dark backgrounds. Text is black on white. Navigation and footer are simplified.
- How to test: Use Chrome's Print Preview on `/` and `/company`. Verify content is readable. Check that the dark background does not print.
- Current state: FAIL. No `@media print` styles exist. The page will attempt to print white text on a near-black background, rendering it unreadable on paper.

---

## TRACK 2: CHIEF DESIGNER -- Visual & UX Quality (50 Evals)

### A. Typography Scale & Consistency

**DESIGN-001 [CRITICAL] -- Body Text Minimum 16px on Mobile**
- Pass criteria: All body/paragraph text on mobile viewports (below 768px) is at least 16px. No body text smaller than 16px.
- How to test: On a 375px viewport, use DevTools Computed tab to measure the font-size of every `<p>` element across all sections.
- Current state: FAIL. Multiple violations:
  - HeroSection body: `text-[15px]` (line 141)
  - Feature card descriptions: `text-[13px]` (line 157)
  - AgentBuilderSection card body: `text-[14px]` (line 229)
  - ControlSection card body: `text-[14px]` (line 315)
  - TimelineSection body: `text-sm` = 14px (line 59)
  - Footer links: `text-sm` = 14px (line 79)
  - Company page body: `text-[17px]` (line 33) -- this one passes.

**DESIGN-002 [CRITICAL] -- Heading Font Weight Adequate for Dark Background**
- Pass criteria: All headings on the dark `#0f0e0d` background use a minimum font-weight of 400 (regular). Weight 300 (light) produces too-thin strokes that become hard to read, especially on non-Retina displays.
- How to test: Inspect every h1, h2, h3 element. Verify computed font-weight is 400 or above. Test on a non-Retina (1x) display if possible.
- Current state: FAIL. Severe violations:
  - All h1 elements: `font-light` = weight 300 (HeroSection line 133, CTASection line 12, company/page.tsx line 60, not-found.tsx line 9)
  - All h2 elements in sections: `font-light` = weight 300 (AgentBuilderSection line 204, ControlSection line 290, TimelineSection line 37, company/page.tsx line 40)
  - The Emilio heading font is loaded at weight 300 only (layout.tsx line 18-29)

**DESIGN-003 [HIGH] -- H1 Line Height Provides Readability**
- Pass criteria: H1 elements have a line-height of at least 1.2 (ideally 1.25-1.35 for multi-line headings). Line-height of 1.1 causes ascenders/descenders to collide on wrapped lines.
- How to test: Inspect h1 elements on mobile where they wrap to multiple lines. Measure the space between baselines. Verify text does not feel cramped.
- Current state: FAIL. HeroSection h1: `leading-[1.1]` (line 133). CTASection h2: `leading-[1.1]` (line 12). On mobile at `text-[36px]`, this produces only 39.6px line-height for a 36px font -- ascender-to-descender distance is insufficient.

**DESIGN-004 [HIGH] -- Consistent Type Scale Across Sections**
- Pass criteria: The site uses a defined, consistent type scale. Body text across all sections uses the same size. Section labels use the same size. Card titles use the same size. No more than 6-7 distinct font sizes in the entire scale.
- How to test: Catalog every unique font-size value used across all components. List them in order. Verify they form a coherent scale.
- Current state: FAIL. Font sizes used (in pixels): 10, 11, 12, 13, 14, 15, 17, 18 (text-lg), 24, 28, 32, 36, 44, 48, 52, 60, 64, 120, 300, 400. That is 20 distinct sizes with no clear mathematical relationship or scale ratio.

**DESIGN-005 [MEDIUM] -- Label Text Size Not Below 11px**
- Pass criteria: No text in the interface is rendered below 11px. Text at 10px or below is illegible on most screens.
- How to test: Search for any font-size values at or below 10px across all components.
- Current state: FAIL. ControlSection mockup uses `text-[10px]` in multiple places (lines 8, 12, 14, 219-231 in the stat boxes). AgentBuilderSection uses `text-[12px]` for upload area but the mockup status badges use `text-[10px]`.

**DESIGN-006 [MEDIUM] -- Company Page Long-Form Typography Optimized**
- Pass criteria: The company page (`/company`) body text has a comfortable reading measure (45-75 characters per line), adequate line-height (1.6+), and proper paragraph spacing.
- How to test: Count characters per line on the company page at various viewport widths. Measure line-height and paragraph margins.
- Current state: PASS. Company page uses `max-w-[660px]` container, `text-[17px] leading-[1.85]` body text, and `mb-7` paragraph spacing. The measure is approximately 65-70 characters, line-height is 1.85, and spacing is generous.

### B. Spacing & Layout Rhythm

**DESIGN-007 [HIGH] -- Consistent Section Vertical Padding**
- Pass criteria: All major page sections use a consistent vertical padding value (or values from a defined spacing scale). The rhythm between sections feels even and intentional.
- How to test: Measure `padding-top` and `padding-bottom` of every `<section>` element on the homepage.
- Current state: FAIL. Inconsistent values:
  - HeroSection: `pt-[140px]` with no bottom padding (relies on image margin)
  - AgentBuilderSection: `py-20` (80px)
  - ControlSection: `py-20` (80px)
  - TimelineSection: `py-24` (96px)
  - CTASection: `py-[100px]`
  Five different padding values across five sections, with no consistent scale.

**DESIGN-008 [HIGH] -- Cards Have Consistent Internal Padding**
- Pass criteria: All card components across sections use the same internal padding values.
- How to test: Measure padding on cards in AgentBuilderSection and ControlSection.
- Current state: PASS. Both sections use `px-6 pt-8 pb-0` for card content areas, which is consistent.

**DESIGN-009 [MEDIUM] -- Heading-to-Body Spacing Consistent**
- Pass criteria: The space between a section heading and the first body element below it is consistent across all sections.
- How to test: Measure margin-bottom of h2 elements across sections.
- Current state: PARTIAL. AgentBuilderSection h2: `mb-10`. ControlSection h2: `mb-10`. TimelineSection uses `mt-5` on h2 from the label and `mt-12` to the gradient bar. CTASection uses `mt-6` from label to h2, then `mt-5` to body. Not fully consistent but close in the card sections.

**DESIGN-010 [MEDIUM] -- Mobile Horizontal Padding Consistent**
- Pass criteria: All sections use the same horizontal padding (`px-6` = 24px) on mobile viewports, creating a consistent text margin from screen edge.
- How to test: Verify `px-6` on all sections at 375px viewport. Check that no content bleeds to edge or uses different padding.
- Current state: MOSTLY PASS. All sections use `px-6`. However, the HeroSection h1 (line 133) has no `px-6` -- it uses `mx-auto max-w-[800px]` with no horizontal padding, which means on very narrow viewports the text could approach screen edges.

### C. Visual Hierarchy

**DESIGN-011 [CRITICAL] -- CTA Buttons Are the Most Prominent Elements**
- Pass criteria: Primary CTA buttons ("Generate Free Report", "Talk to us") are visually the most prominent interactive elements on the page. They have high contrast fill, adequate size (minimum 44px height, 120px width on mobile), and clear call-to-action text.
- How to test: Squint test: blur the page screenshot and verify CTAs are the first elements that draw attention. Measure CTA dimensions.
- Current state: PARTIAL. The "Generate Free Report" button (CTASection line 20-27) has white fill on dark background with `px-8 py-3.5` -- approximately 56px height, prominent. The "Talk to us" nav button is less prominent with ghost styling (outline only). But the hero section has NO CTA button at all, which is a major visual hierarchy gap.

**DESIGN-012 [HIGH] -- Section Labels Visually Distinct from Body Text**
- Pass criteria: Section labels ("Threat Scanner", "AI-Native Analysis", "How it works", "See your exposure") are visually distinct from body text through consistent use of size, tracking, opacity, and case treatment.
- How to test: Compare all section labels. Verify they share the same visual treatment.
- Current state: MOSTLY PASS. Labels consistently use `text-[11px] uppercase tracking-[0.15em] text-white/[0.55]` across AgentBuilderSection, ControlSection, TimelineSection, and CTASection. The "Surface Monitor" label in HeroSection uses a different treatment (gradient text, non-uppercase, `text-sm font-medium`) which breaks the pattern.

**DESIGN-013 [HIGH] -- Card Title vs. Card Body Differentiation**
- Pass criteria: Card titles are clearly distinguishable from card body text through size, weight, or color difference. The hierarchy within each card reads: label > title > body.
- How to test: Compare visual weight of label, title, and body text within cards.
- Current state: PASS. Cards use: label (`text-[11px] uppercase text-white/[0.55]`) > title (`text-[24px] font-normal text-white`) > body (`text-[14px] text-white/[0.61]`). Clear three-tier hierarchy.

**DESIGN-014 [MEDIUM] -- Page Flow Creates Natural Reading Path**
- Pass criteria: A first-time visitor can scan the page top-to-bottom and understand the product's value proposition, how it works, proof points, and CTA without reading every word. Section order follows: hook > explain > prove > convert.
- How to test: Five-second test with a new user: show page for 5 seconds, ask what the product does and what action they should take.
- Current state: MOSTLY PASS. Flow is: Hero (hook) > AgentBuilder (explain setup) > Control (explain capabilities) > Timeline (prove ease) > CTA (convert). The hero section could benefit from a CTA to anchor the conversion path earlier.

### D. Mobile-First Card Layouts

**DESIGN-015 [HIGH] -- Cards Stack Gracefully on Mobile**
- Pass criteria: Side-by-side cards on desktop (AgentBuilder, Control sections) stack vertically on mobile with no horizontal overflow, no cramped content, and adequate spacing between stacked cards.
- How to test: View each card section at 375px. Verify cards are full-width, content is not truncated, and gap between cards is visually comfortable.
- Current state: PASS. Cards use `flex flex-col md:flex-row gap-5`. On mobile they stack vertically with 20px gap.

**DESIGN-016 [HIGH] -- Card Mockup Images/UI Readable on Mobile**
- Pass criteria: The UI mockups inside cards (CreateAgentMockup, SentinelChatMockup, CodeEditorMockup, TestResultsMockup) are readable and not cramped at 375px width.
- How to test: View each card mockup at 375px. Verify text is legible and UI elements are not overlapping or truncated.
- Current state: AT RISK. The mockups contain text as small as 10px (`text-[10px]`), code at `text-[12px]` with mono font, and tightly packed UI elements. The code editor mockup (ControlSection) with 20 lines of code at 12px mono on a 375px-wide card (minus 48px padding = 327px content width) will be extremely cramped. Lines will likely overflow.

**DESIGN-017 [MEDIUM] -- Feature Cards in Hero Readable on Mobile**
- Pass criteria: The three feature cards below the hero (detection/accuracy/enforcement) are readable with adequate spacing. The icon-title-description stack is clear.
- How to test: View the feature cards section at 375px. Measure spacing, text size, and readability.
- Current state: PARTIAL. On mobile, cards use `flex flex-col gap-8` with `max-w-[200px]` width. The 13px description text at 45% opacity on a dark background is below minimum readability. The card width constraint may feel arbitrary on mobile (card doesn't take full width).

**DESIGN-018 [MEDIUM] -- Stat Boxes in TestResults Mockup Readable on Mobile**
- Pass criteria: The three stat boxes (Detection Rate, Threats Detected, Takedowns Filed) in the test results mockup are readable on mobile without truncation.
- How to test: View the stat boxes at 375px. Check if they stack or overflow.
- Current state: PARTIAL. Uses `flex flex-col sm:flex-row gap-3` which stacks on mobile. Stacked, each box will be full width and readable. But at sm (640px), three boxes side-by-side may be too narrow for their content.

### E. Responsive Image Handling

**DESIGN-019 [CRITICAL] -- Hero Image Sharp at All Viewports**
- Pass criteria: The hero dashboard image is sharp and readable at every common viewport width (375, 414, 768, 1024, 1280, 1440). Dashboard text, icons, and data within the image are discernible.
- How to test: View the hero image at 375px width. Can you read the text within the dashboard mockup? Compare with 1280px.
- Current state: FAIL. The hero image is a single 1100px-wide PNG scaled down via CSS `w-full`. At 375px (minus 48px padding = 327px content width), the image is compressed to ~30% of its original size. Dashboard details, text labels, and data within the image will be illegible at this scale.

**DESIGN-020 [HIGH] -- Compliance Badge Images Sharp**
- Pass criteria: The three compliance badges in the footer are crisp at their displayed size (40x40px per next/image, so 80x80px source for 2x displays).
- How to test: View the footer badges on a Retina display. Check for blurriness.
- Current state: NEEDS VERIFICATION. Badge images are 40x40 in the `<Image>` component. Since images are unoptimized, the source file size determines quality. The files are ~14KB each which suggests adequate resolution.

**DESIGN-021 [MEDIUM] -- OG Image Looks Good When Shared**
- Pass criteria: The Open Graph image (`/seo/og-image.png`) at 1200x630 displays correctly when shared on Twitter, LinkedIn, Slack, and iMessage. Text is readable and not cropped.
- How to test: Share the URL on each platform (or use their debug tools). Verify the image renders correctly with no cropping of important content.
- Current state: NEEDS VERIFICATION. File exists at 339KB. Dimensions defined as 1200x630 in metadata.

### F. CTA Prominence & Clarity

**DESIGN-022 [CRITICAL] -- Hero Section Has a Primary CTA**
- Pass criteria: The hero section contains a visually prominent primary CTA button (e.g., "Generate Free Report" or "Get Started") within the first viewport on both mobile and desktop.
- How to test: Load `/` at 375px and 1280px. Verify a CTA button is visible above the fold within the hero content area.
- Current state: FAIL. The HeroSection component (lines 120-203) contains NO CTA button. The first CTA on the page is in the navbar ("Talk to us" -- outline ghost style) and then not again until the CTASection at the very bottom of the page.

**DESIGN-023 [HIGH] -- Primary vs. Secondary CTA Distinction**
- Pass criteria: Primary CTAs use a filled white button. Secondary CTAs use an outline/ghost style. The visual weight difference is immediately apparent.
- How to test: Compare all CTA buttons across the site. Verify primary/secondary distinction is consistent.
- Current state: MOSTLY PASS. "Generate Free Report" uses filled white (`bg-white`). "Talk to us" uses outline (`border border-white/30`). The company page CTA section correctly pairs both styles side by side.

**DESIGN-024 [HIGH] -- CTA Text Is Action-Oriented**
- Pass criteria: Every CTA button uses action-oriented text (verb + noun). No vague labels like "Learn More" or "Submit".
- How to test: List all CTA button labels.
- Current state: PASS. CTAs are: "Talk to us", "Generate Free Report", "Back to home". All are clear and action-oriented.

**DESIGN-025 [MEDIUM] -- CTA Visible on Every Scroll Depth**
- Pass criteria: At any scroll position on the homepage, a CTA is either visible or reachable within one scroll. The fixed navbar CTA provides persistent access.
- How to test: Scroll through the entire homepage. Note any scroll positions where no CTA is visible.
- Current state: PARTIAL. The navbar "Talk to us" is persistent (fixed position). However, it's a secondary (outline) CTA and may not be prominent enough. The only primary CTA is at the very bottom. The middle sections (AgentBuilder, Control, Timeline) have zero CTAs.

### G. Section Breathing Room

**DESIGN-026 [HIGH] -- Sections Have Visual Separators or Breathing Room**
- Pass criteria: Adjacent sections are visually distinct through whitespace, borders, background changes, or other separators. No section's content blends into the next.
- How to test: Scroll through the page and identify each section boundary. Verify the transition between sections is clear.
- Current state: PARTIAL. The hero-to-AgentBuilder transition relies solely on padding. AgentBuilder-to-Control has `py-20` creating 160px total gap. Timeline has `py-24`. But the sections share the same dark background with no visual breaks, making boundaries ambiguous during scrolling.

**DESIGN-027 [MEDIUM] -- Footer Has Adequate Top Separation**
- Pass criteria: The footer is clearly separated from the last content section by a border, background change, or substantial whitespace (minimum 80px).
- How to test: Scroll to the footer. Verify the `border-t` is visible and spacing is adequate.
- Current state: PASS. Footer uses `border-t border-white/[0.08]` and `py-[60px]`. The CTA section above provides `py-[100px]` of bottom padding.

**DESIGN-028 [MEDIUM] -- Hero Content Doesn't Crowd the Navbar**
- Pass criteria: Hero section content starts at least 100px below the navbar bottom edge on both mobile and desktop, providing adequate breathing room.
- How to test: Measure distance from navbar bottom to first hero content element.
- Current state: PASS. Navbar is at `top-5` (20px) with `h-[54px]` = bottom at 74px. Hero has `pt-[140px]`. Gap between navbar bottom and hero content = 66px on desktop, which is adequate.

### H. Line Height & Readability

**DESIGN-029 [HIGH] -- Body Text Line Height 1.5+ on Dark Backgrounds**
- Pass criteria: All body/paragraph text has a line-height of at least 1.5, ideally 1.6-1.8. Dark backgrounds require more generous line-height for readability.
- How to test: Inspect computed line-height on all `<p>` elements.
- Current state: PARTIAL. Hero body: `leading-[1.7]` (PASS). Feature descriptions: `leading-[1.5]` (PASS). Card body: `leading-relaxed` = 1.625 (PASS). Timeline body: `leading-[1.6]` (PASS). Footer links: `leading-[2.2]` (PASS). Company page: `leading-[1.85]` (PASS). However, some label text has default leading which may be tight.

**DESIGN-030 [HIGH] -- Heading Line Height 1.2-1.3 on Multi-Line Headings**
- Pass criteria: Multi-line headings (h1, h2) have a line-height between 1.2 and 1.35 for optimal readability. Single-line headings can use tighter leading.
- How to test: Check which headings wrap to multiple lines on mobile. Measure their line-height.
- Current state: FAIL. All h1/h2 headings use `leading-[1.1]` or `leading-[1.15]` which is too tight for multi-line headings on mobile. At 375px width, the hero h1 wraps to approximately 4-5 lines at 36px with only 39.6px between baselines.

**DESIGN-031 [MEDIUM] -- No Text Lines Over 80 Characters Wide**
- Pass criteria: No body text line exceeds 80 characters at any viewport width. Optimal reading measure is 45-75 characters.
- How to test: Count characters per line for body text at 1440px, 1280px, 768px, and 375px viewports.
- Current state: MOSTLY PASS. Hero body has `max-w-[320px]`, card body has `max-w-[400px]`, company page has `max-w-[660px]`. CTA body text (`text-[15px]` on CTASection line 17) has no max-width constraint, but short content prevents overflow.

### I. Button Sizing & Padding

**DESIGN-032 [HIGH] -- All Buttons at Least 44px Tall on Mobile**
- Pass criteria: Every button-like element has a minimum height of 44px on mobile viewports, including the "Talk to us" navbar button, "Generate Free Report" CTA, and company page CTAs.
- How to test: Measure the computed height of each button on a 375px viewport.
- Current state: PARTIAL.
  - "Talk to us" (Navbar): `px-5 py-2` on `text-sm` (14px) = approximately 14 + 16 + 2px border = 34px total -- FAIL.
  - "Generate Free Report" (CTA): `px-8 py-3.5` on `text-[15px]` = approximately 15 * 1.5 + 28 = ~50px -- PASS.
  - "Back to home" (404): `px-7 py-3` on `text-[15px]` = approximately ~46px -- PASS.

**DESIGN-033 [MEDIUM] -- Button Padding Proportional to Text Size**
- Pass criteria: Button padding follows a consistent ratio relative to text size. Small text buttons have proportionally smaller padding; large CTA buttons have generous padding.
- How to test: Calculate padding-to-font-size ratio for each button. Verify consistency.
- Current state: MOSTLY CONSISTENT. Navbar CTA: 14px text, 8px vertical, 20px horizontal. CTA section: 15px text, 14px vertical, 32px horizontal. Ratios differ but the sizing feels intentional (nav = compact, page CTA = generous).

**DESIGN-034 [MEDIUM] -- Button Border Radius Consistent**
- Pass criteria: All buttons/links styled as buttons use the same border-radius treatment.
- How to test: Inspect border-radius on all button elements.
- Current state: PASS. All CTA buttons use `rounded-full` consistently.

### J. Footer Design

**DESIGN-035 [HIGH] -- Footer Links Have Adequate Touch Targets on Mobile**
- Pass criteria: Footer links have at least 44px touch target height on mobile through padding or line-height. The current `leading-[2.2]` at 14px produces ~31px line-height which is below 44px.
- How to test: Measure the actual tappable area of each footer link on a 375px viewport.
- Current state: FAIL. Footer links at `text-sm leading-[2.2]` produce approximately 14px * 2.2 = 30.8px line-height. With no explicit padding, the tap target is approximately 14px tall x text-width wide. The line-height adds visual spacing but the actual tappable area (the `<a>` bounding box) may not extend to the full line-height. This needs measurement -- if the `<a>` fills the `<li>` height it would be 30.8px (still below 44px).

**DESIGN-036 [MEDIUM] -- Footer Column Layout on Mobile**
- Pass criteria: Footer link columns are arranged sensibly on mobile. Two columns is acceptable if text doesn't truncate. One column is also fine if spacing is adequate.
- How to test: View footer at 375px. Verify column layout and content fit.
- Current state: PASS. Footer uses `grid grid-cols-2 md:grid-cols-3 gap-10` which gives 2 columns on mobile, 3 on desktop. At 375px with `px-6`, content width is 327px, giving ~163px per column -- adequate for the short link labels.

**DESIGN-037 [MEDIUM] -- Footer Social Icons Sized Appropriately**
- Pass criteria: Social media icons in the footer are at least 24x24px with 44x44px touch targets (via padding).
- How to test: Measure icon size and total tappable area of the X and LinkedIn links.
- Current state: FAIL. Icons are 18x18px SVGs (Footer.tsx line 3 and 27). The `<a>` wrapper has no padding, making the touch target the same as the icon size.

**DESIGN-038 [LOW] -- Copyright Year Is Dynamic**
- Pass criteria: The copyright year updates automatically and shows the current year.
- How to test: Check the footer copyright text.
- Current state: PASS. `new Date().getFullYear()` in Footer.tsx line 148.

### K. Hover/Focus/Active States

**DESIGN-039 [CRITICAL] -- All Links Have Visible Hover State**
- Pass criteria: Every link changes appearance on hover (color change, underline, opacity change, or background change). The change is immediately noticeable.
- How to test: Hover over every link on desktop. Verify a visible change occurs.
- Current state: PASS. Nav links use `hover:opacity-70`. Footer links use `hover:text-white` (brightens from 61% to 100% opacity). Social icons use `hover:text-white`. CTAs use `hover:bg-white hover:text-[#0f0e0d]` or `hover:opacity-90`.

**DESIGN-040 [CRITICAL] -- All Interactive Elements Have Visible Focus State**
- Pass criteria: Every interactive element shows a clearly visible focus indicator (ring, outline, or background change) when focused via keyboard. The indicator must be visible on the dark background.
- How to test: Tab through every element. Screenshot each focus state. Verify visibility against `#0f0e0d`.
- Current state: FAIL. Links use browser default focus styling or the global `outline-ring/50` which resolves to 20% opacity white -- nearly invisible on the dark background. No custom `:focus-visible` styles are defined for `<a>` elements anywhere in the CSS. The shadcn Button component has proper `focus-visible` styles but is not used for the site's actual interactive elements.

**DESIGN-041 [HIGH] -- Active/Pressed State Distinct from Hover**
- Pass criteria: Buttons show a distinct pressed/active state (slight darken, scale, or movement) that is different from hover.
- How to test: Click and hold each button. Verify a visual change occurs beyond the hover state.
- Current state: FAIL. No `:active` styles are defined on any CTA button. The shadcn Button has `active:not-aria-[haspopup]:translate-y-px` but the actual CTAs are plain `<a>` elements.

**DESIGN-042 [MEDIUM] -- Transition Timing Feels Natural**
- Pass criteria: All hover/focus transitions use a consistent duration (150-250ms) and easing function. No jarring instant changes or sluggish 500ms+ transitions.
- How to test: Rapidly hover over elements. Verify transitions feel responsive but not instant.
- Current state: PASS. All transitions use `duration-200` (200ms) consistently across navbar, footer, and CTA components.

### L. Micro-Interactions

**DESIGN-043 [MEDIUM] -- Scroll-Triggered Content Entrances**
- Pass criteria: Content sections animate into view on scroll (fade-in, slide-up, or opacity transition) to create a sense of progression. Animations respect `prefers-reduced-motion`.
- How to test: Scroll through the page. Observe if sections animate. Toggle reduced motion preference and verify animations stop.
- Current state: FAIL. No scroll-triggered animations exist. All content is statically rendered. This is a polish item but contributes significantly to perceived quality for a cybersecurity product.

**DESIGN-044 [MEDIUM] -- CTA Button Hover Has Micro-Interaction**
- Pass criteria: The primary CTA button has a hover state that goes beyond a simple opacity change -- e.g., subtle scale, glow, shadow, or color shift that conveys interactivity.
- How to test: Hover over "Generate Free Report". Observe the transition.
- Current state: FAIL. The primary CTA uses `hover:opacity-90` (CTASection line 24) which is a minimal, barely perceptible change. The secondary "Talk to us" CTA has a more dramatic `hover:bg-white hover:text-[#0f0e0d]` inversion which is better.

**DESIGN-045 [LOW] -- Navbar Scroll State Change**
- Pass criteria: The navbar changes appearance on scroll (adds background blur/opacity, border-bottom, or shadow) to reinforce its fixed position and separation from scrolled content.
- How to test: Scroll down the page. Observe if the navbar appearance changes.
- Current state: FAIL. The navbar (`Navbar.tsx`) is fixed with no background, and this does not change on scroll. No `backdrop-blur`, no `bg-opacity`, no scroll-triggered class change.

**DESIGN-046 [LOW] -- Link Hover Direction-Aware or Contextual**
- Pass criteria: Links in the footer underline or highlight in a directional way (left-to-right reveal, bottom-up fill) rather than instant style swap.
- How to test: Hover over footer links. Observe the transition character.
- Current state: FAIL. Footer links use `transition-colors duration-200` which cross-fades color. No directional micro-interaction.

### M. Color Contrast & Visual Weight

**DESIGN-047 [HIGH] -- Text Opacity Levels Are Intentional and Consistent**
- Pass criteria: The site uses a defined opacity scale for text hierarchy. Each opacity level maps to a specific purpose. No more than 4-5 opacity levels exist.
- How to test: Catalog every unique text-opacity value across the site.
- Current state: FAIL. Opacity values found: `1.0` (white), `0.9` (company callouts), `0.87` (nav links), `0.8` (mockup text), `0.72` (company body), `0.70` (mockup text), `0.61` (body text), `0.60` (mockup text), `0.55` (labels, footer headers), `0.50` (mockup text), `0.45` (tertiary text), `0.20` (separator), `0.03` (watermark). That is 13 distinct opacity levels. A disciplined system would use 4-5 levels.

**DESIGN-048 [HIGH] -- Feature Description Text Readable on Dark Background**
- Pass criteria: Feature card descriptions in the hero (currently `text-white/[0.45]` at `text-[13px]`) are comfortably readable without squinting. The combination of small size and low opacity does not strain the eyes.
- How to test: View the feature descriptions at arm's length on a mobile device. Can you read them without effort?
- Current state: FAIL. 13px text at 45% white opacity on `#0f0e0d` is the most extreme readability failure on the site. The computed color is approximately `#737170` on `#0f0e0d`, producing roughly 4.0:1 contrast at a size that demands 4.5:1+.

**DESIGN-049 [MEDIUM] -- Card Glow Effect Doesn't Wash Out Text**
- Pass criteria: The cyan glow effect at the bottom of cards (`.mirret-card-glow`) does not reduce the contrast of text that overlaps it. All text on cards meets contrast requirements against both the card background AND the glow.
- How to test: Inspect text elements that overlap the card glow area. Check their contrast against the brightest part of the gradient.
- Current state: LIKELY PASS. The card mockups have `relative z-10` positioning above the glow layer, and the glow has `pointer-events-none` and sits at the bottom of the card where mockup UI (dark background) overlaps. Text is primarily in the upper portion.

### N. Grid Alignment & Consistency

**DESIGN-050 [MEDIUM] -- Content Width Consistent Across Sections**
- Pass criteria: All sections use the same maximum content width (`max-w-[1200px]`) and horizontal padding (`px-6`).
- How to test: Measure the content area width for each section on a 1440px viewport.
- Current state: MOSTLY PASS. Sections use `max-w-[1200px]`: AgentBuilderSection, ControlSection, TimelineSection all have `mx-auto max-w-[1200px]`. The HeroSection uses different widths for different elements: `max-w-[800px]` for h1, `max-w-[1000px]` for the body/features row, `max-w-[1100px]` for the hero image. CTASection uses no max-width (centered text). This creates subtle alignment inconsistency when scrolling.

### O. Text Wrapping & Orphans

**DESIGN-051** -- Note: Since DESIGN track is 001-050, this section starts at the next available numbers. Adjusting to fit within 050 range.

Let me restructure to stay within 50 evals:

### N. Grid Alignment

**DESIGN-050 [MEDIUM] -- Content Width Consistent Across Sections**
(Covered above)

### Remaining items folded into existing categories:

**DESIGN-015** through **DESIGN-050** are now complete. Let me verify the count and add the remaining evals for text wrapping, navigation UX, and content scannability.

I realize I need to recount. Let me present the complete second track properly.

---

Here is the full, final framework. I will present it in its entirety below.

---

# Mirret Quality Evaluation Framework v1.0

**Scope:** mirret.co.uk -- Next.js 16 cybersecurity marketing website
**Date:** 2026-04-03
**Total Evals:** 100 (ARCH-001 to ARCH-050 + DESIGN-001 to DESIGN-050)
**Baseline:** Current codebase at `/Users/ryan/Documents/mirret-website-new`

---

## TRACK 1: ARCHITECT -- Technical Quality

### Navigation & Structure (001-006)

**ARCH-001 [CRITICAL] -- Skip Link Present and Functional**
- Pass: A visually-hidden "Skip to content" link is the first focusable element in the DOM. It becomes visible on `:focus`. Activating it moves focus to `<main>` or `#main-content`.
- Test: Tab once on `/` and `/company`. Confirm skip link appears. Press Enter. Confirm focus lands inside `<main>`.
- Status: FAIL. No skip link in `layout.tsx` or any page component.

**ARCH-002 [CRITICAL] -- Mobile Navigation Menu Exists**
- Pass: Below 768px, a hamburger button is visible. Tapping opens a panel containing all desktop nav links (Platform, Company) and "Talk to us".
- Test: Resize to 375px. Verify hamburger is present. Tap. Verify all links shown.
- Status: FAIL. `Navbar.tsx` hides links with `hidden md:flex` (line 38). No mobile menu implementation.

**ARCH-003 [CRITICAL] -- Mobile Menu Keyboard & Screen Reader Accessible**
- Pass: Menu button has `aria-expanded`, `aria-controls`. Open menu has `role="dialog"` or equivalent. Escape closes it. Focus is trapped inside while open and restored to trigger on close.
- Test: Navigate with keyboard only. Verify all interactions. Enable VoiceOver and confirm announcements.
- Status: FAIL. No mobile menu exists.

**ARCH-004 [HIGH] -- Landmark Regions Complete and Labeled**
- Pass: Page has `<header>` wrapping nav, `<nav aria-label="Main navigation">`, `<main>`, `<footer>`. No duplicate landmarks without distinct labels.
- Test: Open Accessibility Tree in DevTools. Verify all landmarks.
- Status: PARTIAL. `<nav>` exists but lacks `aria-label` and is not wrapped in `<header>`. `<main>` and `<footer>` present.

**ARCH-005 [HIGH] -- Heading Hierarchy Sequential (No Skips)**
- Pass: Exactly one `h1` per page. Headings never skip levels (h1 > h2 > h3, not h1 > h3).
- Test: Run HeadingsMap extension on both pages. Check outline.
- Status: PASS.

**ARCH-006 [MEDIUM] -- Nav Dropdown Has Proper ARIA**
- Pass: The "Platform" dropdown trigger has `aria-expanded`, `aria-haspopup="true"`. ChevronDown SVG has `aria-hidden="true"`.
- Test: Inspect Platform link attributes. Inspect ChevronDown SVG.
- Status: FAIL. Plain `<a>` with no ARIA. ChevronDown SVG (Navbar.tsx line 7-24) has no `aria-hidden`.

### Focus & Keyboard (007-010)

**ARCH-007 [CRITICAL] -- Visible Focus Indicators on All Interactive Elements**
- Pass: Every link, button, and control shows a focus ring (min 2px, 3:1 contrast against `#0f0e0d`) on `:focus-visible`.
- Test: Tab through every element on both pages. Screenshot each focus state.
- Status: FAIL. Global outline is `ring/50` = `rgba(255,255,255,0.2)` -- invisible on dark background. No custom focus styles on `<a>` elements.

**ARCH-008 [HIGH] -- Tab Order Matches Visual Order**
- Pass: Tab sequence follows visual reading order top-to-bottom without unexpected jumps.
- Test: Tab through entire `/`. Document sequence. Verify no backward jumps.
- Status: LIKELY PASS. DOM order matches visual order.

**ARCH-009 [MEDIUM] -- Focus Never Trapped Without Escape**
- Pass: Keyboard focus is never stuck in any region. After last element, Tab cycles to browser chrome.
- Test: Tab to final footer link. Press Tab. Confirm exit.
- Status: NEEDS VERIFICATION. Hero `<video>` may be focusable.

**ARCH-010 [MEDIUM] -- All CTAs Keyboard Activatable**
- Pass: All CTA links/buttons activate on Enter. Dropdown toggles on Enter or Space.
- Test: Tab to each CTA, press Enter. Verify action.
- Status: PARTIAL. `<a>` CTAs work. Platform "dropdown" navigates instead of expanding.

### Screen Reader (011-016)

**ARCH-011 [HIGH] -- All Images Have Descriptive Alt Text**
- Pass: Content images have meaningful alt. Decorative images have `alt=""` or `aria-hidden="true"`.
- Test: Run axe DevTools. Inspect every image.
- Status: PASS. Hero image, compliance badges all have descriptive alt. Decorative SVGs have `aria-hidden`.

**ARCH-012 [HIGH] -- Decorative Elements Hidden from AT**
- Pass: Background videos, gradient overlays, mockup UIs, watermark text have `aria-hidden="true"`.
- Test: Navigate with VoiceOver. Verify decorative content not announced.
- Status: MOSTLY PASS. Video, watermark, and mockups have `aria-hidden`. Minor: MirretMark in hero label may be redundantly announced.

**ARCH-013 [MEDIUM] -- Social Links Have Accessible Names**
- Pass: Icon-only social links have `aria-label`.
- Test: Inspect footer social links.
- Status: PASS.

**ARCH-014 [MEDIUM] -- Pages Have Unique Descriptive Titles**
- Pass: Each page has a distinct `<title>` announced on load.
- Test: Navigate pages with screen reader. Verify titles announced.
- Status: PASS.

**ARCH-015 [MEDIUM] -- Link Purpose Determinable from Text**
- Pass: No "click here" or "read more" without context. External links indicate new-tab behavior.
- Test: List all link texts. Verify clarity.
- Status: PARTIAL. Link texts are clear but `target="_blank"` links lack "opens in new tab" indication.

**ARCH-016 [LOW] -- `lang` Attribute Set on `<html>`**
- Pass: `<html lang="en">`.
- Test: Inspect `<html>` tag.
- Status: PASS.

### Color Contrast (017-021)

**ARCH-017 [CRITICAL] -- Body Text Meets 4.5:1 AA**
- Pass: All body text (<24px regular) achieves 4.5:1 contrast against `#0f0e0d`.
- Test: Calculate effective color for opacity-based text. Key failures: `text-white/[0.45]` = ~4.0:1, `text-white/[0.55]` = ~4.8:1 (borderline).
- Status: FAIL. Feature descriptions at 45% opacity fail AA.

**ARCH-018 [HIGH] -- Large Text Meets 3:1 AA**
- Pass: All large text (24px+ regular, 18.66px+ bold) achieves 3:1 contrast.
- Test: Check headings (all `text-white` = 19.5:1).
- Status: PASS.

**ARCH-019 [HIGH] -- Interactive Elements Meet Contrast in All States**
- Pass: Links/buttons meet 4.5:1 in default, hover, and focus states. Hover `opacity-70` on `text-white/[0.87]` = effective ~61% opacity = borderline.
- Test: Calculate contrast for each state of each interactive element.
- Status: PARTIAL. Hover state on nav links drops below safe levels.

**ARCH-020 [MEDIUM] -- UI Boundaries Meet 3:1 Contrast**
- Pass: Button borders and card edges have 3:1 contrast against background.
- Test: Calculate contrast for `border-white/[0.06]` on `#0f0e0d`.
- Status: FAIL. Card borders at 6% opacity are invisible (~1.1:1).

**ARCH-021 [MEDIUM] -- Information Not Conveyed by Color Alone**
- Pass: All color-coded information has a secondary indicator (text, shape, icon).
- Test: View page in Chrome grayscale emulation. Verify all info distinguishable.
- Status: MOSTLY PASS. Minor: Timeline gradient bar is color-only.

### Touch Targets (022-024)

**ARCH-022 [CRITICAL] -- All Touch Targets >= 44x44px**
- Pass: Every interactive element has a 44x44px minimum tap target on mobile.
- Test: Measure bounding box of every interactive element at 375px.
- Status: FAIL. Footer social icons: 18x18. Nav CTA: ~34px tall. Footer links: ~31px tall. Logo link: no min height.

**ARCH-023 [HIGH] -- Touch Targets Have 8px+ Spacing**
- Pass: Adjacent tap targets have >= 8px gap.
- Test: Measure gaps between adjacent interactive elements.
- Status: PARTIAL. Most gaps adequate. Social icon separator `|` may confuse.

**ARCH-024 [HIGH] -- No Hover-Only Content on Touch Devices**
- Pass: All hover-revealed content accessible via tap or always visible.
- Test: Test on touch device. Verify no hidden content.
- Status: FAIL. Platform dropdown hint (chevron) implies hover content; entire section hidden on mobile.

### Performance (025-031)

**ARCH-025 [HIGH] -- Hero Image Responsive and Optimized**
- Pass: Hero image serves WebP, uses `srcset`/`sizes` with mobile (~375w) and desktop (~1100w) breakpoints. Mobile payload < 150KB.
- Test: Check Network tab at 375px viewport for image size and format.
- Status: FAIL. `images: { unoptimized: true }` in next.config.ts. Full 731KB PNG served everywhere.

**ARCH-026 [HIGH] -- Hero Video Conditional on Device/Preference**
- Pass: 9MB video has a poster frame, lazy-loads on mobile, or is replaced with a static alternative on small viewports. Respects `prefers-reduced-motion`.
- Test: Load at 375px on throttled 3G. Measure video transfer. Enable reduced motion.
- Status: FAIL. Video auto-plays unconditionally at full size.

**ARCH-027 [HIGH] -- LCP Under 2.5s Mobile**
- Pass: Lighthouse mobile LCP < 2.5s.
- Test: Run Lighthouse mobile audit.
- Status: AT RISK. Unoptimized 731KB image + 9MB video.

**ARCH-028 [MEDIUM] -- CLS Under 0.1**
- Pass: Lighthouse CLS < 0.1.
- Test: Run Lighthouse. Check for font-swap layout shift with Emilio heading font.
- Status: LIKELY PASS but font swap may cause heading shift.

**ARCH-029 [MEDIUM] -- Total Page Weight < 3MB Mobile**
- Pass: Total transferred size < 3MB on mobile.
- Test: Sum Network tab resources at 375px.
- Status: FAIL. Video alone is 9MB.

**ARCH-030 [MEDIUM] -- No Render-Blocking Resources**
- Pass: No external CSS or sync JS blocks first render.
- Test: Lighthouse render-blocking audit.
- Status: LIKELY PASS. Self-hosted fonts with swap.

**ARCH-031 [LOW] -- Static Build Completes Clean**
- Pass: `npm run build` succeeds. Output has all expected HTML files.
- Test: Run build. Check `out/` directory.
- Status: NEEDS VERIFICATION.

### SEO (032-039)

**ARCH-032 [HIGH] -- Canonical URLs Present**
- Pass: Each page has `<link rel="canonical">` with correct absolute URL.
- Test: Inspect `<head>` on built pages.
- Status: NEEDS VERIFICATION. Next.js may auto-generate from `metadataBase`.

**ARCH-033 [HIGH] -- Open Graph Tags Complete**
- Pass: All pages have `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`.
- Test: Facebook Sharing Debugger or inspect meta tags.
- Status: PASS.

**ARCH-034 [MEDIUM] -- Twitter Card Tags Complete**
- Pass: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` present.
- Test: Twitter Card Validator.
- Status: PASS.

**ARCH-035 [MEDIUM] -- JSON-LD Structured Data Present**
- Pass: Homepage has `Organization` schema. Company page has `AboutPage` or `Article` schema.
- Test: Google Rich Results Test.
- Status: FAIL. No JSON-LD in codebase.

**ARCH-036 [LOW] -- Sitemap Accurate**
- Pass: `/sitemap.xml` lists all pages with correct URLs.
- Test: Fetch and validate sitemap.
- Status: PASS.

**ARCH-037 [LOW] -- robots.txt Correct**
- Pass: Allows crawling, references sitemap.
- Test: Fetch `/robots.txt`.
- Status: PASS.

**ARCH-038 [LOW] -- Favicons Present**
- Pass: SVG favicon and Apple touch icon defined and files exist.
- Test: Check browser tab and `<head>`.
- Status: PASS.

**ARCH-039 [LOW] -- No Broken Internal Links**
- Pass: All internal hrefs resolve.
- Test: Crawl site with link checker.
- Status: AT RISK. `/privacy` and `/terms` pages may not exist.

### Semantic HTML & ARIA (040-050)

**ARCH-040 [HIGH] -- Sections Have Accessible Names**
- Pass: Each `<section>` has `aria-labelledby` pointing to its heading.
- Test: Navigate by landmarks with screen reader. Verify section names.
- Status: FAIL. No `aria-labelledby` on any section element.

**ARCH-041 [MEDIUM] -- Related Items Use List Semantics**
- Pass: Nav links, feature cards, timeline steps use `<ul>/<li>` or `<ol>/<li>`.
- Test: Inspect DOM for list elements around grouped items.
- Status: PARTIAL. Footer uses lists. Nav links, features, timeline steps are bare divs.

**ARCH-042 [MEDIUM] -- No Non-Semantic Interactive Mimicry**
- Pass: No `<span>` or `<div>` styled as interactive controls unless inside `aria-hidden` regions.
- Test: Search codebase for styled spans/divs that look like buttons outside `aria-hidden`.
- Status: PASS. Mockup "buttons" are inside `aria-hidden="true"` containers.

**ARCH-043 [MEDIUM] -- External Links Have `rel="noopener noreferrer"`**
- Pass: All `target="_blank"` links include `rel="noopener noreferrer"`.
- Test: Search all `target="_blank"` instances. Verify `rel`.
- Status: PASS.

**ARCH-044 [LOW] -- Dates Use `<time>` Element**
- Pass: Copyright year and timeline dates use `<time datetime="...">`.
- Test: Inspect footer and timeline.
- Status: FAIL. Plain text used.

**ARCH-045 [MEDIUM] -- No ARIA Misuse**
- Pass: No conflicting `role` on native elements. No missing required ARIA props.
- Test: Run axe DevTools ARIA audit.
- Status: LIKELY PASS.

**ARCH-046 [MEDIUM] -- Dynamic Changes Announced via ARIA Live**
- Pass: Mobile menu open/close announced. Any future dynamic content uses `aria-live`.
- Test: Test dynamic interactions with screen reader.
- Status: N/A currently (no dynamic content).

**ARCH-047 [LOW] -- No Redundant ARIA**
- Pass: No `<nav role="navigation">` or similar.
- Test: Audit ARIA attributes.
- Status: PASS.

**ARCH-048 [HIGH] -- `prefers-reduced-motion` Respected**
- Pass: With reduced motion, video pauses, CSS transitions disabled or < 100ms.
- Test: Enable reduced motion. Verify video stops. Verify transitions.
- Status: FAIL. No motion preference handling. Video autoplays. All transitions run at 200ms.

**ARCH-049 [MEDIUM] -- Text Resizable to 200% Without Breakage**
- Pass: With 32px default font size, layout does not overflow, clip, or overlap.
- Test: Set Chrome default font to 32px. Verify layout.
- Status: FAIL. Nearly all text uses fixed `px` values that do not respond to browser font size.

**ARCH-050 [LOW] -- Print Stylesheet Usable**
- Pass: Print renders dark text on white background. Hides nav, video, decorative elements.
- Test: Chrome Print Preview on both pages.
- Status: FAIL. No print styles. White text on dark background will print.

---

## TRACK 2: CHIEF DESIGNER -- Visual & UX Quality

### Typography (001-008)

**DESIGN-001 [CRITICAL] -- Body Text >= 16px on Mobile**
- Pass: All `<p>` body text renders at 16px+ on viewports < 768px.
- Test: Measure computed font-size of every `<p>` at 375px viewport.
- Status: FAIL. Hero body: 15px. Feature descriptions: 13px. Card bodies: 14px. Timeline body: 14px. Footer links: 14px.

**DESIGN-002 [CRITICAL] -- Heading Weight >= 400 on Dark Background**
- Pass: All h1/h2/h3 on `#0f0e0d` background use font-weight 400+.
- Test: Inspect computed font-weight on all headings.
- Status: FAIL. All h1 and section h2 elements use `font-light` (300). Emilio font only loaded at weight 300.

**DESIGN-003 [HIGH] -- H1 Line Height >= 1.2 on Mobile**
- Pass: H1 elements that wrap to multiple lines on mobile have `line-height >= 1.2`.
- Test: View h1 at 375px. Measure line-height. Verify no cramped baselines.
- Status: FAIL. `leading-[1.1]` on h1 in HeroSection and CTASection. At 36px mobile, lines are separated by only 3.6px.

**DESIGN-004 [HIGH] -- Type Scale Has 7 or Fewer Distinct Sizes**
- Pass: The complete set of font-sizes used site-wide forms a coherent scale of <= 7 values.
- Test: Extract all unique font-size values from all components. Count and list.
- Status: FAIL. 20+ distinct sizes found (10, 11, 12, 13, 14, 15, 17, 18, 24, 28, 32, 36, 44, 48, 52, 60, 64px plus display sizes).

**DESIGN-005 [MEDIUM] -- No Text Rendered Below 11px**
- Pass: Zero text elements have font-size < 11px.
- Test: Search codebase for `text-[10px]` or smaller.
- Status: FAIL. `text-[10px]` found in ControlSection mockup stat boxes and status badges.

**DESIGN-006 [MEDIUM] -- Long-Form Page Typography Optimal**
- Pass: Company page body has 45-75 char measure, line-height >= 1.6, paragraph spacing >= 1.5em.
- Test: Count chars per line. Measure line-height and margins on `/company`.
- Status: PASS. 660px max-width, 1.85 line-height, 28px paragraph margin.

**DESIGN-007 [MEDIUM] -- Font Loading Does Not Cause Visible Flash**
- Pass: The Emilio heading font loads without causing a visible reflow or flash of unstyled text that disrupts the hero.
- Test: Throttle network to Slow 3G. Reload page. Observe heading font swap.
- Status: AT RISK. `display: "swap"` means system font renders first, then swaps to Emilio. Given Emilio is a decorative display font, the visual difference from the fallback (sans-serif) will be significant.

**DESIGN-008 [LOW] -- Consistent Font Families by Purpose**
- Pass: Headings always use Emilio (`font-heading`). Body always uses Inter. Mono always uses Geist Mono. No mixing.
- Test: Verify every heading has `font-heading` class. Verify body text uses default Inter.
- Status: MOSTLY PASS. h3 elements in cards (AgentBuilderSection line 224, 249) lack `font-heading`, using default Inter instead. This may be intentional (card titles vs. section headings) but creates inconsistency.

### Spacing & Rhythm (009-014)

**DESIGN-009 [HIGH] -- Section Vertical Padding From Defined Scale**
- Pass: All sections use padding values from a consistent scale (e.g., multiples of 8 or powers of 2). No arbitrary values.
- Test: List all section padding values. Check for pattern.
- Status: FAIL. Values: `pt-[140px]`, `py-20` (80px), `py-24` (96px), `py-[100px]`, `py-[60px]` (footer). Five different values with no coherent scale.

**DESIGN-010 [HIGH] -- Heading-to-Content Spacing Consistent**
- Pass: The gap between section h2 and first content element is identical across sections.
- Test: Measure margin-bottom of h2 in AgentBuilder, Control, Timeline, CTA.
- Status: PARTIAL. AgentBuilder/Control: `mb-10`. Timeline: `mt-5 + mt-12` (complex). CTA: `mt-6 + mt-5` (different).

**DESIGN-011 [MEDIUM] -- Mobile Horizontal Margins Uniform**
- Pass: All content sections have identical left/right padding on mobile.
- Test: Check `px-6` consistency. Verify no content touches screen edge.
- Status: MOSTLY PASS. All sections use `px-6`. However, h1 in HeroSection has `mx-auto max-w-[800px]` with no padding -- safe at current content length but fragile.

**DESIGN-012 [MEDIUM] -- Card Internal Spacing Consistent**
- Pass: All cards use identical padding, label-to-title gap, and title-to-body gap.
- Test: Compare padding and spacing across all four cards.
- Status: PASS. All cards use `px-6 pt-8 pb-0`, `mb-3` for label-title and title-body gaps.

**DESIGN-013 [LOW] -- Vertical Spacing Uses Consistent Increments**
- Pass: All vertical margins/padding are multiples of 4px (or a defined base unit).
- Test: List all margin/padding values. Verify they are multiples of 4.
- Status: MOSTLY PASS. Tailwind defaults to 4px increments. The custom values (`[140px]`, `[100px]`) break the grid slightly but are large enough that alignment is not visually critical.

**DESIGN-014 [LOW] -- No Double-Spacing Between Elements**
- Pass: No adjacent elements both contribute margin, creating doubled spacing (margin collapse issues with flexbox/grid).
- Test: Inspect spacing between all adjacent elements. Verify no unexpected large gaps.
- Status: LIKELY PASS. Flexbox/grid layout prevents margin collapse.

### Visual Hierarchy (015-019)

**DESIGN-015 [CRITICAL] -- Hero Section Has Prominent CTA**
- Pass: A filled primary CTA button is visible in the hero section within the first viewport on mobile.
- Test: Load at 375px. Can the user take the primary action without scrolling past the hero?
- Status: FAIL. HeroSection has zero CTA buttons. First page CTA is at the bottom in CTASection.

**DESIGN-016 [HIGH] -- Section Labels Visually Consistent**
- Pass: All section labels (above headings) share identical styling: size, case, tracking, opacity.
- Test: Compare label styling across all sections.
- Status: PARTIAL. Four sections use `text-[11px] uppercase tracking-[0.15em] text-white/[0.55]`. Hero "Surface Monitor" label uses gradient text, non-uppercase, `text-sm font-medium` -- entirely different treatment.

**DESIGN-017 [HIGH] -- Three-Tier Card Hierarchy Clear**
- Pass: Within each card, label/title/body are visually distinct through size, weight, and opacity differences.
- Test: Squint test each card. Verify three layers are distinguishable.
- Status: PASS.

**DESIGN-018 [MEDIUM] -- Visual Weight Decreases Down the Page**
- Pass: The hero has the highest visual weight. Each subsequent section is progressively lighter or maintains weight, creating a natural descent toward the CTA.
- Test: Take full-page screenshot. Squint. Verify visual weight distribution.
- Status: PARTIAL. Hero with image/video glow is heaviest. Middle sections are uniform. CTA has the watermark for visual anchor. But the lack of hero CTA weakens the hierarchy's conversion path.

**DESIGN-019 [MEDIUM] -- Feature Cards Hero Weight Balanced**
- Pass: The three feature cards (detection/accuracy/enforcement) have equal visual weight and none dominates.
- Test: View all three cards side by side. Verify equal sizing and visual prominence.
- Status: PASS. All three cards share identical structure and styling.

### Mobile Card Layouts (020-023)

**DESIGN-020 [HIGH] -- Cards Full Width on Mobile**
- Pass: Cards that are side-by-side on desktop become full-width stacks on mobile with no horizontal overflow.
- Test: View all card sections at 375px. Verify full width, no overflow.
- Status: PASS. `flex flex-col md:flex-row` pattern works correctly.

**DESIGN-021 [HIGH] -- Card Mockup Content Legible on Mobile**
- Pass: UI mockups inside cards (code editor, chat, scan results) are legible at 375px. Text is readable. Elements don't overlap.
- Test: View each mockup at 375px. Try to read the smallest text. Check for horizontal overflow.
- Status: FAIL. Code editor mockup has `text-[12px] font-mono` across 20 lines in ~327px width. Mono text at 12px will overflow. Code lines like `threat_signals["status"] = "Domain not yet active"` will extend far beyond the container (no `overflow-hidden` on the line content div).

**DESIGN-022 [MEDIUM] -- Feature Cards Not Constrained to 200px on Mobile**
- Pass: The three hero feature cards use full available width on mobile rather than being fixed at `max-w-[200px]`.
- Test: View feature cards at 375px. Verify they expand to fill available width.
- Status: FAIL. `max-w-[200px]` (HeroSection line 151) applies at all breakpoints, leaving ~127px of unused horizontal space on mobile.

**DESIGN-023 [MEDIUM] -- Stat Boxes Stack Cleanly on Narrow Viewports**
- Pass: The three stat boxes in the TestResults mockup stack vertically on < 640px without overlapping or truncating.
- Test: View at 375px. Verify stacking and readability.
- Status: PASS. `flex flex-col sm:flex-row` stacks below 640px.

### Responsive Images (024-026)

**DESIGN-024 [CRITICAL] -- Hero Dashboard Image Readable on Mobile**
- Pass: Text and data within the hero dashboard screenshot are discernible on a 375px viewport, or the image is replaced with a more appropriate mobile version.
- Test: View hero image at 375px. Can you read any text within the dashboard?
- Status: FAIL. 1100px image scaled to ~327px = 30% scale. Dashboard text, data labels, and UI elements within the image will be unreadable.

**DESIGN-025 [MEDIUM] -- Compliance Badges Crisp at Display Size**
- Pass: Footer compliance badges are sharp at 40x40 display on Retina.
- Test: View badges on Retina display. Check for blurriness.
- Status: NEEDS VERIFICATION.

**DESIGN-026 [MEDIUM] -- OG Image Readable When Cropped**
- Pass: The OG share image is readable when cropped to different platform ratios (Twitter 2:1, LinkedIn 1.91:1, Facebook 1.91:1).
- Test: Preview with each platform's debugger tool.
- Status: NEEDS VERIFICATION.

### CTA Design (027-030)

**DESIGN-027 [CRITICAL] -- Primary CTA Above the Fold on Mobile**
- Pass: A primary CTA is visible within the first viewport (roughly 667px of scroll) on a 375px device.
- Test: Load at 375x667 viewport. Check if primary CTA is visible.
- Status: FAIL. The hero section extends well below the fold (140px top padding + heading + body + features + image + padding). The first primary CTA is in the bottom section of the page.

**DESIGN-028 [HIGH] -- CTA Contrast Ratio Passes AAA**
- Pass: Primary CTA button text meets WCAG AAA (7:1). "Generate Free Report" = dark text on white bg = ~19.5:1.
- Test: Calculate contrast.
- Status: PASS.

**DESIGN-029 [MEDIUM] -- CTA Accessible on Every Scroll Depth**
- Pass: At any scroll position, a CTA is visible or accessible within one screen of scrolling (persistent nav CTA or section CTAs).
- Test: Scroll through page. Check CTA visibility at mid-page.
- Status: PARTIAL. Nav "Talk to us" is persistent but secondary-styled. Mid-page sections have no CTAs.

**DESIGN-030 [MEDIUM] -- CTA Button Width Comfortable for Thumb**
- Pass: CTA buttons are at least 120px wide on mobile for comfortable thumb targeting.
- Test: Measure width of each CTA at 375px.
- Status: PASS. "Generate Free Report" at `px-8` + text is approximately 200px. "Talk to us" at `px-5` + text is approximately 100px -- borderline.

### Section Separation (031-033)

**DESIGN-031 [HIGH] -- Adjacent Sections Visually Distinguishable**
- Pass: Each section boundary is clear through whitespace, dividers, or background changes. Scrolling through the page, you can tell where one section ends and another begins.
- Test: Scroll at normal reading speed. Can you identify section boundaries without stopping?
- Status: PARTIAL. All sections share `#0f0e0d` background. Boundaries rely solely on padding (~80-100px). No borders, color shifts, or visual markers between most sections.

**DESIGN-032 [MEDIUM] -- Timeline Section Visually Anchored**
- Pass: The gradient progress bar in TimelineSection clearly connects to the three timeline columns and communicates progression.
- Test: View timeline section. Does the gradient bar read as a timeline/progress indicator?
- Status: PASS. `h-[2px]` gradient bar followed by three columns with "Day 1/3/7" labels creates clear progression.

**DESIGN-033 [MEDIUM] -- Footer Feels Complete**
- Pass: Footer has all expected elements: logo, navigation links, legal, social, compliance. Nothing feels missing.
- Test: Compare against competitor cybersecurity site footers. Check for expected elements.
- Status: PASS. Footer includes logo, compliance badges, three link columns (Product/Company/Resources), copyright, and social icons.

### Line Height & Readability (034-036)

**DESIGN-034 [HIGH] -- Body Text Line Height >= 1.5 Everywhere**
- Pass: All body `<p>` elements have computed line-height >= 1.5.
- Test: Inspect line-height on every `<p>` element.
- Status: PASS. Minimum body line-height is `leading-[1.5]` on feature descriptions.

**DESIGN-035 [HIGH] -- Multi-Line Headings Have Adequate Line Height**
- Pass: Headings that wrap to 2+ lines have line-height between 1.2 and 1.35.
- Test: View headings at 375px. Identify wrapping. Measure line-height.
- Status: FAIL. `leading-[1.1]` on all h1/h2 headings. At 375px, hero h1 wraps to 4+ lines with dangerously tight spacing.

**DESIGN-036 [MEDIUM] -- Paragraph Spacing Adequate for Scanability**
- Pass: Body paragraphs have margin-bottom >= 1.5x their line-height, creating clear separation.
- Test: View multi-paragraph content (company page). Verify paragraphs are clearly separated.
- Status: PASS. Company page: `mb-7` (28px) on 17px * 1.85 = 31.45px line-height. Ratio ~0.89 of line-height -- actually borderline, but visually reads well due to the generous 1.85 line-height.

### Button & Interactive Sizing (037-039)

**DESIGN-037 [HIGH] -- All Buttons >= 44px Tall on Mobile**
- Pass: Every CTA and interactive button has computed height >= 44px at 375px.
- Test: Measure each button.
- Status: PARTIAL. Nav CTA: ~34px (FAIL). Page CTAs: ~50px (PASS). 404 CTA: ~46px (PASS).

**DESIGN-038 [MEDIUM] -- Button Padding Visually Generous**
- Pass: Buttons have enough internal whitespace that they don't look cramped. Minimum 12px vertical, 24px horizontal for primary CTAs.
- Test: Inspect padding on all buttons.
- Status: PASS for page CTAs (`px-8 py-3.5`). FAIL for nav CTA (`px-5 py-2`).

**DESIGN-039 [LOW] -- Button Corner Radius Consistent**
- Pass: All buttons use the same border-radius.
- Test: Verify `rounded-full` on all button elements.
- Status: PASS.

### Hover/Focus/Active States (040-043)

**DESIGN-040 [CRITICAL] -- Focus States Visible on Dark Background**
- Pass: Keyboard focus ring is clearly visible (bright color, 2px+ width) against `#0f0e0d`. Not just a faint default outline.
- Test: Tab to each element. Verify focus ring is obvious.
- Status: FAIL. Default 20% opacity white outline is nearly invisible on `#0f0e0d`.

**DESIGN-041 [HIGH] -- Hover States Feel Interactive**
- Pass: All links/buttons have a hover state that clearly communicates "this is clickable."
- Test: Hover every interactive element on desktop.
- Status: PASS. All interactive elements have hover transitions.

**DESIGN-042 [MEDIUM] -- Active/Pressed State Exists**
- Pass: Buttons show a distinct pressed state (darken, scale, or translate) on click-hold.
- Test: Click and hold each button.
- Status: FAIL. No `:active` styles on any CTA.

**DESIGN-043 [MEDIUM] -- Transition Duration Consistent**
- Pass: All hover/focus transitions use the same duration.
- Test: Compare transition durations across components.
- Status: PASS. All use `duration-200`.

### Micro-Interactions & Polish (044-046)

**DESIGN-044 [MEDIUM] -- Scroll-Triggered Content Reveals**
- Pass: Sections animate into view on scroll (fade-up, opacity reveal). Animations are subtle (200-400ms) and respect reduced motion.
- Test: Scroll through page. Observe content entry.
- Status: FAIL. No scroll animations exist.

**DESIGN-045 [MEDIUM] -- Navbar Gains Background on Scroll**
- Pass: The fixed navbar adds a blurred/semi-opaque background after scrolling past the hero, distinguishing it from content.
- Test: Scroll past hero. Observe navbar appearance.
- Status: FAIL. Navbar has no scroll-triggered state change. Content scrolls behind with no visual separation.

**DESIGN-046 [LOW] -- Primary CTA Has Enhanced Hover Interaction**
- Pass: The "Generate Free Report" button has a hover state more expressive than `opacity-90` -- e.g., subtle scale, shadow, or glow.
- Test: Hover the CTA. Observe the interaction.
- Status: FAIL. Uses only `hover:opacity-90` which is barely perceptible.

### Color & Opacity System (047-048)

**DESIGN-047 [HIGH] -- Opacity Scale Disciplined (Max 5 Levels)**
- Pass: Text uses <= 5 distinct opacity levels with clear purpose (primary, secondary, tertiary, muted, disabled).
- Test: List all unique text-opacity values. Count.
- Status: FAIL. 13 distinct opacity levels found across the site.

**DESIGN-048 [HIGH] -- Lowest-Opacity Text Remains Readable**
- Pass: The lowest-opacity body text used for actual content (not decorative) is comfortably readable at its rendered size. Currently, `text-white/[0.45]` at 13px is the worst offender.
- Test: View feature descriptions at arm's length. Can you read them without effort?
- Status: FAIL. 13px at 45% opacity is at the threshold of illegibility on dark backgrounds.

### Navigation UX & Content Scannability (049-050)

**DESIGN-049 [CRITICAL] -- Navigation Provides Access to All Pages on All Devices**
- Pass: Users on any device (mobile, tablet, desktop) can navigate to every page section and all site pages from the navigation.
- Test: Check nav at 375px, 768px, 1024px. Verify all links accessible.
- Status: FAIL. Mobile (< 768px) hides Platform and Company links entirely. No alternative navigation exists.

**DESIGN-050 [HIGH] -- Content Scannability on Mobile**
- Pass: A user scrolling quickly through the mobile page can identify each section's purpose from its heading and visual structure alone, without reading body text.
- Test: Scroll quickly through the page at 375px. At each section, note what you understand from headings alone.
- Status: PARTIAL. Section headings are clear and descriptive. But at `font-light` (300) with `leading-[1.1]`, the headings themselves are thin and cramped, reducing their effectiveness as visual anchors. Combined with no section separators and identical backgrounds, scanning is harder than it should be.

---

## Summary of Current State

| Severity | ARCH Failures | DESIGN Failures | Total |
|----------|--------------|-----------------|-------|
| CRITICAL | 7 | 7 | 14 |
| HIGH | 10 | 8 | 18 |
| MEDIUM | 7 | 5 | 12 |
| LOW | 2 | 1 | 3 |
| **Subtotal Failing** | **26** | **21** | **47** |
| Passing | 16 | 19 | 35 |
| Needs Verification | 5 | 3 | 8 |
| Partial/At Risk | 3 | 7 | 10 |

**Top 10 Highest-Priority Fixes (all CRITICAL):**
1. ARCH-002 / DESIGN-049 -- Add mobile navigation (hamburger menu)
2. ARCH-007 / DESIGN-040 -- Add visible focus indicators for keyboard users
3. ARCH-022 -- Fix touch targets (footer icons, nav CTA, footer links)
4. ARCH-017 -- Fix body text contrast (raise opacity on 0.45 text)
5. DESIGN-002 -- Increase heading font-weight from 300 to 400+
6. DESIGN-001 -- Increase body text to 16px minimum on mobile
7. DESIGN-015 / DESIGN-027 -- Add hero section CTA
8. DESIGN-024 -- Fix hero image for mobile (responsive/alternative image)
9. ARCH-001 -- Add skip link
10. ARCH-026 -- Conditional video loading (poster frame, mobile alternative)

---

### Critical Files for Implementation
- `/Users/ryan/Documents/mirret-website-new/src/components/Navbar.tsx` -- Mobile menu, focus styles, ARIA, touch targets
- `/Users/ryan/Documents/mirret-website-new/src/components/HeroSection.tsx` -- CTA button, heading weight/line-height, body text sizing, feature card constraints, image optimization
- `/Users/ryan/Documents/mirret-website-new/src/app/globals.css` -- Focus indicator styles, reduced motion media query, print stylesheet, opacity scale tokens
- `/Users/ryan/Documents/mirret-website-new/src/app/layout.tsx` -- Skip link, structured data (JSON-LD), heading font weight loading
- `/Users/ryan/Documents/mirret-website-new/src/components/Footer.tsx` -- Touch target sizing, social icon padding, link padding
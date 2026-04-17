# Checkpoint 1: Design Brief + Blueprint + Visual Spec
# HAM Influencer Marketing Agency Page

> Project: High Arc Media -- Influencer Division
> Date: 2026-04-17
> Status: In Review

---

## DESIGN BRIEF

### Page Type
Agency landing page / influencer talent roster

### Target Audience
Brand marketing managers, CMOs, social media directors, partnership leads at DTC and enterprise brands looking for influencer talent to run campaigns.

### What They Should Do
Book a partnership call via Calendly (calendly.com/higharc) or submit an inquiry through the contact form.

### Inspiration Sites (Analyzed)
- **HireInfluence** -- Steal: video showreel in hero, award badges, campaign case studies with play icons
- **Collectively** -- Steal: dark background sections, dual-audience CTAs (brands vs. creators), icon-driven service pillars
- **inBeat** -- Steal: metric cards with hard numbers, FAQ accordion, mega social proof (40+ logos)
- **Ubiquitous** -- Steal: gradient decorative elements, platform-specific service pillars, CEO/founder story, specific campaign KPIs

### Platform & Hosting
- Built as standalone HTML/CSS/JS
- Hosted on Vercel
- Embedded in Wix via full-width iframe
- Desktop-first, fully responsive

### Image Availability
- 24 influencer profile photos ready (PNG format in Assets/Photos/Influencers/)
- HAM logos ready (brand-assets/high-arc-media/)
- Work sample videos will be embedded from Instagram/TikTok (no self-hosting needed)

### Must-Haves
- Animated influencer photo collage hero (cutout style, backgrounds removed, layered group shot)
- Work samples section with video embeds
- Brand inquiry CTA with Calendly booking link
- Dark, edgy, Gen Z aesthetic
- 3D elements and GSAP scroll animations
- No pricing section -- brands inquire directly
- No roster page -- we are a connector, not a talent agency. We don't sign or manage influencers exclusively.

### Must-Nots
- No flat Dark Azure backgrounds (use black + gradient orbs)
- No AI-sounding copy (no em-dashes, curly quotes, "elevate", "leverage", "seamless")
- No generic stock photos
- No pricing/packages displayed
- No corporate/stiff tone

### Brand Personality
Bold + edgy + youthful + confident. Gen Z energy with professional substance.

---

## BLUEPRINT (Page Structure)

### Section Order + Purpose

```
[NAV]           Fixed top. HAM logo left, links right, "Book a Call" CTA button.
                Transparent on load, solid black + blur on scroll (80px threshold).

[HERO]          Full-viewport. Animated photo collage grid of all 24 influencers.
                Three.js particle field behind photos. Bold headline overlay.
                Animated counter: total combined reach. Single CTA button.
                Scroll indicator at bottom.

[SOCIAL PROOF]  Thin horizontal bar. 3-4 stats with animated counters:
                "15.6M+ Combined Reach" | "24 Creators" | "10+ Niches"
                Optional: client/brand logo marquee if we have logos.

[ABOUT]         2-column: text left, visual right (Spline 3D or abstract visual).
                Who HAM Influencer Division is. What makes us different.
                Short, punchy, no corporate fluff.

[OUR NETWORK]   Stats-driven section showing the breadth of the creator network
                WITHOUT listing individual influencers. Show niche coverage
                (Comedy, Fashion, Beauty, Lifestyle, Food, Entertainment),
                follower range (78K - 1.1M), platform coverage (IG, TikTok,
                YouTube, Facebook). Communicates: "We have the creators.
                You bring the brand. We make the match."

[SERVICES]      What brands get when they partner with HAM.
                4 icon-driven cards on dark bg with subtle glow borders:
                1. Creator Matching -- Right talent for your brand
                2. Campaign Management -- End-to-end execution
                3. Content Production -- Reels, TikToks, Stories, UGC
                4. Analytics & Reporting -- Real numbers, real ROI

[HOW IT WORKS]  3-step horizontal timeline (reuse HAM homepage pattern):
                1. Tell us your goals --> 2. We match you with creators --> 3. Watch it perform
                SVG line connects steps. Scroll-scrub animation.

[WORK SAMPLES]  Video grid/carousel of best brand collaboration content.
                Instagram/TikTok embeds or thumbnail cards linking to posts.
                Filterable by niche or influencer.

[CTA]           Full-width dark section. Bold headline + subline.
                Two buttons: "Book a Partnership Call" (Calendly) + "Send Us a Brief" (form/email).
                Optional: embedded Calendly widget.

[FOOTER]        HAM logo, social links, contact email, copyright.
                Minimal. Dark bg.
```

### Load Priority
1. Nav + Hero (above fold, critical CSS inlined)
2. Social proof bar (lightweight, fast)
3. About + Roster (lazy-load influencer photos)
4. Everything below the fold lazy-loaded

### Performance Budget
- FCP: < 2.5s on 4G
- Hero images: WebP, 200x200 thumbnails for collage, full 600x600 on click
- GSAP + ScrollTrigger loaded async (CDN)
- Three.js loaded async, skipped on mobile/no-WebGL
- Influencer data: single JSON fetch, ~5KB

---

## VISUAL SPEC

### Color System
Extends HAM design tokens. Black base with cyan accents and gradient orb glows.

```
Background:       #000000 (pure black)
Text primary:     #FFFFFF (white)
Text secondary:   #868686 (gray, --ham-gray)
Accent:           #3ED4CF (cyan, --ham-cyan)
Accent hover:     #5EEAE5 (lighter cyan for hover states)
Card bg:          rgba(255,255,255,0.03) (barely-there white tint)
Card border:      rgba(62,212,207,0.15) (subtle cyan glow borders)
Gradient orbs:    rgba(62,212,207,0.04-0.08) + rgba(2,94,118,0.03-0.06)
Niche tag bg:     rgba(62,212,207,0.12) with #3ED4CF text
```

### Typography
Reuse HAM font stack:
```
Display/Hero:     'Anton', sans-serif -- hero headline, section titles
Headings:         'Bebas Neue', cursive -- section labels, card titles
Body:             'Montserrat', sans-serif -- all body text, UI elements

Hero headline:    clamp(3.5rem, 8vw, 7rem) -- bold, uppercase
Section titles:   clamp(2.5rem, 5vw, 4.5rem) -- uppercase
Section labels:   clamp(0.75rem, 0.9vw, 0.875rem) -- uppercase, letter-spacing 0.2em, cyan
Body text:        clamp(0.9375rem, 1.2vw, 1.125rem) -- 400 weight, 1.6 line-height
Card titles:      clamp(1.125rem, 2vw, 1.5rem) -- 600 weight
```

### Layout Grid
```
Container:        max-width 1200px, centered
Section padding:  clamp(60px, 8vw, 120px) top/bottom
Container pad:    clamp(24px, 5vw, 80px) horizontal
Card grid:        CSS Grid, repeat(auto-fill, minmax(280px, 1fr)), gap 24px
Spotlight cards:  2-column on desktop, stack on mobile
```

### Hero Collage Concept
- Group photo collage style (like the reference image Derick shared)
- All influencer photos have backgrounds REMOVED (CSS or pre-processed cutouts)
- Layered arrangement: some in front, some behind, creating depth
- Center-weighted composition with figures overlapping naturally
- NOT a grid -- organic, editorial, magazine-cover feel
- Dark gradient from bottom for headline readability
- Three.js cyan particle field behind the cutouts (subtle)
- Subtle parallax on scroll (front figures move faster than back)
- No blue overlay -- keep photos natural/desaturated or with subtle dark tone
- Total reach counter animates on load

### Background Treatment
Reuse HAM homepage gradient orb system:
```
3 orbs, fixed position, pointer-events: none
- Orb 1: top-right, 900px, cyan/azure radial gradient, 6% opacity, blur(80px)
- Orb 2: bottom-left, 800px, dark azure, 8% opacity, blur(100px)
- Orb 3: mid-left, 500px, cyan, 3% opacity, blur(60px)
All drift with slow CSS keyframe animations (20-30s cycles)
```

### Animation Spec
```
Scroll reveals:     data-animate="fade-up", start: top 85%, once: true
                    gsap.from({ opacity: 0, y: 40 }) over 0.8s

Stagger grids:      Service cards stagger 0.15s each on scroll into view

Counter animation:  Social proof numbers count up over 2s, power1.out easing
                    Triggered when section enters viewport

Hero parallax:      Photo grid items move at different scroll rates (scrub: 1)
                    Creates depth effect as user scrolls past hero

Timeline scrub:     How It Works SVG line draws as user scrolls (scrub: 1)
                    Matches HAM homepage pattern exactly

Hover effects:      Cards: scale(1.05) + glow border, 0.3s ease
                    Buttons: slight lift + shadow, 0.2s ease
                    Nav links: underline slide-in, 0.3s

```

### 3D Elements
```
Hero:               Three.js particle field (400 particles, cyan, 2.5px)
                    Mouse repel interaction (8px radius)
                    Paused when hero is off-screen (IntersectionObserver)
                    Skipped on mobile / no-WebGL / reduced motion

About section:      Optional Spline 3D embed OR abstract geometric visual
                    Fallback: static image for mobile/no-WebGL
```

### Responsive Breakpoints
```
Desktop:    > 1024px    -- Full grid, all 3D, all animations
Tablet:     768-1024px  -- 2-column roster grid, no Three.js, simplified hero
Mobile:     < 768px     -- 1-column, stacked layout, no 3D, static hero collage
```

### Z-Index Stack
```
z-0:    Background orbs (fixed)
z-1:    Three.js canvas (hero only)
z-2:    Hero photo collage
z-3:    Hero gradient overlay
z-5:    All content sections
z-100:  Navigation (fixed)
z-200:  Modals (influencer detail)
```

---

## FILES TO CREATE

```
influencer-site/
  index.html                 -- Main page
  css/
    variables.css            -- Extended from HAM homepage tokens
    reset.css                -- CSS reset (reuse HAM)
    global.css               -- Orbs, backgrounds, base styles
    nav.css                  -- Navigation
    hero.css                 -- Hero collage + particles
    sections.css             -- About, Network, Services, How It Works, CTA
    work-samples.css         -- Video grid
    footer.css               -- Footer
    responsive.css           -- All breakpoint overrides
  js/
    perf-guard.js            -- Device capability detection (reuse HAM)
    main.js                  -- Init, nav scroll, general setup
    hero-collage.js          -- Photo grid layout + parallax
    hero-particles.js        -- Three.js particle field (reuse HAM pattern)
    scroll-animations.js     -- GSAP ScrollTrigger (reuse HAM pattern)
    counters.js              -- Animated number counters
  assets/
    images/
      influencers/           -- 24 profile photos (WebP, 2 sizes each)
      ham-logo.png           -- HAM logo
  data/
    influencers.json         -- All influencer data for dynamic rendering
  CHECKPOINT-1.md            -- This file
```

### CDN Dependencies
```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
```

---

## NEXT STEPS (after approval)

1. Checkpoint 2: Copy Deck -- all headline, body, CTA, and microcopy
2. Build -- full HTML/CSS/JS implementation
3. Deploy to Vercel + embed in Wix

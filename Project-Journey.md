# 🖼️ Dark Academia — Image Gallery

## Project Overview
Dark Academia is a responsive, accessible image gallery web application built with **HTML, CSS, and vanilla JavaScript** — no frameworks or external libraries. It presents a curated set of images grouped into categories, allows visitors to filter the collection, and lets them open any image in a fullscreen lightbox with keyboard and button navigation. The project was built to demonstrate practical front-end skills: DOM manipulation, event-driven UI state, CSS animation, and accessibility best practices. This is created with the help of AI.

## Key Features
- Category-based image filtering (All, Nature, Architecture, People, Abstract, Anime)
- Fullscreen lightbox viewer with image, caption, and category metadata
- Previous/Next navigation inside the lightbox
- Keyboard navigation (arrow keys, Esc)
- Live photo count statistics (total vs. currently visible)
- Empty-state message with a "Show all photos" reset action
- Responsive layout with a collapsible mobile navigation menu
- Scroll-aware navigation that highlights the active section

## User Experience Features
- Smooth fade/scale transitions when filtering images in or out of view
- Hover effects on gallery cards (image zoom, overlay reveal, caption display)
- Staggered entrance animation for gallery items on load
- Sticky filter bar and sticky top navigation for easy access while scrolling
- Focus is automatically moved to the lightbox close button when it opens, and returned to the originating image card when it closes
- Respects the operating system's `prefers-reduced-motion` setting

## Technical Features
- Dialog-based modal lightbox using the native HTML `<dialog>` element (no custom modal library)
- Centralized image data array driving all rendering — no hardcoded gallery markup in HTML
- Event delegation–style listeners attached after dynamic rendering
- Defensive filtering logic that guards against race conditions when a user switches filters quickly
- CSS custom properties (variables) used for theming, spacing, and animation timing
- `aria-pressed`, `aria-selected`, `aria-live`, and `aria-modal` attributes for assistive technology support

## Technologies Used
- **HTML5** — semantic structure and the native `<dialog>` element
- **CSS3** — Flexbox, Grid, custom properties, media queries, keyframe animations
- **JavaScript (ES6+)** — DOM APIs, array methods, event listeners, template literals
- **Google Fonts** — DM Sans (UI text) and Instrument Serif (display headings)

## HTML Concepts Used
- Semantic elements: `<nav>`, `<header>`, `<main>`, `<section>`, `<figure>`, `<figcaption>`, `<footer>`
- The native `<dialog>` element used as the lightbox modal
- `aria-label`, `aria-expanded`, `aria-controls`, `aria-modal`, `aria-live`, and `role="tablist"`/`role="tab"` for accessibility
- A skip-link (`.skip-link`) for keyboard users to bypass navigation
- `<dl>`/`<dt>`/`<dd>` used to mark up gallery statistics semantically
- `loading="lazy"` and `decoding="async"` on gallery images for performance

## CSS Concepts Used
- CSS custom properties (`:root` variables) for colors, radii, shadows, spacing, and transition timing
- CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(...))`) for the responsive image grid
- Flexbox for navigation, filter bar, hero stats, and lightbox layout
- `backdrop-filter` for glass-style blurred surfaces on the nav and filter bar
- `@keyframes` animation (`fadeUp`) with per-item staggered delays using a `--stagger` custom property
- `::backdrop` pseudo-element styling for the native `<dialog>` overlay
- Multiple responsive breakpoints (1024px, 768px, 640px, 580px)
- `@media (prefers-reduced-motion: reduce)` to disable animations for users who request it
- `aspect-ratio` for consistent gallery card proportions

## JavaScript Concepts Used
- Array of objects as a single source of truth for gallery content
- `Array.prototype.map`, `filter`, and `findIndex` for rendering and filtering
- Template literals for generating dynamic HTML
- DOM event listeners (`click`, `keydown`, `scroll`) and the `dialog` element's `cancel` event
- `classList.toggle` / `add` / `remove` for state-driven styling
- `requestAnimationFrame` to sequence animation classes correctly
- `setTimeout` combined with a state check to avoid race conditions when filters change rapidly
- Closures and module-level state variables (`activeCategory`, `lightboxIndex`, `lastFocusedCard`)
- Focus management for accessibility (saving and restoring focus around the lightbox)

## Project Architecture
The application follows a simple **data → render → interact** model:

```
galleryItems (data array)
        │
        ▼
 renderGallery() / renderFilters()   →  builds DOM from data
        │
        ▼
 Event listeners attached to rendered elements
        │
        ▼
 User interaction (filter click / image click / keyboard)
        │
        ▼
 State updated (activeCategory / lightboxIndex)
        │
        ▼
 UI re-rendered or updated (applyFilter / setLightboxImage)
```

All gallery content lives in a single `galleryItems` array in `gallery.js`. The HTML contains only empty containers (`#gallery`, `#filter-list`) that JavaScript populates on load — the markup and the content are decoupled.

## Application Flow
1. On page load, `init()` runs.
2. `renderFilters()` builds the category buttons from the `CATEGORIES` array.
3. `renderGallery()` builds the gallery grid from the `galleryItems` array and attaches click listeners to each card.
4. `initLightbox()` wires up the lightbox controls (close, prev, next, backdrop click, keyboard navigation).
5. `initNav()` sets up the mobile menu toggle and scroll-based active link highlighting.
6. From this point, all further updates happen through event-driven function calls rather than page reloads.

## Dynamic Gallery Rendering
Images are **not hardcoded into the HTML**. Instead, each image is defined as an object in the `galleryItems` array with an `id`, `src`, `alt`, `category`, and `caption`. `renderGallery()` maps over this array and generates the markup for each gallery card using a template literal, including the image, an overlay with caption/category, and a "View full size" action label. A `--stagger` CSS variable is set per item (based on its index) so the entrance animation delay increases slightly for each subsequent card, creating a cascading fade-in effect.

## Category Filtering System
Each gallery `<li>` carries a `data-category` attribute matching one of the categories in the data array. When a filter button is clicked:
1. `setCategory()` updates the `activeCategory` state and updates `aria-pressed`/`aria-selected` on the buttons.
2. `applyFilter(true)` runs, comparing each item's `data-category` against the active category.
3. Matching items are shown immediately and animated in; non-matching items get an `is-filtering-out` class (CSS fade/scale transition) and are hidden via `is-hidden` only after the transition finishes, using `setTimeout`.
4. To prevent a race condition if the user clicks filters in rapid succession, the function captures the active category in a local variable (`currentCategory`) at the moment it runs, and the delayed hide only executes if the category hasn't changed in the meantime.
5. `updateStats()` and the empty-state message are updated based on the number of currently visible items.

## Lightbox Implementation
The lightbox is built on the native `<dialog id="lightbox">` element rather than a custom overlay:
- Clicking a gallery card calls `openLightboxById()`, which finds the clicked image's position within the **currently visible (filtered) set** — not the full data array — so lightbox navigation stays consistent with the active filter.
- `openLightbox()` calls `lightboxEl.showModal()`, adds a `lightbox-open` class to `<body>` to lock background scroll, and moves focus to the close button.
- `setLightboxImage()` updates the image, alt text, caption, category label, and the position counter (e.g., "3 / 8"), briefly applying an `is-changing` class to fade the image while the new one loads.
- Closing the lightbox (via the close button, backdrop click, clicking outside the dialog, or pressing `Esc`) calls `closeLightbox()`, which closes the dialog, removes the scroll-lock class, and restores focus to the gallery card that was originally clicked.
- The dialog's native `cancel` event (fired by `Esc`) is intercepted with `preventDefault()` so the custom close logic (focus return, class cleanup) still runs consistently.

## Navigation Controls
Inside the lightbox, navigation is handled by a single `navigate(delta)` function:
- Clicking the **Prev**/**Next** buttons calls `navigate(-1)` or `navigate(1)`.
- Pressing the **Left**/**Right** arrow keys calls the same function via a `keydown` listener that only acts while the lightbox is open.
- The index wraps around using modulo arithmetic (`(lightboxIndex + delta + visible.length) % visible.length`), so navigating past the last image loops back to the first, and vice versa.

The top site navigation has its own controls: a hamburger toggle for mobile (`aria-expanded` driven) and a scroll listener that determines which section is currently in view and applies an `is-active` class to the matching nav link.

## Responsive Design Strategy
The layout is mobile-first in spirit and adjusts at four breakpoints:
- **1024px and below** — the gallery grid's minimum column width shrinks for tighter screens.
- **768px and below** — grid spacing tightens further and the on-screen keyboard hint in the lightbox is hidden (since mobile users don't have arrow keys).
- **640px and below** — the top navigation switches from inline links to a collapsible dropdown menu, controlled by the hamburger toggle.
- **580px and below** — the gallery collapses to a single column, the filter bar becomes horizontally scrollable, and the lightbox image's maximum height is reduced to fit smaller viewports.

Throughout, `clamp()` is used extensively for font sizes and spacing so the UI scales fluidly between breakpoints rather than jumping abruptly.

## Accessibility Features
- A skip-link lets keyboard users jump straight to the main content.
- Filter buttons use `role="tab"` with `aria-pressed` and `aria-selected` to communicate selection state.
- The gallery container uses `aria-live="polite"` so filter changes are announced.
- The lightbox dialog uses `aria-modal="true"` and `aria-labelledby` pointing to the caption.
- Focus is explicitly managed: moved into the lightbox on open and returned to the triggering element on close.
- All interactive elements have visible `:focus-visible` styles using a consistent focus ring variable.
- Animations are disabled under `prefers-reduced-motion: reduce`.

## Project Structure
```
├── index.html      # Page markup, navigation, hero, lightbox dialog skeleton
├── styles.css      # Theming, layout, responsive rules, and animations
├── gallery.js      # Image data, rendering, filtering, lightbox, and nav logic
└── README.md
```
No build tools, package installation, or server setup is required — the project runs entirely client-side.

## Challenges Faced
- **Filter race conditions**: Rapidly clicking between filters while the fade-out transition was still running could cause items to be hidden incorrectly. This was solved by snapshotting the active category at the start of each `applyFilter()` call and checking it again before hiding an item.
- **Keeping lightbox navigation in sync with filters**: The lightbox needed to navigate only through the currently visible (filtered) images, not the entire dataset, which required deriving the lightbox index from `getVisibleItems()` rather than the full `galleryItems` array.
- **Accessible modal behavior**: Ensuring focus moved into and back out of the lightbox correctly, and that the native `Esc`/`cancel` behavior of `<dialog>` didn't bypass the custom close logic.

## Lessons Learned
- How to drive an entire UI from a single data array instead of static markup, making the gallery easy to extend with new images or categories.
- Practical use of the native `<dialog>` element for accessible modals, including its `showModal()`, `close()`, and `cancel` event behavior.
- The importance of guarding asynchronous/delayed UI updates (like `setTimeout`-based class toggles) against changing state.
- How to combine CSS transitions with JavaScript class toggling to create smooth, interruption-safe animations.

## Future Improvements
- Add a keyword/search filter alongside category filtering.
- Add lazy-loading placeholders or skeleton loaders for a smoother initial load.
- Self-host or properly license the gallery images instead of relying on external Pinterest-hosted URLs.
- Add automated tests for the filtering and lightbox navigation logic.
- Add swipe gesture support for lightbox navigation on touch devices.

---

- Developer: Mukeshkkumar
- Stack: HTML / CSS / Vanilla JavaScript

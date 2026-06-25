# 🖼️ Dark Academia — Image Gallery

 [Live Demo:] (https://mukeshkkumar96-kalai.github.io/CodeAlpha_Image-Gallery/)

## Overview
Dark Academia is a responsive photography gallery web app built with HTML, CSS, and vanilla JavaScript. It displays a curated set of images organized into categories, with category filtering, a fullscreen lightbox viewer, and keyboard navigation. The project is designed as a front-end portfolio piece demonstrating DOM manipulation, animation, and accessible UI patterns without any frameworks or libraries.

## Features
- **Category filtering** — Filter images by category (Nature, Architecture, People, Abstract, Anime, or All) using a sticky filter bar.
- **Fullscreen lightbox viewer** — Click any image to open it in a modal lightbox built on the native `<dialog>` element.
- **Lightbox navigation** — Move between images using on-screen prev/next buttons or the left/right arrow keys.
- **Keyboard support** — Navigate the lightbox with arrow keys and close it with `Esc`.
- **Live gallery stats** — Total photo count and currently visible count update dynamically based on the active filter.
- **Empty state handling** — Displays a "no images match this category" message with a reset button if a filter returns no results.
- **Responsive layout** — Grid-based gallery and navigation adapt across desktop, tablet, and mobile breakpoints, including a collapsible mobile menu.
- **Smooth transitions** — CSS-based fade/scale animations for filtering and lightbox open/close.
- **Accessibility considerations** — Skip link, ARIA attributes on filters and lightbox, focus management when opening/closing the lightbox, and `prefers-reduced-motion` support.
- **Scroll-based active nav link** — The navigation highlights the section currently in view (Home, Picture, About).

## Technologies Used
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, media queries)
- Vanilla JavaScript (ES6+, DOM APIs, native `<dialog>` element)
- Google Fonts (DM Sans, Instrument Serif)

## Responsive Design
The layout uses CSS Grid and Flexbox with breakpoints at 1024px, 768px, 640px, and 580px to adjust the gallery grid columns, switch to a collapsible mobile navigation menu, and resize the lightbox image for smaller screens. The design also respects the `prefers-reduced-motion` setting for users who prefer minimal animation.

## What I Learned
- Structuring and filtering data-driven UI components with vanilla JavaScript.
- Using the native `<dialog>` element to build an accessible modal lightbox.
- Managing focus and keyboard interactions for better accessibility.
- Writing responsive CSS using custom properties and multiple breakpoints.
- Handling animation timing carefully to avoid UI glitches when filters change quickly.

## Future Improvements
- Add lazy-loading placeholders or skeleton loaders for slower connections.
- Add a search/keyword filter in addition to category filtering.
- Add unit tests for the filtering and navigation logic.
- Optimize and self-host images instead of relying on external image URLs.

**Developer:** Mukeshkkumar  
**Stack:** Vanilla HTML / CSS / JavaScript


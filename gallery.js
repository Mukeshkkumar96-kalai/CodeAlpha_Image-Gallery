/**
 * Lumina Gallery – filters, lightbox, stats, polished UX
 */

const galleryItems = [
  { id: 1, src: "https://i.pinimg.com/1200x/ca/a8/dd/caa8dd128c1e80d87a4315a0260d5cb6.jpg", alt: "Misty forest trail at dawn", category: "nature", caption: "Forest trail at dawn" },
  { id: 2, src: "https://i.pinimg.com/736x/3a/18/1c/3a181cd63f60ead2c467edd045bd28ca.jpg", alt: "Mountain lake reflecting peaks", category: "nature", caption: "Mountain lake reflection" },
  { id: 3, src: "https://i.pinimg.com/1200x/7a/76/1d/7a761d0c69df3858fceff11ef8708f48.jpg", alt: "Rolling green hills under clouds", category: "nature", caption: "Green hills panorama" },
  { id: 4, src: "https://i.pinimg.com/1200x/38/b7/55/38b755edbab87232213997596b587ead.jpg", alt: "Modern glass skyscraper facade", category: "architecture", caption: "Glass skyscraper" },
  { id: 5, src: "https://i.pinimg.com/736x/4a/13/8a/4a138a2ee6ed3fe0178f8efbf3c114e4.jpg", alt: "Historic stone bridge over a river", category: "architecture", caption: "Historic stone bridge" },
  { id: 6, src: "https://i.pinimg.com/736x/22/c2/c5/22c2c520f3dfead37f645e9d9974fb3c.jpg", alt: "Minimalist concrete building corner", category: "architecture", caption: "Concrete minimalism" },
  { id: 7, src: "https://i.pinimg.com/1200x/5e/e5/71/5ee57113dc7fe7296030cabb9a993506.jpg", alt: "Street musician performing for a crowd", category: "people", caption: "Street musician" },
  { id: 8, src: "https://i.pinimg.com/736x/24/87/a9/2487a98a294dc04fdc476c6be9da94f8.jpg", alt: "Friends laughing at an outdoor café", category: "people", caption: "Café conversation" },
  { id: 9, src: "https://i.pinimg.com/1200x/50/96/9d/50969d3181deb6520a35f5a17bbf89f4.jpg", alt: "Runner crossing a city crosswalk", category: "people", caption: "City runner" },
  { id: 10, src: "https://i.pinimg.com/1200x/63/dd/b1/63ddb10bcda90e006b2c8ad0e8075d73.jpg", alt: "Colorful light bokeh patterns", category: "abstract", caption: "Light bokeh" },
  { id: 11, src: "https://i.pinimg.com/736x/ac/f1/b8/acf1b88c976aabdaba77be1668b3e04e.jpg", alt: "Geometric shadows on a wall", category: "abstract", caption: "Geometric shadows" },
  { id: 12, src: "https://i.pinimg.com/1200x/c3/95/3f/c3953ff9a18c9bf9b875b7d3edfa9b6d.jpg", alt: "Fluid ink swirl in water", category: "abstract", caption: "Ink swirl" },
  { id: 13, src: "https://i.pinimg.com/1200x/fa/a4/60/faa4603bc6916496c87b6bff45bd401d.jpg", alt: "Luffy", category: "anime", caption: "Monkey.D.Luffy" },
  { id: 14, src: "https://i.pinimg.com/736x/cc/72/54/cc725467341dfe1bb6e263b97878a34a.jpg", alt: "Zoro", category: "anime", caption: "Roronoa Zoro" },
  { id: 15, src: "https://i.pinimg.com/736x/72/0e/ba/720eba6d72db504746e4eae8bc481f92.jpg", alt: "Sanji", category: "anime", caption: "Black Foot Sanji" },
  { id: 16, src: "https://i.pinimg.com/1200x/ea/5f/de/ea5fde09101543e420f410547fba1356.jpg", alt: "Usopp", category: "anime", caption: "God.D.Usopp" },
  { id: 17, src: "https://i.pinimg.com/736x/81/9e/9f/819e9f76ffb0e17e91b71c282f2ad53a.jpg", alt: "Chopper", category: "anime", caption: "Tony Tony Chopper" },
  { id: 18, src: "https://i.pinimg.com/1200x/a1/be/e6/a1bee6016de5ad99b82530d855545e11.jpg", alt: "Roger", category: "anime", caption: "Gold.D.Roger" },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "nature", label: "Nature" },
  { id: "architecture", label: "Architecture" },
  { id: "people", label: "People" },
  { id: "abstract", label: "Abstract" },
  { id: "anime", label: "Anime" },
];

const VIEW_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

const galleryEl = document.getElementById("gallery");
const filterListEl = document.getElementById("filter-list");
const galleryEmptyEl = document.getElementById("gallery-empty");
const resetFilterEl = document.getElementById("reset-filter");
const statTotalEl = document.getElementById("stat-total");
const statVisibleEl = document.getElementById("stat-visible");
const galleryHintEl = document.getElementById("gallery-hint");
const lightboxEl = document.getElementById("lightbox");
const lightboxImageEl = document.getElementById("lightbox-image");
const lightboxCaptionEl = document.getElementById("lightbox-caption");
const lightboxCounterEl = document.getElementById("lightbox-counter");
const lightboxCategoryEl = document.getElementById("lightbox-category");
const lightboxCloseEl = document.getElementById("lightbox-close");
const lightboxPrevEl = document.getElementById("lightbox-prev");
const lightboxNextEl = document.getElementById("lightbox-next");

let activeCategory = "all";
let lightboxIndex = 0;
let lastFocusedCard = null;

function formatCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getVisibleItems() {
  if (activeCategory === "all") {
    return galleryItems;
  }
  return galleryItems.filter((item) => item.category === activeCategory);
}

function updateStats() {
  const visible = getVisibleItems();
  statTotalEl.textContent = String(galleryItems.length);
  statVisibleEl.textContent = String(visible.length);

  const label = activeCategory === "all"
    ? "All categories"
    : formatCategory(activeCategory);
  galleryHintEl.textContent =
    visible.length === galleryItems.length
      ? "Click any photo to open fullscreen · arrow keys to navigate"
      : `Showing ${visible.length} in ${label}`;
}

function renderFilters() {
  filterListEl.innerHTML = CATEGORIES.map(
    (cat) => `
      <button
        type="button"
        class="filter-btn"
        role="tab"
        data-category="${cat.id}"
        aria-pressed="${cat.id === activeCategory}"
        aria-selected="${cat.id === activeCategory}"
      >${cat.label}</button>
    `
  ).join("");

  filterListEl.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => setCategory(btn.dataset.category));
  });
}

function renderGallery() {
  galleryEl.innerHTML = galleryItems
    .map(
      (item, index) => `
      <li class="gallery__item" data-id="${item.id}" data-category="${item.category}" style="--stagger: ${index}">
        <button type="button" class="gallery-card" data-id="${item.id}" aria-label="View ${item.caption}">
          <img
            class="gallery-card__image"
            src="${item.src.replace("/800/600", "/500/360")}"
            alt="${item.alt}"
            width="500"
            height="360"
            loading="lazy"
            decoding="async"
          >
          <span class="gallery-card__overlay">
            <span class="gallery-card__category">${formatCategory(item.category)}</span>
            <span class="gallery-card__caption">${item.caption}</span>
            <span class="gallery-card__action">${VIEW_ICON} View full size</span>
          </span>
        </button>
      </li>
    `
    )
    .join("");

  galleryEl.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      openLightboxById(Number(card.dataset.id), card);
    });
  });

  applyFilter(false);
}

function applyFilter(animate = true) {
  const items = galleryEl.querySelectorAll(".gallery__item");
  // Snapshot activeCategory so rapid filter clicks don't corrupt the setTimeout closure
  const currentCategory = activeCategory;
  let visibleCount = 0;

  items.forEach((li) => {
    const match = currentCategory === "all" || li.dataset.category === currentCategory;

    if (animate) {
      li.classList.toggle("is-filtering-out", !match);
      if (match) {
        li.classList.remove("is-hidden");
        visibleCount += 1;
        requestAnimationFrame(() => li.classList.remove("is-filtering-out"));
      } else {
        setTimeout(() => {
          // Only hide if the category hasn't changed since this filter was triggered
          if (activeCategory === currentCategory) {
            li.classList.add("is-hidden");
          }
        }, 400);
      }
    } else {
      li.classList.toggle("is-hidden", !match);
      li.classList.remove("is-filtering-out");
      if (match) visibleCount += 1;
    }
  });

  if (!animate) {
    visibleCount = getVisibleItems().length;
  }

  galleryEmptyEl.classList.toggle("hidden", visibleCount > 0);
  updateStats();
}

function setCategory(category) {
  if (category === activeCategory) return;
  activeCategory = category;

  filterListEl.querySelectorAll(".filter-btn").forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.setAttribute("aria-pressed", String(isActive));
    btn.setAttribute("aria-selected", String(isActive));
  });

  applyFilter(true);
}

function setLightboxImage(item) {
  lightboxImageEl.classList.add("is-changing");

  const apply = () => {
    lightboxImageEl.src = item.src;
    lightboxImageEl.alt = item.alt;
    lightboxCaptionEl.textContent = item.caption;
    lightboxCategoryEl.textContent = formatCategory(item.category);

    const visible = getVisibleItems();
    lightboxCounterEl.textContent = `${lightboxIndex + 1} / ${visible.length}`;
  };

  if (lightboxImageEl.complete && lightboxImageEl.src === item.src) {
    apply();
    lightboxImageEl.classList.remove("is-changing");
    return;
  }

  apply();
  lightboxImageEl.onload = () => lightboxImageEl.classList.remove("is-changing");
  lightboxImageEl.onerror = () => lightboxImageEl.classList.remove("is-changing");
}

function openLightboxById(id, triggerEl) {
  const visible = getVisibleItems();
  const index = visible.findIndex((item) => item.id === id);
  if (index === -1) return;

  lastFocusedCard = triggerEl;
  lightboxIndex = index;
  setLightboxImage(visible[lightboxIndex]);
  openLightbox();
}

function openLightbox() {
  lightboxEl.classList.remove("is-ready");
  if (!lightboxEl.open) {
    lightboxEl.showModal();
    document.body.classList.add("lightbox-open");
  }
  requestAnimationFrame(() => lightboxEl.classList.add("is-ready"));
  lightboxCloseEl.focus();
}

function closeLightbox() {
  lightboxEl.classList.remove("is-ready");
  lightboxEl.close();
  document.body.classList.remove("lightbox-open");

  if (lastFocusedCard) {
    lastFocusedCard.focus();
    lastFocusedCard = null;
  }
}

function navigate(delta) {
  const visible = getVisibleItems();
  if (!visible.length) return;
  lightboxIndex = (lightboxIndex + delta + visible.length) % visible.length;
  setLightboxImage(visible[lightboxIndex]);
}

function initLightbox() {
  lightboxCloseEl.addEventListener("click", closeLightbox);
  lightboxPrevEl.addEventListener("click", () => navigate(-1));
  lightboxNextEl.addEventListener("click", () => navigate(1));

  lightboxEl.querySelector(".lightbox__backdrop").addEventListener("click", closeLightbox);

  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });

  lightboxEl.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightboxEl.open) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        navigate(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        navigate(1);
        break;
      case "Escape":
        closeLightbox();
        break;
      default:
        break;
    }
  });
}

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const links = menu.querySelectorAll(".site-nav__link");
  const sections = ["home", "pictures", "about"].map((id) => document.getElementById(id));

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    menu.classList.toggle("is-open", !open);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      menu.classList.remove("is-open");
    });
  });

  const setActiveLink = () => {
    const scrollY = window.scrollY + 120;
    let current = "home";

    sections.forEach((section) => {
      if (section && section.offsetTop <= scrollY) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      const href = link.getAttribute("href").slice(1);
      link.classList.toggle("is-active", href === current);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

function init() {
  statTotalEl.textContent = String(galleryItems.length);
  renderFilters();
  renderGallery();
  initLightbox();
  initNav();

  resetFilterEl.addEventListener("click", () => setCategory("all"));
}

init();

/**
 * MYTRM - Main Interactive Script
 * Handles navigation, page renders, filtering, booking workflow, forms, and localStorage.
 */

let ALL_DOCTORS_CACHE = [];

document.addEventListener("DOMContentLoaded", async () => {
  initNavbar();
  initScrollAnimations();

  // Load doctors from API
  if (typeof apiGetDoctors === "function") {
    ALL_DOCTORS_CACHE = await apiGetDoctors();
  }

  // Determine current page and run page-specific logic
  const path = window.location.pathname;

  if (path.endsWith("index.html") || path.endsWith("/") || path === "" || path.endsWith("/mytrm/")) {
    initHomePage();
  } else if (path.includes("therapists.html")) {
    initExplorePage();
  } else if (path.includes("therapist-profile.html")) {
    initProfilePage();
  }
});

/* ==========================================================================
   1. NAVBAR & GLOBAL UTILS
   ========================================================================== */
function initNavbar() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".drawer-overlay");

  if (toggleBtn && drawer && overlay) {
    toggleBtn.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
    });
  }

  // Set active nav link based on URL
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      if (currentPath === "contact.html") {
        if (link.textContent.trim() === "Contact Us") {
          link.classList.add("active");
        }
      } else {
        link.classList.add("active");
      }
    }
  });

  // Highlight active mobile drawer links
  document.querySelectorAll(".mobile-nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.style.fontWeight = "700";
      link.style.color = "var(--color-primary)";
    }
  });
}

function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

function initExpertCardsObserver() {
  const cards = document.querySelectorAll(".expert-card-anim");
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target); // Runs once and stays visible
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card, index) => {
    card.style.setProperty("--card-index", index);
    observer.observe(card);
  });
}

/* ==========================================================================
   2. HOMEPAGE
   ========================================================================== */
function initHomePage() {
  // Render Concern / Condition Cards ("What are you going through?")
  const categoriesGrid = document.getElementById("homepage-categories-grid");
  if (categoriesGrid) {
    const concernData = [
      {
        id: "anxiety",
        title: "Anxiety & Panic",
        desc: "Racing thoughts, constant worry, or a mind that won't slow down? Learn proven grounding techniques to regain calm and control.",
        bg: "var(--color-secondary-peach)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c2.5-4 5.5-4 8 0s5.5 4 8 0"></path><path d="M4 6c1.5 2 3.5 2 5 0s3.5-2 5 0 3.5 2 5 0"></path><path d="M4 18c3.5-2 6.5-2 9 0s5.5 2 7 0"></path></svg>`
      },
      {
        id: "stress",
        title: "Stress & Workload",
        desc: "Overwhelmed by work pressure, deadlines, and mental clutter? Find practical space to pause, breathe, and reset.",
        bg: "var(--color-secondary-sand)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path><line x1="8" y1="13" x2="14" y2="13"></line></svg>`
      },
      {
        id: "relationships",
        title: "Relationships & Communication",
        desc: "Navigating conflict, boundary issues, or attachment patterns? Build deeper, healthier connections with clarity.",
        bg: "var(--color-primary-light)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="6"></circle><circle cx="15" cy="12" r="6"></circle></svg>`
      },
      {
        id: "burnout",
        title: "Burnout & Fatigue",
        desc: "Feeling emotionally drained, exhausted, or disconnected? Recharge gently and restore your natural momentum.",
        bg: "var(--color-secondary-sand)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.88-1.5-2.5-2.5-4.5-1 2-2.5 2.62-2.5 4.5Z"></path><path d="M12 2c1 3 2.5 4.5 4.5 7 2 2.5 2.5 5.5 1.5 8.5a7.5 7.5 0 0 1-14 0c-1-3-.5-6 1.5-8.5C7.5 6.5 9 5 10 2c.5 1 1.2 2 2 3Z"></path></svg>`
      },
      {
        id: "self-esteem",
        title: "Self-Esteem & Identity",
        desc: "Battling self-doubt, harsh inner critics, or imposter feelings? Reclaim your quiet confidence and self-worth.",
        bg: "var(--color-secondary-peach)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="10" rx="6" ry="8"></ellipse><path d="M12 18v4"></path><path d="M8 22h8"></path><path d="M12 6l.5 1.5L14 8l-1.5.5L12 10l-.5-1.5L10 8l1.5-.5Z"></path></svg>`
      },
      {
        id: "career",
        title: "Career & Life Transitions",
        desc: "Facing career shifts, quarter-life decisions, or direction anxiety? Gain clear perspective for your next major step.",
        bg: "var(--color-primary-light)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`
      },
      {
        id: "overthinking",
        title: "Overthinking & Sleep",
        desc: "Late-night mental loops and non-stop reflection keeping you awake? Calm your nervous system for restful sleep.",
        bg: "var(--color-secondary-peach)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M19 3v4"></path><path d="M21 5h-4"></path></svg>`
      },
      {
        id: "personal-growth",
        title: "Personal Growth & Purpose",
        desc: "Looking to deepen self-awareness, align your habits, and flourish? Embark on a rewarding journey of self-discovery.",
        bg: "var(--color-secondary-sand)",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V10"></path><path d="M12 10C12 5 7 4 4 6c0 6 4 8 8 4Z"></path><path d="M12 14c0-4 5-5 8-3 0 5-4 7-8 3Z"></path></svg>`
      }
    ];

    categoriesGrid.className = "concern-cards-grid";
    categoriesGrid.innerHTML = concernData.map(cat => `
      <div class="concern-card" onclick="window.location.href='therapists.html?category=${cat.id}'">
        <div class="concern-icon-badge" style="background-color: ${cat.bg};">
          ${cat.iconSvg}
        </div>
        <h3 class="concern-card-title">${cat.title}</h3>
        <p class="concern-card-desc">${cat.desc}</p>
        <div class="concern-card-action">
          <a href="therapists.html?category=${cat.id}" class="concern-arrow-link" aria-label="Browse therapists for ${cat.title}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `).join("");
  }

  // Render "Meet Our Experts" Balanced 4-Card Grid (3-4 Featured Doctors)
  const expertsGrid = document.getElementById("experts-therapists-grid") || document.getElementById("featured-therapists-grid");
  if (expertsGrid) {
    const list = ALL_DOCTORS_CACHE.length > 0 ? ALL_DOCTORS_CACHE : (typeof MYTRM_DATA !== "undefined" ? MYTRM_DATA.therapists : []);
    const fallbackImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
    
    // Select 3-4 featured doctors
    let featuredList = list.filter(t => t.featured === true);
    if (featuredList.length === 0) {
      featuredList = list.slice(0, 4);
    } else {
      featuredList = featuredList.slice(0, 4);
    }

    expertsGrid.className = "featured-experts-grid";
    expertsGrid.innerHTML = featuredList.map((t, idx) => {
      let photo = t.photoUrl || t.photo || (t.photoFile ? 'assets/doctors/' + t.photoFile : fallbackImg);
      if (photo && photo.startsWith('/') && !photo.startsWith('//')) {
        photo = photo.substring(1);
      }

      const titleUpper = (t.title || "Psychologist & Counsellor").toUpperCase();
      const bioQuote = t.bioQuote || (t.bio ? t.bio.substring(0, 100) + "..." : "Licensed clinical expert committed to empathetic healing.");
      
      let tags = [];
      if (Array.isArray(t.specializationsTop)) tags = t.specializationsTop.slice(0, 3);
      else if (t.specializationsTop) tags = String(t.specializationsTop).split(";").map(s => s.trim()).slice(0, 3);
      else if (Array.isArray(t.specializations)) tags = t.specializations.slice(0, 3);

      const animDirClass = idx % 2 === 0 ? "anim-from-left" : "anim-from-right";
      const isFeatured = idx === 0;

      return `
        <div class="expert-card ${isFeatured ? 'expert-card-featured' : ''} expert-card-anim ${animDirClass}" onclick="window.location.href='therapist-profile.html?id=${t.id}'">
          ${isFeatured ? '<div class="expert-card-badge-top"><span class="badge badge-primary">Featured Specialist</span></div>' : ''}
          <div class="expert-card-img-container">
            <img src="${photo}" alt="${t.name}" class="expert-card-img" loading="${idx === 0 ? 'eager' : 'lazy'}" />
          </div>
          <div class="expert-card-content">
            <h3 class="expert-card-name">${t.name}</h3>
            <div class="expert-card-title">${titleUpper}</div>
            <p class="expert-card-quote">"${bioQuote}"</p>
            <div class="expert-card-tags">
              ${tags.map(tag => `<span class="expert-tag-pill">${tag}</span>`).join("")}
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Trigger IntersectionObserver for entrance animations
    setTimeout(() => {
      initExpertCardsObserver();
    }, 50);
  }

  // Render Testimonials
  const testimonialsGrid = document.getElementById("testimonials-grid");
  if (testimonialsGrid && typeof MYTRM_DATA !== "undefined") {
    testimonialsGrid.innerHTML = MYTRM_DATA.testimonials.map(item => `
      <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
        <p style="font-size: 1.05rem; font-style: italic; margin-bottom: 1.5rem; color: var(--color-text-main);">
          "${item.quote}"
        </p>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img src="${item.photo}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" />
          <div>
            <h4 style="font-size: 1rem; margin: 0;">${item.name}</h4>
            <span style="font-size: 0.85rem; color: var(--color-text-subtle);">${item.role} &bull; ${item.city}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // FAQ Accordions
  const faqContainer = document.getElementById("faq-accordion");
  if (faqContainer && typeof MYTRM_DATA !== "undefined") {
    faqContainer.innerHTML = MYTRM_DATA.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question" onclick="toggleFaq(this)">
          <span>${faq.question}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join("");
  }
}

function toggleFaq(btn) {
  const item = btn.parentElement;
  item.classList.toggle("active");
}

/* ==========================================================================
   3. EXPLORE THERAPISTS PAGE
   ========================================================================== */
let activeFilters = {
  search: "",
  category: "",
  gender: "",
  languages: [],
  maxPrice: 2500,
  sortBy: "rating"
};

async function initExplorePage() {
  if (ALL_DOCTORS_CACHE.length === 0 && typeof apiGetDoctors === "function") {
    ALL_DOCTORS_CACHE = await apiGetDoctors();
  }

  // Read category from URL param if present
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  if (catParam) {
    activeFilters.category = catParam.toLowerCase();
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeFilters.search = e.target.value.toLowerCase();
      renderFilteredTherapists();
    });
  }

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilters.sortBy = e.target.value;
      renderFilteredTherapists();
    });
  }

  renderFilterControls();
  renderFilteredTherapists();
}

function renderFilterControls() {
  const filterContainer = document.getElementById("filter-sidebar-content");
  if (!filterContainer) return;

  const categories = typeof MYTRM_DATA !== "undefined" ? MYTRM_DATA.categories : [];

  filterContainer.innerHTML = `
    <div class="filter-group">
      <div class="filter-title">Concern / Specialization</div>
      <div class="checkbox-list">
        <label class="checkbox-label">
          <input type="radio" name="catFilter" value="" ${!activeFilters.category ? 'checked' : ''} onchange="updateCatFilter('')"> All Concerns
        </label>
        ${categories.map(c => `
          <label class="checkbox-label">
            <input type="radio" name="catFilter" value="${c.title.toLowerCase()}" ${activeFilters.category.includes(c.id) || activeFilters.category.includes(c.title.toLowerCase()) ? 'checked' : ''} onchange="updateCatFilter('${c.title.toLowerCase()}')"> ${c.title}
          </label>
        `).join("")}
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-title">Gender</div>
      <div class="checkbox-list">
        <label class="checkbox-label">
          <input type="radio" name="genderFilter" value="" ${!activeFilters.gender ? 'checked' : ''} onchange="updateGenderFilter('')"> Any Gender
        </label>
        <label class="checkbox-label">
          <input type="radio" name="genderFilter" value="Female" ${activeFilters.gender === 'Female' ? 'checked' : ''} onchange="updateGenderFilter('Female')"> Female
        </label>
        <label class="checkbox-label">
          <input type="radio" name="genderFilter" value="Male" ${activeFilters.gender === 'Male' ? 'checked' : ''} onchange="updateGenderFilter('Male')"> Male
        </label>
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-title">Languages</div>
      <div class="checkbox-list">
        ${["English", "Hindi", "Marathi", "Malayalam", "Bengali", "Tamil"].map(lang => `
          <label class="checkbox-label">
            <input type="checkbox" value="${lang}" onchange="toggleLangFilter('${lang}')"> ${lang}
          </label>
        `).join("")}
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-title">Max Price per Session</div>
      <input type="range" min="900" max="2500" step="100" value="${activeFilters.maxPrice}" style="width:100%; accent-color: var(--color-primary);" oninput="updatePriceFilter(this.value)">
      <div style="display:flex; justify-space-between; font-size:0.85rem; color:var(--color-text-subtle); margin-top:0.4rem;">
        <span>₹900</span>
        <strong style="color:var(--color-primary);" id="price-display">₹${activeFilters.maxPrice}</strong>
        <span>₹2500</span>
      </div>
    </div>

    <button class="btn btn-secondary btn-full btn-sm" onclick="resetFilters()">Reset All Filters</button>
  `;
}

function updateCatFilter(val) {
  activeFilters.category = val;
  renderFilteredTherapists();
}

function updateGenderFilter(val) {
  activeFilters.gender = val;
  renderFilteredTherapists();
}

function toggleLangFilter(lang) {
  if (activeFilters.languages.includes(lang)) {
    activeFilters.languages = activeFilters.languages.filter(l => l !== lang);
  } else {
    activeFilters.languages.push(lang);
  }
  renderFilteredTherapists();
}

function updatePriceFilter(val) {
  activeFilters.maxPrice = parseInt(val);
  document.getElementById("price-display").innerText = `₹${val}`;
  renderFilteredTherapists();
}

function resetFilters() {
  activeFilters = {
    search: "",
    category: "",
    gender: "",
    languages: [],
    maxPrice: 2500,
    sortBy: "rating"
  };
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  renderFilterControls();
  renderFilteredTherapists();
}

function renderFilteredTherapists() {
  const container = document.getElementById("therapists-results-grid");
  const countEl = document.getElementById("results-count");
  if (!container) return;

  const doctorSource = ALL_DOCTORS_CACHE.length > 0 ? ALL_DOCTORS_CACHE : (typeof MYTRM_DATA !== "undefined" ? (MYTRM_DATA.therapists || MYTRM_DATA.doctors || []) : []);

  let results = doctorSource.filter(t => {
    // Search query
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      const matchName = t.name ? t.name.toLowerCase().includes(q) : false;

      let specs = [];
      if (Array.isArray(t.specializationsTop)) specs = specs.concat(t.specializationsTop);
      else if (t.specializationsTop) specs.push(String(t.specializationsTop));

      if (Array.isArray(t.specializationsFull)) specs = specs.concat(t.specializationsFull);
      else if (t.specializationsFull) specs.push(String(t.specializationsFull));

      if (Array.isArray(t.specializations)) specs = specs.concat(t.specializations);
      else if (t.specializations) specs.push(String(t.specializations));

      const matchSpec = specs.some(s => String(s).toLowerCase().includes(q));

      let langs = Array.isArray(t.languages) 
        ? t.languages 
        : String(t.languages || "").split(";").map(l => l.trim()).filter(Boolean);

      const matchLang = langs.some(l => String(l).toLowerCase().includes(q));
      const matchCity = t.city ? t.city.toLowerCase().includes(q) : false;
      const matchState = t.state ? t.state.toLowerCase().includes(q) : false;

      if (!matchName && !matchSpec && !matchLang && !matchCity && !matchState) return false;
    }

    // Category
    if (activeFilters.category) {
      const catKey = activeFilters.category.toLowerCase().trim();
      let searchTerms = [catKey];
      if (catKey.includes("anxiety")) searchTerms = ["anxiety", "panic", "ocd", "phobia"];
      else if (catKey.includes("stress")) searchTerms = ["stress", "workload", "burnout", "work-life"];
      else if (catKey.includes("relationship")) searchTerms = ["relationship", "couple", "family", "marriage", "divorce", "attachment"];
      else if (catKey.includes("burnout")) searchTerms = ["burnout", "fatigue", "stress", "work-life"];
      else if (catKey.includes("self")) searchTerms = ["self", "esteem", "confidence", "identity", "imposter"];
      else if (catKey.includes("career")) searchTerms = ["career", "academic", "work-life", "transition"];
      else if (catKey.includes("overthinking")) searchTerms = ["overthinking", "sleep", "rumination", "worry"];
      else if (catKey.includes("growth")) searchTerms = ["growth", "improvement", "self", "purpose", "mindfulness"];

      let specs = [];
      if (Array.isArray(t.specializationsTop)) specs = specs.concat(t.specializationsTop);
      else if (t.specializationsTop) specs.push(String(t.specializationsTop));

      if (Array.isArray(t.specializationsFull)) specs = specs.concat(t.specializationsFull);
      else if (t.specializationsFull) specs.push(String(t.specializationsFull));

      if (Array.isArray(t.specializations)) specs = specs.concat(t.specializations);
      else if (t.specializations) specs.push(String(t.specializations));

      const matchSpec = specs.some(s => searchTerms.some(term => String(s).toLowerCase().includes(term)));
      if (!matchSpec) return false;
    }

    // Gender
    if (activeFilters.gender && t.gender && t.gender.toLowerCase() !== activeFilters.gender.toLowerCase()) {
      return false;
    }

    // Languages
    if (activeFilters.languages.length > 0) {
      let langs = Array.isArray(t.languages) ? t.languages : String(t.languages || "").split(";").map(l => l.trim());
      const matchesAnyLang = activeFilters.languages.some(l => langs.map(x => x.toLowerCase()).includes(l.toLowerCase()));
      if (!matchesAnyLang) return false;
    }

    // Price
    if (typeof t.price === "number" && t.price > activeFilters.maxPrice) {
      return false;
    }

    return true;
  });

  // Sort
  if (activeFilters.sortBy === "rating") {
    results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (activeFilters.sortBy === "exp") {
    results.sort((a, b) => (b.experienceYears || 0) - (a.experienceYears || 0));
  } else if (activeFilters.sortBy === "price-low") {
    results.sort((a, b) => (typeof a.price === "number" ? a.price : 9999) - (typeof b.price === "number" ? b.price : 9999));
  } else if (activeFilters.sortBy === "price-high") {
    results.sort((a, b) => (typeof b.price === "number" ? b.price : 0) - (typeof a.price === "number" ? a.price : 0));
  }

  if (countEl) {
    countEl.innerText = `${results.length} Therapist${results.length === 1 ? '' : 's'} Found`;
  }

  if (results.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--color-bg-card); border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
        <h3 style="margin-bottom: 0.5rem;">No therapists match your selected criteria</h3>
        <p style="margin-bottom: 1.5rem;">Try widening your search terms or resetting filters.</p>
        <button class="btn btn-primary" onclick="resetFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(t => renderTherapistCardHTML(t)).join("");
}

function renderTherapistCardHTML(t) {
  const savedList = getSavedTherapists();
  const isSaved = savedList.includes(t.id);
  const fallbackImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
  
  let photo = t.photoUrl || t.photo || (t.photoFile ? 'assets/doctors/' + t.photoFile : fallbackImg);
  if (photo && photo.startsWith('/') && !photo.startsWith('//')) {
    photo = photo.substring(1);
  }

  // Split specializations for top tags on cards
  let specializations = [];
  if (Array.isArray(t.specializationsTop)) {
    specializations = t.specializationsTop;
  } else if (t.specializationsTop) {
    specializations = String(t.specializationsTop).split(";").map(s => s.trim()).filter(Boolean);
  } else if (Array.isArray(t.specializations)) {
    specializations = t.specializations;
  } else if (t.specializations) {
    specializations = String(t.specializations).split(";").map(s => s.trim()).filter(Boolean);
  }

  // Split languages
  let languagesList = [];
  if (Array.isArray(t.languages)) {
    languagesList = t.languages;
  } else if (t.languages) {
    languagesList = String(t.languages).split(";").map(l => l.trim()).filter(Boolean);
  }

  // Pricing display
  const isNumericPrice = t.price && t.price !== "Contact for pricing" && t.price !== "TBD" && !isNaN(Number(t.price));
  const priceDisplay = isNumericPrice ? `₹${t.price}` : (t.price || "Contact for pricing");

  // Rating badge handling: leave rating/reviewCount empty or show neutral badge if rating is null/0
  const hasRating = t.rating != null && Number(t.rating) > 0;
  const ratingBadgeHTML = hasRating 
    ? `<span style="font-weight: 700; color: #E5A638;">★ ${t.rating}</span> <span style="font-size: 0.8rem; color: var(--color-text-subtle);">(${t.reviewCount || 0})</span>`
    : `<span class="badge badge-sand" style="font-weight: 700; background: var(--color-secondary-sand); color: var(--color-primary-dark); font-size: 0.78rem;">${t.ratingBadge || "Verified Practitioner"}</span>`;

  return `
    <div class="therapist-card">
      <div class="therapist-card-img-wrapper">
        <img src="${photo}" alt="${t.name}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}';" />
        <button class="save-btn ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); handleToggleSave('${t.id}', this)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="therapist-card-body">
        <div class="therapist-card-meta">
          ${ratingBadgeHTML}
          <span style="font-size: 0.8rem; color: var(--color-text-subtle);">${t.experienceYears != null ? t.experienceYears : 1} yrs exp</span>
        </div>
        <h3 class="therapist-name">${t.name}</h3>
        <p class="therapist-title">${t.title}</p>
        <div class="specialization-tags">
          ${specializations.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join("")}
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-subtle); margin-bottom: 0.75rem;">
          🗣 ${languagesList.join(", ")}
        </p>
        <div class="therapist-card-footer">
          <div class="price-tag" style="${!isNumericPrice ? 'font-size:0.92rem;' : ''}">${priceDisplay} <span>/ ${t.sessionDuration || '50 min'}</span></div>
          <a href="therapist-profile.html?id=${t.id}" class="btn btn-outline btn-sm">View Profile</a>
        </div>
      </div>
    </div>
  `;
}

function handleToggleSave(id, btn) {
  const nowSaved = toggleSaveTherapist(id);
  btn.classList.toggle("saved", nowSaved);
  const svgPath = btn.querySelector("svg path");
  if (svgPath) {
    svgPath.setAttribute("fill", nowSaved ? "currentColor" : "none");
  }
  showToast(nowSaved ? "Saved to your favorites!" : "Removed from favorites");
}

/* ==========================================================================
   4. THERAPIST PROFILE PAGE
   ========================================================================== */
async function initProfilePage() {
  if (ALL_DOCTORS_CACHE.length === 0 && typeof apiGetDoctors === "function") {
    ALL_DOCTORS_CACHE = await apiGetDoctors();
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "d01";

  const doctorSource = ALL_DOCTORS_CACHE.length > 0 ? ALL_DOCTORS_CACHE : (typeof MYTRM_DATA !== "undefined" ? (MYTRM_DATA.therapists || MYTRM_DATA.doctors || []) : []);
  const therapist = doctorSource.find(t => String(t.id).toLowerCase() === String(id).toLowerCase()) || doctorSource[0];

  const profileContainer = document.getElementById("profile-main-container");
  const sidebarContainer = document.getElementById("profile-sidebar-container");

  const fallbackImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
  let photo = therapist.photoUrl || therapist.photo || (therapist.photoFile ? 'assets/doctors/' + therapist.photoFile : fallbackImg);
  if (photo && photo.startsWith('/') && !photo.startsWith('//')) {
    photo = photo.substring(1);
  }

  // Full specialization list for profile
  let fullSpecs = [];
  if (Array.isArray(therapist.specializationsFull)) {
    fullSpecs = therapist.specializationsFull;
  } else if (therapist.specializationsFull) {
    fullSpecs = String(therapist.specializationsFull).split(";").map(s => s.trim()).filter(Boolean);
  } else if (Array.isArray(therapist.specializationsTop)) {
    fullSpecs = therapist.specializationsTop;
  } else if (therapist.specializationsTop) {
    fullSpecs = String(therapist.specializationsTop).split(";").map(s => s.trim()).filter(Boolean);
  } else if (Array.isArray(therapist.specializations)) {
    fullSpecs = therapist.specializations;
  }

  // Split languages
  let languagesList = [];
  if (Array.isArray(therapist.languages)) {
    languagesList = therapist.languages;
  } else if (therapist.languages) {
    languagesList = String(therapist.languages).split(";").map(l => l.trim()).filter(Boolean);
  }

  // Location display
  const locationText = therapist.city && therapist.state 
    ? `${therapist.city}, ${therapist.state}` 
    : (therapist.location || 'India / Online');

  // Qualifications display
  const qualificationsText = therapist.qualifications || therapist.qualification || "Master's in Psychology";

  // Pricing display
  const isNumericPrice = therapist.price && therapist.price !== "Contact for pricing" && therapist.price !== "TBD" && !isNaN(Number(therapist.price));
  const priceDisplay = isNumericPrice ? `₹${therapist.price}` : (therapist.price || "Contact for pricing");

  // Rating badge handling for profile header: leave rating/reviewCount empty or show neutral badge if rating is null/0
  const hasRating = therapist.rating != null && Number(therapist.rating) > 0;
  const ratingBadgeHTML = hasRating 
    ? `<span class="badge badge-sand">★ ${therapist.rating} (${therapist.reviewCount || 0} reviews)</span>`
    : `<span class="badge badge-sand" style="font-weight: 700; background: var(--color-secondary-sand); color: var(--color-primary-dark);">${therapist.ratingBadge || "Verified Specialist"}</span>`;

  if (profileContainer) {
    profileContainer.innerHTML = `
      <div class="profile-header-meta">
        <div class="profile-avatar-wrapper">
          <img src="${photo}" alt="${therapist.name}" onerror="this.onerror=null; this.src='${fallbackImg}';" />
        </div>
        <div class="profile-info">
          <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Verified Clinical Expert</span>
          <h1>${therapist.name}</h1>
          <p style="font-size: 1.1rem; color: var(--color-text-muted); font-weight: 500;">${therapist.title}</p>
          <p style="font-size: 0.9rem; color: var(--color-text-subtle); margin-top: 0.25rem;">🎓 ${qualificationsText}</p>

          <div class="profile-badge-row">
            ${ratingBadgeHTML}
            <span class="badge badge-sand">💼 ${therapist.experienceYears != null ? therapist.experienceYears : 1} Years Experience</span>
            <span class="badge badge-sand">📍 ${locationText}</span>
          </div>

          <div style="margin-top: 0.75rem; font-size: 0.875rem; color: var(--color-primary); font-weight: 600;">
            📅 Availability: ${therapist.availabilitySummary || 'Flexible Schedule'}
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h3>About Me</h3>
        <p style="line-height: 1.7; font-size: 1rem; color: var(--color-text-main);">${therapist.bio}</p>
      </div>

      <div class="profile-section">
        <h3>Therapeutic Approach</h3>
        <p style="line-height: 1.7; font-size: 1rem; color: var(--color-text-main);">${therapist.approach || 'Empathetic, collaborative, and evidence-based clinical care.'}</p>
      </div>

      <div class="profile-section">
        <h3>Full Specializations & Focus Areas</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
          ${fullSpecs.map(s => `<span class="tag" style="padding: 0.4rem 0.9rem; font-size: 0.875rem; background: var(--color-secondary-sand); color: var(--color-text-main); font-weight: 600;">${s}</span>`).join("")}
        </div>
      </div>

      <div class="profile-section">
        <h3>Languages Spoken</h3>
        <p style="font-size: 1rem; font-weight: 500;">🗣 ${languagesList.join(", ")}</p>
      </div>
    `;
  }

  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <div class="booking-card">
        <div style="font-size: 0.85rem; color: var(--color-text-subtle); font-weight: 600; text-transform: uppercase; margin-bottom: 0.25rem;">Standard Session</div>
        <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1.25rem;">
          <span style="font-family: var(--font-heading); font-size: ${isNumericPrice ? '1.6rem' : '1.25rem'}; font-weight: 800; color: var(--color-text-main);">${priceDisplay}</span>
          <span style="font-size: 0.9rem; color: var(--color-text-subtle);">/ ${therapist.sessionDuration || '50 min'}</span>
        </div>

        <div style="background: var(--color-primary-light); padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <div>
            <div style="font-size: 0.8rem; color: var(--color-primary); font-weight: 600;">WhatsApp Booking Flow</div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-main);">${therapist.availabilitySummary || 'Flexible Schedule'}</div>
          </div>
        </div>

        <a href="booking.html?id=${therapist.id}" class="btn btn-primary btn-full btn-lg" style="margin-bottom: 1rem;">
          Book Session via WhatsApp &rarr;
        </a>

        <div style="font-size: 0.825rem; color: var(--color-text-subtle); text-align: center; display: flex; flex-direction: column; gap: 0.4rem;">
          <span>🔒 100% Confidential & Secure</span>
          <span>💬 Instant WhatsApp Session Confirmation</span>
          <span>⚡ Automatic Google Meet Link Upon Approval</span>
        </div>
      </div>
    `;
  }
}


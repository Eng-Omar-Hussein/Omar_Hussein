(function () {
  "use strict";

  let content = null;

  const LINKEDIN_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.2"/><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="currentColor"/></svg>';
  const GITHUB_ICON =
    '<svg height="32" viewBox="0 0 16 16" width="32"><path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>';

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function showError(msg) {
    const el = document.getElementById("content-error");
    if (el) {
      el.textContent = msg;
      el.style.display = "block";
    }
  }

  function renderProfile(data) {
    const p = data.profile;
    const profileSection = document.getElementById("profile-section");
    if (!profileSection) return;

    const photoEl = profileSection.querySelector(".profile-photo img");
    if (photoEl) {
      photoEl.src = p.photo;
      photoEl.alt = p.name;
    }

    const greetingEl = profileSection.querySelector(".profile-greeting");
    if (greetingEl) greetingEl.textContent = p.greeting;

    const nameEl = profileSection.querySelector(".profile-name");
    if (nameEl) nameEl.textContent = p.name;

    const titleEl = profileSection.querySelector(".profile-title");
    if (titleEl) titleEl.textContent = p.title;

    const cvBtn = profileSection.querySelector('[data-action="cv"]');
    if (cvBtn) cvBtn.dataset.href = p.cvUrl;

    const socialEl = profileSection.querySelector(".profile-social");
    if (socialEl && data.social && data.social.length) {
      socialEl.innerHTML = data.social
        .map((s) => {
          const icon = s.name.toLowerCase() === "linkedin" ? LINKEDIN_ICON : GITHUB_ICON;
          return `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(s.name)}">${icon}</a>`;
        })
        .join("");
    }
  }

  function renderAbout(data) {
    const a = data.about;
    const section = document.getElementById("about-content");
    if (!section || !a) return;

    const highlights = (a.highlights || []).map((h) => `<li>${escapeHtml(h)}</li>`).join("");
    const edu = a.education;
    const eduStr = edu
      ? `<div class="about-edu"><strong>${escapeHtml(edu.degree)}</strong> ${escapeHtml(edu.period)} — ${escapeHtml(edu.institution)}, ${escapeHtml(edu.department)}</div>`
      : "";

    section.innerHTML = `
      <div class="about-modern-inner">
        <div class="about-bio-block">
          ${a.tagline ? `<p class="about-tagline">${escapeHtml(a.tagline)}</p>` : ""}
          <p class="about-bio-text">${escapeHtml(a.bio || "")}</p>
        </div>
        <div class="about-sidebar">
          ${highlights ? `<ul class="about-highlights">${highlights}</ul>` : ""}
          ${eduStr}
        </div>
      </div>
    `;
  }

  const CATEGORY_ICONS = {
    Frontend: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    Backend: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6v.01M6 18v.01M18 6v.01M18 18v.01"/></svg>',
    "DevOps & Cloud": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    Monitoring: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    Security: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    Programming: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    Databases: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/></svg>',
    "Soft Skills": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  };

  function renderWorkExperience(data) {
    const section = document.getElementById("work-experience-content");
    const jobs = data.workExperience || [];
    if (!section) return;

    if (jobs.length === 0) {
      section.innerHTML = `<p class="empty-state">No work experience added yet. Edit <code>data/content.json</code> to add your roles.</p>`;
      return;
    }

    section.innerHTML = jobs
      .map(
        (job) => `
      <div class="exp-card">
        <div class="exp-header">
          <h3>${escapeHtml(job.role)}</h3>
          <span class="exp-period">${escapeHtml(job.period)}</span>
        </div>
        <div class="exp-company">${escapeHtml(job.company)}${job.location ? ` • ${escapeHtml(job.location)}` : ""}</div>
        <p class="exp-desc">${escapeHtml(job.description || "")}</p>
      </div>
    `
      )
      .join("");
  }

  function renderCertificates(data) {
    const section = document.getElementById("certificates-content");
    const certs = data.certificates || [];
    if (!section) return;

    if (certs.length === 0) {
      section.innerHTML = `<p class="empty-state">No certificates added yet. Edit <code>data/content.json</code> to add your credentials.</p>`;
      return;
    }

    section.innerHTML = certs
      .map(
        (c) => `
      <div class="cert-card">
        <div class="cert-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div class="cert-info">
          <h3>${escapeHtml(c.name)}</h3>
          <p class="cert-issuer">${escapeHtml(c.issuer)}</p>
          <p class="cert-date">${escapeHtml(c.date || "")}</p>
          ${c.url ? `<a href="${escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="cert-link">Verify</a>` : ""}
        </div>
      </div>
    `
      )
      .join("");
  }

  function renderSkills(data) {
    const section = document.getElementById("skills-content");
    if (!section || !data.skills) return;

    section.innerHTML = data.skills
      .map(
        (job) => {
          const icon = CATEGORY_ICONS[job.category] || CATEGORY_ICONS.Programming;
          return `
      <div class="job skill-card">
        <div class="job-icon">${icon}</div>
        <h2>${escapeHtml(job.category)}</h2>
        <div class="skills-list">
          ${job.skills.map((s) => `<span class="skill-chip">${escapeHtml(s.name)}</span>`).join("")}
        </div>
      </div>
    `;
        }
      )
      .join("");
  }

  function renderProjects(data) {
    const filterContainer = document.getElementById("filter-buttons");
    const gridContainer = document.getElementById("projects-grid");
    if (!gridContainer || !data.projects) return;

    const categories = ["all", ...new Set(data.projects.map((p) => p.category))];

    if (filterContainer) {
      filterContainer.innerHTML = categories
        .map(
          (c) =>
            `<button class="btn filter-btn ${c === "all" ? "active" : ""}" data-category="${escapeHtml(c)}">${c === "all" ? "Show all" : c}</button>`
        )
        .join("");
    }

    gridContainer.innerHTML = data.projects
      .map(
        (p) => `
      <div class="filterDiv proj show" data-category="${escapeHtml(p.category)}">
        <div class="category">${escapeHtml(p.category)}</div>
        <div class="poster" data-src="${escapeHtml(p.image)}" data-position="${escapeHtml(p.imagePosition || "center center")}"></div>
        <h3>${escapeHtml(p.title)}</h3>
        <div class="access">
          <button class="project-link" data-action="github" data-href="${escapeHtml(p.githubUrl)}">GitHub</button>
          <button class="project-link" data-action="blog" data-href="${escapeHtml(p.blogUrl)}">blog</button>
        </div>
      </div>
    `
      )
      .join("");

    document.querySelectorAll(".poster[data-src]").forEach((el) => {
      el.style.backgroundImage = "url(" + el.dataset.src + ")";
      el.style.backgroundPosition = "center";
    });

    filterSelection("all");
    wireFilterButtons();
  }

  function filterSelection(category) {
    document.querySelectorAll(".filterDiv").forEach((el) => {
      const cat = el.dataset.category;
      const show = category === "all" || cat === category;
      el.classList.toggle("show", !!show);
    });
  }

  function wireFilterButtons() {
    const container = document.getElementById("filter-buttons");
    if (!container) return;
    container.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        container.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterSelection(this.dataset.category);
      });
    });
  }

  function renderContact(data) {
    const section = document.getElementById("contact-content");
    if (!section || !data.contact) return;

    const c = data.contact;
    section.innerHTML = `
      <div class="via">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22" aria-hidden="true">
          <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
        </svg>
        <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>
      </div>
      <div class="via">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="22" height="22" aria-hidden="true">
          <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>
        </svg>
        <a href="${escapeHtml(c.linkedin)}" target="_blank" rel="noopener noreferrer">linkedin</a>
      </div>
    `;
  }

  function wireGlobalHandlers() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const action = btn.dataset.action;
      const href = btn.dataset.href;
      if (action === "cv" && href) {
        window.open(href, "_blank");
      } else if (action === "contact") {
        document.getElementById("Section8")?.scrollIntoView({ behavior: "smooth" });
      } else if ((action === "github" || action === "blog") && href) {
        window.open(href, "_blank");
      }
    });
  }

  function initNavMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuList = document.querySelector("nav ul");
    const menuItems = document.querySelectorAll("nav li a");

    function setMenuState(isOpen) {
      if (!menuList || !menuToggle) return;
      menuList.style.height = isOpen ? "346px" : "0";
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    if (menuToggle && menuList) {
      menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.classList.contains("is-open");
        setMenuState(!isOpen);
      });
    }

    menuItems.forEach((el) => {
      el.addEventListener("click", () => {
        setMenuState(false);
      });
    });
  }

  function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
    const darkClass = "theme-dark";
    const lightClass = "theme-light";

    function setTheme(isDark) {
      root.classList.remove(darkClass, lightClass);
      root.classList.add(isDark ? darkClass : lightClass);
      try {
        localStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (_) {}
      if (toggle) toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    }

    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored === "light" ? false : stored === "dark" ? true : prefersDark;
    setTheme(initial);

    if (toggle) {
      toggle.addEventListener("click", () => {
        const isDark = root.classList.contains(darkClass);
        setTheme(!isDark);
      });
    }
  }

  function initScrollMorph() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll(
      ".hero-inner, .section, .about-modern-inner, .exp-card, .job.skill-card, .cert-card, .proj, .contact-content .via"
    );

    targets.forEach((el, index) => {
      el.classList.add("scroll-morph");
      el.style.transitionDelay = `${Math.min(index * 28, 140)}ms`;
    });

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -4% 0px"
      }
    );

    targets.forEach((el) => observer.observe(el));
  }

  function render(data) {
    content = data;
    renderProfile(data);
    renderAbout(data);
    renderWorkExperience(data);
    renderSkills(data);
    renderCertificates(data);
    renderProjects(data);
    renderContact(data);

    const copyrightEl = document.getElementById("footer-copyright");
    if (copyrightEl && data.footer && data.footer.copyright) {
      copyrightEl.textContent = data.footer.copyright;
    }

    initScrollMorph();
  }

  function init() {
    initNavMenu();
    initThemeToggle();
    wireGlobalHandlers();

    // Use window.CONTENT if available
    if (window.CONTENT) {
      render(window.CONTENT);
      return;
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

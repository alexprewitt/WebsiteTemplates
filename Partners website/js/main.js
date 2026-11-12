const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const siteMenu = document.querySelector(".site-menu");

function setTheme(theme, persist = true) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = isDark ? "#081323" : "#f1e8dc";

  if (persist) {
    try {
      localStorage.setItem("jm-partners-theme", theme);
    } catch {
      // Keep the current-page choice if browser storage is unavailable.
    }
  }
}

try {
  const savedTheme = localStorage.getItem("jm-partners-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    setTheme(savedTheme, false);
  }
} catch {
  // The theme button still works for this visit if browser storage is unavailable.
}

if (themeToggle) {
  setTheme(root.dataset.theme, false);
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

if (siteMenu) {
  siteMenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      siteMenu.open = false;
      siteMenu.querySelector("summary")?.focus();
    }
  });

  siteMenu.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.open = false;
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteMenu.contains(event.target)) {
      siteMenu.open = false;
    }
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const storyCards = document.querySelectorAll(".story-card");

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  root.classList.add("reveal-ready");
  storyCards.forEach((card) => observer.observe(card));
} else {
  storyCards.forEach((card) => card.classList.add("is-visible"));
}
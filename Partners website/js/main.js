const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const settingsMenu = document.querySelector(".settings-menu");

try {
  const savedTheme = localStorage.getItem("jm-partners-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
} catch {
  // The switch still works for this visit if browser storage is unavailable.
}

if (themeToggle) {
  themeToggle.checked = root.dataset.theme === "dark";
  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    root.dataset.theme = theme;
    try { localStorage.setItem("jm-partners-theme", theme); } catch { /* Keep the current-page choice. */ }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#081323" : "#f1e8dc";
  });
}

if (settingsMenu) {
  settingsMenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      settingsMenu.open = false;
      settingsMenu.querySelector("summary")?.focus();
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

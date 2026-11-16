document.addEventListener("DOMContentLoaded", function () {
  const yearNode = document.getElementById("current-year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector(".navbar");
  if (nav && window.siteConfig && window.siteConfig.stickyNavbar) {
    const updateNavState = function () {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if (navLinks.length && window.siteConfig && window.siteConfig.highlightActiveNav) {
    const highlightActiveLink = function () {
      let currentId = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          currentId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const isActive = href === `#${currentId}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    highlightActiveLink();
    window.addEventListener("scroll", highlightActiveLink, { passive: true });
  }

  const navCollapse = document.querySelector(".navbar-collapse");
  if (navCollapse) {
    navCollapse.addEventListener("click", function (event) {
      const clickedLink = event.target.closest(".nav-link");
      if (!clickedLink) return;
      if (window.innerWidth < 992 && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  }

  if (window.siteConfig && window.siteConfig.revealOnScroll) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  const selectedArtistFilter = { artist: "all", style: "all" };

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  const applyPortfolioFilters = function () {
    portfolioItems.forEach((item) => {
      const matchesArtist = selectedArtistFilter.artist === "all" || item.dataset.artist === selectedArtistFilter.artist;
      const matchesStyle = selectedArtistFilter.style === "all" || item.dataset.style === selectedArtistFilter.style;
      item.classList.toggle("hidden", !(matchesArtist && matchesStyle));
    });
  };

  const updateFilterButtons = function (group, activeButton) {
    document.querySelectorAll(`.filter-btn[data-${group}]`).forEach((btn) => {
      btn.classList.toggle("active", btn === activeButton);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const group = button.dataset.filterGroup || button.parentElement.dataset.filterGroup;
      const value = button.dataset.artist || button.dataset.style || "all";

      if (group === "artist") {
        selectedArtistFilter.artist = value;
      }

      if (group === "style") {
        selectedArtistFilter.style = value;
      }

      updateFilterButtons(group, button);
      applyPortfolioFilters();
    });
  });

  document.querySelectorAll(".artist-card [data-artist]").forEach((button) => {
    button.addEventListener("click", function () {
      const artist = this.dataset.artist;
      const style = this.dataset.style || "all";
      selectedArtistFilter.artist = artist;
      selectedArtistFilter.style = style;

      document.querySelectorAll(".filter-btn[data-artist]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.artist === artist);
      });
      document.querySelectorAll(".filter-btn[data-style]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.style === style || (style === "all" && btn.dataset.style === "all"));
      });

      applyPortfolioFilters();
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const projectModal = document.getElementById("portfolioModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", function (event) {
      const trigger = event.relatedTarget;
      if (!trigger) return;

      const title = trigger.dataset.title || "Portfolio Piece";
      const artist = trigger.dataset.artist || "Artist";
      const style = trigger.dataset.style || "Style";
      const caption = trigger.dataset.caption || "";
      const image = trigger.dataset.image || trigger.querySelector("img")?.src || "";

      const modalTitle = projectModal.querySelector(".project-modal-title");
      const modalImage = projectModal.querySelector(".project-modal-image");
      const modalMeta = projectModal.querySelector(".project-modal-meta");
      const modalCaption = projectModal.querySelector(".project-modal-caption");

      modalTitle.textContent = title;
      modalMeta.textContent = `${artist} • ${style}`;
      modalImage.src = image;
      modalImage.alt = title;
      modalCaption.textContent = caption;
    });
  }

  const bookingForm = document.getElementById("consultation-form");
  const formStatus = document.getElementById("form-status");

  if (bookingForm && formStatus) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const requiredFields = [
        bookingForm.querySelector("#full-name"),
        bookingForm.querySelector("#email"),
        bookingForm.querySelector("#phone"),
        bookingForm.querySelector("#description")
      ];

      const isValid = requiredFields.every((field) => field && field.value.trim() !== "");

      if (!isValid) {
        formStatus.textContent = "Please complete the required fields before submitting your consultation request.";
        formStatus.style.color = "#f9c7c7";
        return;
      }

      formStatus.textContent = window.siteConfig && window.siteConfig.quoteStatusMessage
        ? window.siteConfig.quoteStatusMessage
        : "This demonstration consultation request is not connected to a live form backend.";
      formStatus.style.color = "#f0ebdf";
      bookingForm.reset();
    });
  }
});

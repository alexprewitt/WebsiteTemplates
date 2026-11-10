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

  if (window.siteConfig && window.siteConfig.highlightActiveNav) {
    const highlightActiveLink = function () {
      let currentId = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        const isActive = linkHref === `#${currentId}`;
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
      {
        threshold: 0.16
      }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

      galleryItems.forEach((item) => {
        const matches = selectedFilter === "all" || item.dataset.category === selectedFilter;
        item.classList.toggle("hidden", !matches);
      });
    });
  });

  const galleryModal = document.getElementById("galleryModal");
  if (galleryModal) {
    galleryModal.addEventListener("show.bs.modal", function (event) {
      const trigger = event.relatedTarget;
      if (!trigger) return;

      const title = trigger.dataset.title || "Gallery item";
      const caption = trigger.dataset.caption || "";
      const modalTitle = galleryModal.querySelector(".modal-title");
      const modalImage = galleryModal.querySelector(".modal-image");
      const modalCaption = galleryModal.querySelector(".modal-caption");

      modalTitle.textContent = title;
      modalImage.src = trigger.currentSrc || trigger.src;
      modalImage.alt = title;
      modalCaption.textContent = caption;
    });
  }

  const comparisonWrap = document.querySelector("[data-before-after]");
  if (comparisonWrap) {
    const rangeInput = comparisonWrap.querySelector("input[type='range']");
    const overlay = comparisonWrap.querySelector(".comparison-overlay");
    const handle = comparisonWrap.querySelector(".comparison-handle");

    if (rangeInput && overlay && handle) {
      const updateSlider = function () {
        const value = Number(rangeInput.value);
        overlay.style.width = `${value}%`;
        handle.style.left = `${value}%`;
      };

      updateSlider();
      rangeInput.addEventListener("input", updateSlider);
    }
  }

  const bookingButtons = document.querySelectorAll(".booking-select");
  const bookingTypeSelect = document.getElementById("booking-type");
  bookingButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!bookingTypeSelect) return;
      bookingTypeSelect.value = button.dataset.bookingType;
      bookingTypeSelect.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  const bookingForm = document.querySelector(".booking-form");
  const bookingStatus = document.getElementById("booking-status");
  if (bookingForm && bookingStatus) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const message = window.siteConfig && window.siteConfig.bookingStatusMessage
        ? window.siteConfig.bookingStatusMessage
        : "Online appointment requests are not enabled yet in this demo template.";
      bookingStatus.textContent = message;
      bookingForm.reset();
    });
  }

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop && window.siteConfig && window.siteConfig.showBackToTop) {
    const toggleBackToTop = function () {
      backToTop.classList.toggle("visible", window.scrollY > 320);
    };

    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

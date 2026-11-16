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
      {
        threshold: 0.14
      }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".project-card");

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

  const projectModal = document.getElementById("projectModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", function (event) {
      const trigger = event.relatedTarget;
      if (!trigger) return;

      const title = trigger.dataset.title || "Project";
      const category = trigger.dataset.category || "Project";
      const caption = trigger.dataset.caption || "";
      const image = trigger.dataset.image || trigger.querySelector("img")?.src || "";

      const modalTitle = projectModal.querySelector(".project-modal-title");
      const modalImage = projectModal.querySelector(".project-modal-image");
      const modalMeta = projectModal.querySelector(".project-modal-meta");
      const modalCaption = projectModal.querySelector(".project-modal-caption");

      modalTitle.textContent = title;
      modalMeta.textContent = category;
      modalImage.src = image;
      modalImage.alt = title;
      modalCaption.textContent = caption;
    });
  }

  const quoteForm = document.getElementById("quote-form");
  const quoteStatus = document.getElementById("quote-status");
  if (quoteForm && quoteStatus) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const message = window.siteConfig && window.siteConfig.quoteStatusMessage
        ? window.siteConfig.quoteStatusMessage
        : "This demonstration form is not connected to a live submission service.";
      quoteStatus.textContent = message;
      quoteForm.reset();
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

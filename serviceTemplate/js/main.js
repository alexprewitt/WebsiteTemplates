document.addEventListener("DOMContentLoaded", function () {
  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop && window.siteConfig && window.siteConfig.showBackToTop) {
    const toggleBackToTop = function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    };

    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if (window.siteConfig && window.siteConfig.highlightActiveNav) {
    const highlightActiveLink = function () {
      let currentSectionId = "home";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          currentSectionId = section.id;
          break;
        }
      }

      navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        const isActive = linkHref === `#${currentSectionId}`;
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

      const screenIsSmall = window.innerWidth < 992;
      if (screenIsSmall && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  }

  const contactForm = document.querySelector(".contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const configMessage = window.siteConfig && window.siteConfig.formDemoMessage
        ? window.siteConfig.formDemoMessage
        : "This form is a template demo and is not connected to a live email service yet.";

      formStatus.textContent = configMessage;
      contactForm.reset();
    });
  }
});
